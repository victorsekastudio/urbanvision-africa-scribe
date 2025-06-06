
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Author, Category } from "@/types/database";

export const useArticleFormData = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [defaultAuthorId, setDefaultAuthorId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const [authorsResponse, categoriesResponse] = await Promise.all([
          supabase.from('authors').select('*').order('name'),
          supabase.from('categories').select('*').order('name')
        ]);

        if (authorsResponse.error) throw authorsResponse.error;
        if (categoriesResponse.error) throw categoriesResponse.error;

        if (authorsResponse.data) {
          setAuthors(authorsResponse.data);
          
          // Find UrbanVision Editorial Team author and set as default
          const editorialTeam = authorsResponse.data.find(
            author => author.name === "UrbanVision Editorial Team"
          );
          
          if (editorialTeam) {
            setDefaultAuthorId(editorialTeam.id);
          } else if (authorsResponse.data.length > 0) {
            // Fallback to first author if editorial team not found
            setDefaultAuthorId(authorsResponse.data[0].id);
          }
        }
        
        if (categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { authors, categories, defaultAuthorId, isLoading };
};
