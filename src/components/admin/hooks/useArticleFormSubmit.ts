
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Article } from "@/types/database";
import type { ArticleFormData } from "../types/ArticleFormTypes";

export const useArticleFormSubmit = (article?: Article, onSave?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const onSubmit = async (data: ArticleFormData) => {
    setIsLoading(true);

    try {
      // If pinning as hero, unpin all other articles first
      if (data.pin_as_hero) {
        await supabase
          .from('articles')
          .update({ pin_as_hero: false })
          .neq('id', article?.id || '');
      }

      const articleData = {
        ...data,
        slug: data.slug || generateSlug(data.title),
        published_at: data.published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      };

      let result;
      if (article) {
        result = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', article.id);
      } else {
        result = await supabase
          .from('articles')
          .insert([articleData]);
      }

      if (result.error) {
        throw result.error;
      }

      toast({
        title: "Success",
        description: `Article ${article ? 'updated' : 'created'} successfully`,
      });

      onSave?.();
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Error",
        description: `Failed to ${article ? 'update' : 'create'} article`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onSubmit, generateSlug };
};
