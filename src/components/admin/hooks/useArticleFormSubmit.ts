
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Article } from "@/types/database";
import type { ArticleFormData } from "../types/ArticleFormTypes";
import { generateSlug } from "./utils/slugGenerator";
import { useSocialMediaPoster } from "./utils/socialMediaPoster";
import { prepareArticleData } from "./utils/articleDataPreparer";
import { getErrorMessage } from "./utils/errorHandler";

export const useArticleFormSubmit = (article?: Article, onSave?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { postToSocialMedia } = useSocialMediaPoster();

  const onSubmit = async (data: ArticleFormData) => {
    console.log('Form submission started with data:', data);
    setIsLoading(true);

    try {
      // If pinning as hero, unpin all other articles first
      if (data.pin_as_hero) {
        console.log('Unpinning other hero articles...');
        await supabase
          .from('articles')
          .update({ pin_as_hero: false })
          .neq('id', article?.id || '');
      }

      // Prepare the article data
      const articleData = prepareArticleData(data, article);
      console.log('Prepared article data for submission:', articleData);

      let result;
      let articleId: string;

      if (article) {
        console.log('Updating existing article with ID:', article.id);
        result = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', article.id)
          .select()
          .single();
        articleId = article.id;
      } else {
        console.log('Creating new article...');
        result = await supabase
          .from('articles')
          .insert(articleData)
          .select()
          .single();
        articleId = result.data?.id;
      }

      console.log('Supabase result:', result);

      if (result.error) {
        console.error('Supabase error details:', {
          error: result.error,
          message: result.error.message,
          details: result.error.details,
          hint: result.error.hint,
          code: result.error.code
        });
        
        const errorMessage = getErrorMessage(result.error);
        throw new Error(errorMessage);
      }

      if (!result.data) {
        throw new Error('No data returned from database operation');
      }

      console.log('Article saved successfully with ID:', articleId);

      // Show success toast immediately
      const successMessage = article ? 'Article updated successfully!' : 'Article created successfully!';
      toast({
        title: "Success",
        description: successMessage,
      });

      // Post to social media if publishing and social media is enabled
      if (data.published && (data.instagram_enabled || data.twitter_enabled || data.linkedin_enabled)) {
        console.log('Posting to social media...');
        // Run social media posting in the background
        postToSocialMedia(articleId, data);
      }

      console.log('Calling onSave callback...');
      onSave?.();
    } catch (error) {
      console.error('Error saving article:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: "Error",
        description: `Failed to ${article ? 'update' : 'create'} article: ${errorMessage}`,
        variant: "destructive",
      });
      throw error; // Re-throw so form can handle it
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onSubmit, generateSlug };
};
