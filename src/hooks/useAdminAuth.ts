
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AdminAuthState {
  isAdmin: boolean;
  isCheckingAdmin: boolean;
  profile: any | null;
}

export const useAdminAuth = () => {
  const { user, loading } = useAuth();
  const [adminState, setAdminState] = useState<AdminAuthState>({
    isAdmin: false,
    isCheckingAdmin: true,
    profile: null,
  });

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (loading) return;
      
      if (!user) {
        setAdminState({
          isAdmin: false,
          isCheckingAdmin: false,
          profile: null,
        });
        return;
      }

      try {
        console.log('🔍 ADMIN AUTH: Checking admin status for user:', user.id);
        
        // Fetch user profile to check role
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('❌ ADMIN AUTH: Error fetching profile:', error);
          setAdminState({
            isAdmin: false,
            isCheckingAdmin: false,
            profile: null,
          });
          return;
        }

        const isAdmin = profile?.role === 'admin';
        console.log('✅ ADMIN AUTH: Admin check result:', { isAdmin, role: profile?.role });

        setAdminState({
          isAdmin,
          isCheckingAdmin: false,
          profile,
        });
      } catch (error) {
        console.error('❌ ADMIN AUTH: Exception during admin check:', error);
        setAdminState({
          isAdmin: false,
          isCheckingAdmin: false,
          profile: null,
        });
      }
    };

    checkAdminStatus();
  }, [user, loading]);

  return adminState;
};
