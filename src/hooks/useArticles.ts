
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/types/database";
import { useLanguage } from "./useLanguage";
import { useEffect } from "react";

export const useArticles = (published?: boolean, featured?: boolean, adminView?: boolean) => {
  const { currentLanguage } = useLanguage();
  const queryClient = useQueryClient();

  console.log('📚 DEBUG: useArticles hook called');
  console.log('🔧 DEBUG: Parameters:', { published, featured, adminView, currentLanguage });

  // Invalidate queries when language changes, but not for admin view
  useEffect(() => {
    if (!adminView) {
      console.log('🌐 DEBUG: Language changed, invalidating article queries');
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['hero-article'] });
      queryClient.invalidateQueries({ queryKey: ['pillar-articles'] });
    }
  }, [currentLanguage, queryClient, adminView]);

  return useQuery({
    queryKey: adminView 
      ? ['articles', 'admin', published, featured] 
      : ['articles', published, featured, currentLanguage],
    queryFn: async () => {
      console.log('🔍 DEBUG: Fetching articles with params:', { published, featured, adminView, currentLanguage });
      
      let query = supabase
        .from('articles')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .order('created_at', { ascending: false });

      if (published !== undefined) {
        console.log('📋 DEBUG: Filtering by published status:', published);
        query = query.eq('published', published);
      }

      if (featured !== undefined) {
        console.log('⭐ DEBUG: Filtering by featured status:', featured);
        query = query.eq('featured', featured);
      }

      console.log('🚀 DEBUG: Executing query...');
      const { data, error } = await query;

      if (error) {
        console.error('❌ DEBUG: Error fetching articles:', error);
        throw error;
      }

      console.log('✅ DEBUG: Articles fetched successfully');
      console.log('📊 DEBUG: Articles count:', data?.length || 0);
      console.log('📄 DEBUG: Article titles:', data?.map(a => a.title) || []);
      
      return data as Article[];
    },
    staleTime: adminView ? 0 : 5 * 60 * 1000, // Admin view always fetches fresh data
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
