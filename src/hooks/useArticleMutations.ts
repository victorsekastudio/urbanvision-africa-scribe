
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuditLog } from "./useAuditLog";
import type { Article } from "@/types/database";

interface UpdateArticleStatusParams {
  id: string;
  field: 'published' | 'featured';
  value: boolean;
}

export const useUpdateArticleStatus = () => {
  const queryClient = useQueryClient();
  const { logAction } = useAuditLog();

  return useMutation({
    mutationFn: async ({ id, field, value }: UpdateArticleStatusParams) => {
      console.log(`🔄 Updating article ${field} status:`, { id, field, value });
      
      // Get current article for audit log
      const { data: currentArticle } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      const { data, error } = await supabase
        .from('articles')
        .update({ [field]: value })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Log the action
      await logAction({
        action: `UPDATE_ARTICLE_${field.toUpperCase()}`,
        table_name: 'articles',
        record_id: id,
        old_values: { [field]: currentArticle?.[field] },
        new_values: { [field]: value }
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  const { logAction } = useAuditLog();

  return useMutation({
    mutationFn: async (id: string) => {
      console.log('🗑️ Deleting article:', id);
      
      // Get current article for audit log
      const { data: currentArticle } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Log the action
      await logAction({
        action: 'DELETE_ARTICLE',
        table_name: 'articles',
        record_id: id,
        old_values: currentArticle
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};
