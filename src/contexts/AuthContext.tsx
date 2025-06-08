
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const debugAuthState = (context: string, sessionData?: Session | null, userData?: User | null) => {
    console.log(`🔐 AUTH DEBUG [${context}]:`, {
      session: sessionData ? 'EXISTS' : 'NULL',
      user: userData ? 'EXISTS' : 'NULL',
      userId: userData?.id || 'NULL',
      accessToken: sessionData?.access_token ? 'EXISTS' : 'NULL',
      refreshToken: sessionData?.refresh_token ? 'EXISTS' : 'NULL',
      expiresAt: sessionData?.expires_at ? new Date(sessionData.expires_at * 1000).toISOString() : 'NULL',
      timestamp: new Date().toISOString()
    });
  };

  const updateAuthState = (newSession: Session | null, context: string) => {
    const newUser = newSession?.user ?? null;
    
    debugAuthState(context, newSession, newUser);
    
    setSession(newSession);
    setUser(newUser);
    
    // Verify the session is properly stored
    if (newSession) {
      console.log('🔍 AUTH DEBUG: Verifying session storage...');
      setTimeout(async () => {
        const { data: { session: storedSession } } = await supabase.auth.getSession();
        if (!storedSession) {
          console.error('❌ AUTH ERROR: Session not properly stored after update');
        } else {
          console.log('✅ AUTH SUCCESS: Session properly stored');
        }
      }, 100);
    }
  };

  const refreshSession = async () => {
    try {
      console.log('🔄 AUTH DEBUG: Manually refreshing session...');
      const { data: { session }, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error('❌ AUTH ERROR: Session refresh failed:', error);
        updateAuthState(null, 'REFRESH_FAILED');
      } else {
        console.log('✅ AUTH SUCCESS: Session refreshed manually');
        updateAuthState(session, 'REFRESH_SUCCESS');
      }
    } catch (error) {
      console.error('❌ AUTH ERROR: Exception during session refresh:', error);
      updateAuthState(null, 'REFRESH_EXCEPTION');
    }
  };

  useEffect(() => {
    console.log('🚀 AUTH DEBUG: Initializing AuthProvider...');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`🔔 AUTH EVENT: ${event}`, { 
          sessionExists: !!session,
          userExists: !!session?.user 
        });
        
        updateAuthState(session, `EVENT_${event}`);
        
        // Only set loading to false after we've processed the auth state
        if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    const initializeSession = async () => {
      try {
        console.log('🔍 AUTH DEBUG: Checking for existing session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ AUTH ERROR: Failed to get session:', error);
          updateAuthState(null, 'INIT_ERROR');
          setLoading(false);
        } else {
          console.log('📋 AUTH DEBUG: Initial session check completed');
          updateAuthState(session, 'INIT_SUCCESS');
          
          // If we have a session but no auth state change event, set loading to false
          if (!session) {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('❌ AUTH ERROR: Exception during session initialization:', error);
        updateAuthState(null, 'INIT_EXCEPTION');
        setLoading(false);
      }
    };

    initializeSession();

    return () => {
      console.log('🧹 AUTH DEBUG: Cleaning up auth subscription...');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log('📝 AUTH DEBUG: Starting sign up process...');
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          }
        }
      });
      
      if (error) {
        console.error('❌ AUTH ERROR: Sign up failed:', error);
      } else {
        console.log('✅ AUTH SUCCESS: Sign up completed', { userId: data.user?.id });
        
        // If email confirmation is disabled, the user should be signed in immediately
        if (data.session) {
          console.log('🎉 AUTH DEBUG: User signed in immediately after signup');
          updateAuthState(data.session, 'SIGNUP_IMMEDIATE');
        }
      }
      
      return { error };
    } catch (error) {
      console.error('❌ AUTH ERROR: Exception during sign up:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔑 AUTH DEBUG: Starting sign in process...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('❌ AUTH ERROR: Sign in failed:', error);
      } else {
        console.log('✅ AUTH SUCCESS: Sign in completed', { userId: data.user?.id });
        updateAuthState(data.session, 'SIGNIN_SUCCESS');
      }
      
      return { error };
    } catch (error) {
      console.error('❌ AUTH ERROR: Exception during sign in:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('👋 AUTH DEBUG: Starting sign out process...');
      await supabase.auth.signOut();
      updateAuthState(null, 'SIGNOUT_SUCCESS');
    } catch (error) {
      console.error('❌ AUTH ERROR: Exception during sign out:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    refreshSession,
  };

  console.log('🎭 AUTH DEBUG: AuthProvider rendering with state:', {
    userExists: !!user,
    sessionExists: !!session,
    loading,
    userId: user?.id || 'NULL'
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
