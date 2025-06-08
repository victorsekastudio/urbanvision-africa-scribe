
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuditLog } from "./useAuditLog";
import type { Category } from "@/types/database";

interface CreateCategoryData {
  name: string;
  name_fr?: string;
  slug: string;
  description?: string;
  description_fr?: string;
}

interface UpdateCategoryData extends CreateCategoryData {
  id: string;
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { logAction } = useAuditLog();

  return useMutation({
    mutationFn: async (data: CreateCategoryData) => {
      const { data: result, error } = await supabase
        .from('categories')
        .insert(data)
        .select()
        .single();

      if (error) throw error;

      // Log the action
      await logAction({
        action: 'CREATE_CATEGORY',
        table_name: 'categories',
        record_id: result.id,
        new_values: data
      });

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { logAction } = useAuditLog();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateCategoryData) => {
      // Get current category for audit log
      const { data: currentCategory } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

      const { data: result, error } = await supabase
        .from('categories')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Log the action
      await logAction({
        action: 'UPDATE_CATEGORY',
        table_name: 'categories',
        record_id: id,
        old_values: currentCategory,
        new_values: data
      });

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { logAction } = useAuditLog();

  return useMutation({
    mutationFn: async (id: string) => {
      // Get current category for audit log
      const { data: currentCategory } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Log the action
      await logAction({
        action: 'DELETE_CATEGORY',
        table_name: 'categories',
        record_id: id,
        old_values: currentCategory
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
