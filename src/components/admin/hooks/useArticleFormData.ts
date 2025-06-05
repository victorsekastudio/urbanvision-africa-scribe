
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Author, Category } from "@/types/database";

export const useArticleFormData = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [defaultAuthorId, setDefaultAuthorId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const [authorsResponse, categoriesResponse] = await Promise.all([
        supabase.from('authors').select('*').order('name'),
        supabase.from('categories').select('*').order('name')
      ]);

      if (authorsResponse.data) {
        setAuthors(authorsResponse.data);
        
        // Find UrbanVision Editorial Team author and set as default
        const editorialTeam = authorsResponse.data.find(
          author => author.name === "UrbanVision Editorial Team"
        );
        
        if (editorialTeam) {
          setDefaultAuthorId(editorialTeam.id);
        }
      }
      
      if (categoriesResponse.data) setCategories(categoriesResponse.data);
    };

    fetchData();
  }, []);

  return { authors, categories, defaultAuthorId };
};
