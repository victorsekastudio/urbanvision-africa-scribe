
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuditLog } from "./useAuditLog";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed';
  created_at: string;
  updated_at: string;
}

export const useNewsletterSubscribers = () => {
  return useQuery({
    queryKey: ['newsletter-subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      return data as NewsletterSubscriber[];
    },
  });
};

export const useUpdateSubscriberStatus = () => {
  const queryClient = useQueryClient();
  const { logAction } = useAuditLog();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'active' | 'unsubscribed' }) => {
      // Get current subscriber for audit log
      const { data: currentSubscriber } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('id', id)
        .single();

      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      // Log the action
      await logAction({
        action: 'UPDATE_SUBSCRIBER_STATUS',
        table_name: 'newsletter_subscribers',
        record_id: id,
        old_values: { status: currentSubscriber?.status },
        new_values: { status }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter-subscribers'] });
    },
  });
};

export const useDeleteSubscriber = () => {
  const queryClient = useQueryClient();
  const { logAction } = useAuditLog();

  return useMutation({
    mutationFn: async (id: string) => {
      // Get current subscriber for audit log
      const { data: currentSubscriber } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('id', id)
        .single();

      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Log the action
      await logAction({
        action: 'DELETE_SUBSCRIBER',
        table_name: 'newsletter_subscribers',
        record_id: id,
        old_values: currentSubscriber
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter-subscribers'] });
    },
  });
};
