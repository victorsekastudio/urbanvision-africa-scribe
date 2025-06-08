
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuditLog } from "./useAuditLog";
import type { Author } from "@/types/database";

interface CreateAuthorData {
  name: string;
  email?: string;
  bio?: string;
  bio_fr?: string;
  avatar_url?: string;
}

interface UpdateAuthorData extends CreateAuthorData {
  id: string;
}

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();
  const { logAction } = useAuditLog();

  return useMutation({
    mutationFn: async (data: CreateAuthorData) => {
      const { data: result, error } = await supabase
        .from('authors')
        .insert(data)
        .select()
        .single();

      if (error) throw error;

      // Log the action
      await logAction({
        action: 'CREATE_AUTHOR',
        table_name: 'authors',
        record_id: result.id,
        new_values: data
      });

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });
};

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();
  const { logAction } = useAuditLog();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateAuthorData) => {
      // Get current author for audit log
      const { data: currentAuthor } = await supabase
        .from('authors')
        .select('*')
        .eq('id', id)
        .single();

      const { data: result, error } = await supabase
        .from('authors')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Log the action
      await logAction({
        action: 'UPDATE_AUTHOR',
        table_name: 'authors',
        record_id: id,
        old_values: currentAuthor,
        new_values: data
      });

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });
};

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();
  const { logAction } = useAuditLog();

  return useMutation({
    mutationFn: async (id: string) => {
      // Get current author for audit log
      const { data: currentAuthor } = await supabase
        .from('authors')
        .select('*')
        .eq('id', id)
        .single();

      const { error } = await supabase
        .from('authors')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Log the action
      await logAction({
        action: 'DELETE_AUTHOR',
        table_name: 'authors',
        record_id: id,
        old_values: currentAuthor
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });
};
