
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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

  return useMutation({
    mutationFn: async (data: CreateAuthorData) => {
      const { data: result, error } = await supabase
        .from('authors')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });
};

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateAuthorData) => {
      const { data: result, error } = await supabase
        .from('authors')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });
};

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('authors')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });
};
