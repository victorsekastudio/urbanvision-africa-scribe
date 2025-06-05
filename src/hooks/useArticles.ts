
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/types/database";
import { useLanguage } from "./useLanguage";
import { useEffect } from "react";

export const useArticles = (published?: boolean, featured?: boolean) => {
  const { currentLanguage } = useLanguage();
  const queryClient = useQueryClient();

  // Invalidate queries when language changes
  useEffect(() => {
    console.log('Language changed, invalidating article queries');
    queryClient.invalidateQueries({ queryKey: ['articles'] });
    queryClient.invalidateQueries({ queryKey: ['hero-article'] });
    queryClient.invalidateQueries({ queryKey: ['pillar-articles'] });
  }, [currentLanguage, queryClient]);

  return useQuery({
    queryKey: ['articles', published, featured, currentLanguage],
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

      console.log('Articles fetched for language:', currentLanguage, data?.length || 0, 'articles');
      return data as Article[];
    },
  });
};

export const useCategories = () => {
  const { currentLanguage } = useLanguage();
  
  return useQuery({
    queryKey: ['categories', currentLanguage],
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
  const { currentLanguage } = useLanguage();
  
  return useQuery({
    queryKey: ['authors', currentLanguage],
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
