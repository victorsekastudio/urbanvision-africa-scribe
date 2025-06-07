
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Article } from "@/types/database";
import type { ArticleFormData } from "../types/ArticleFormTypes";
import { generateSlug } from "./utils/slugGenerator";
import { useSocialMediaPoster } from "./utils/socialMediaPoster";
import { prepareArticleData } from "./utils/articleDataPreparer";
import { analyzeError, formatErrorForUser, type ErrorContext } from "./utils/errorHandler";
import { withRetry, createRetryableOperation } from "./utils/retryHandler";

export const useArticleFormSubmit = (article?: Article, onSave?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();
  const { postToSocialMedia } = useSocialMediaPoster();

  // Create retryable database operations
  const retryableUnpinHeroArticles = createRetryableOperation(
    async (currentArticleId?: string) => {
      console.log('Unpinning other hero articles...');
      const { error } = await supabase
        .from('articles')
        .update({ pin_as_hero: false })
        .neq('id', currentArticleId || '');
      
      if (error) throw error;
    }
  );

  const retryableUpdateArticle = createRetryableOperation(
    async (articleId: string, articleData: any) => {
      console.log('Updating existing article with ID:', articleId);
      const result = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', articleId)
        .select()
        .single();
      
      if (result.error) throw result.error;
      return result;
    }
  );

  const retryableCreateArticle = createRetryableOperation(
    async (articleData: any) => {
      console.log('Creating new article...');
      const result = await supabase
        .from('articles')
        .insert(articleData)
        .select()
        .single();
      
      if (result.error) throw result.error;
      return result;
    }
  );

  const onSubmit = async (data: ArticleFormData) => {
    console.log('Form submission started with data:', data);
    setIsLoading(true);
    setRetryCount(0);

    const errorContext: ErrorContext = {
      operation: article ? 'update_article' : 'create_article',
      articleId: article?.id,
      timestamp: new Date().toISOString(),
    };

    try {
      // Use database transaction simulation for complex operations
      let result;
      let articleId: string;

      const articleData = prepareArticleData(data, article);
      console.log('Prepared article data for submission:', articleData);

      if (data.pin_as_hero) {
        // First unpin other hero articles
        await retryableUnpinHeroArticles(article?.id);
      }

      if (article) {
        // Update existing article
        result = await retryableUpdateArticle(article.id, articleData);
        articleId = article.id;
      } else {
        // Create new article
        result = await retryableCreateArticle(articleData);
        articleId = result.data?.id;
      }

      console.log('Database operation completed successfully:', result);

      if (!result.data) {
        throw new Error('No data returned from database operation');
      }

      // Show success toast immediately
      const successMessage = article ? 'Article updated successfully!' : 'Article created successfully!';
      toast({
        title: "Success",
        description: successMessage,
      });

      // Post to social media if publishing and social media is enabled
      if (data.published && (data.instagram_enabled || data.twitter_enabled || data.linkedin_enabled)) {
        console.log('Initiating social media posting...');
        // Run social media posting in the background without awaiting
        postToSocialMedia(articleId, data).catch(error => {
          console.error('Social media posting failed:', error);
          toast({
            title: "Warning",
            description: "Article saved successfully, but social media posting failed. You can retry from the admin panel.",
            variant: "destructive",
          });
        });
      }

      console.log('Calling onSave callback...');
      onSave?.();
      
    } catch (error) {
      console.error('Error saving article:', error);
      setRetryCount(prev => prev + 1);
      
      const enhancedError = analyzeError(error, errorContext);
      const userMessage = formatErrorForUser(enhancedError);
      
      toast({
        title: "Error",
        description: userMessage,
        variant: "destructive",
        action: enhancedError.isRetryable ? (
          <button
            onClick={() => onSubmit(data)}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Retry
          </button>
        ) : undefined,
      });
      
      throw error; // Re-throw so form can handle it
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    onSubmit, 
    generateSlug,
    retryCount,
  };
};
