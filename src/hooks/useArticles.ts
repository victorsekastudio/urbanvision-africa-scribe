
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/types/database";

export const useArticles = (published?: boolean, featured?: boolean) => {
  return useQuery({
    queryKey: ['articles', published, featured],
    queryFn: async () => {
      let query = supabase
        .from('articles')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .order('created_at', { ascending: false });

      if (published !== undefined) {
        query = query.eq('published', published);
      }

      if (featured !== undefined) {
        query = query.eq('featured', featured);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching articles:', error);
        throw error;
      }

      return data as Article[];
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      return data;
    },
  });
};

export const useAuthors = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching authors:', error);
        throw error;
      }

      return data;
    },
  });
};
