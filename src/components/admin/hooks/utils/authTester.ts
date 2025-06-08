
import { supabase } from "@/integrations/supabase/client";

export const testDatabaseAuth = async () => {
  console.log('🧪 AUTH TEST: Testing database authentication context...');
  
  // Test 1: Check current session on client side
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  console.log('📋 AUTH TEST: Client session check:', {
    hasSession: !!session,
    userId: session?.user?.id || 'NULL',
    error: sessionError
  });

  // Test 2: Try to query a table that requires authentication
  try {
    const { data: articlesTest, error: articlesError } = await supabase
      .from('articles')
      .select('id')
      .limit(1);
      
    console.log('📰 AUTH TEST: Articles query result:', {
      success: !articlesError,
      dataLength: articlesTest?.length || 0,
      error: articlesError?.message || null
    });
  } catch (error) {
    console.error('❌ AUTH TEST: Articles query exception:', error);
  }

  // Test 3: Try to query profiles table
  try {
    const { data: profilesTest, error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
      
    console.log('👤 AUTH TEST: Profiles query result:', {
      success: !profilesError,
      dataLength: profilesTest?.length || 0,
      error: profilesError?.message || null
    });
  } catch (error) {
    console.error('❌ AUTH TEST: Profiles query exception:', error);
  }

  return {
    hasSession: !!session,
    userId: session?.user?.id,
    sessionError,
  };
};
