
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AuditLogEntry {
  action: string;
  table_name?: string;
  record_id?: string;
  old_values?: any;
  new_values?: any;
}

export const useAuditLog = () => {
  const { user } = useAuth();

  const logAction = async (entry: AuditLogEntry) => {
    if (!user) {
      console.warn('🚫 AUDIT: No user found, skipping audit log');
      return;
    }

    try {
      console.log('📝 AUDIT: Logging action:', entry);
      
      const { error } = await supabase
        .from('admin_audit_log')
        .insert({
          admin_user_id: user.id,
          action: entry.action,
          table_name: entry.table_name,
          record_id: entry.record_id,
          old_values: entry.old_values,
          new_values: entry.new_values,
          ip_address: null, // Browser can't access real IP
          user_agent: navigator.userAgent,
        });

      if (error) {
        console.error('❌ AUDIT: Error logging action:', error);
      } else {
        console.log('✅ AUDIT: Action logged successfully');
      }
    } catch (error) {
      console.error('❌ AUDIT: Exception logging action:', error);
    }
  };

  return { logAction };
};
