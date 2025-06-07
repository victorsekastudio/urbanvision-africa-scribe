
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

export interface SubmitError {
  message: string;
  isRetryable: boolean;
  enhancedError: any;
}

export const useArticleFormSubmit = (article?: Article, onSave?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [lastError, setLastError] = useState<SubmitError | null>(null);
  const { toast } = useToast();
  const { postToSocialMedia } = useSocialMediaPoster();

  // Create retryable database operations
  const retryableUnpinHeroArticles = createRetryableOperation(
    async (currentArticleId?: string) => {
      console.log('🔄 DEBUG: Starting to unpin other hero articles...');
      const { error } = await supabase
        .from('articles')
        .update({ pin_as_hero: false })
        .neq('id', currentArticleId || '');
      
      if (error) {
        console.error('❌ DEBUG: Error unpinning hero articles:', error);
        throw error;
      }
      console.log('✅ DEBUG: Successfully unpinned other hero articles');
    }
  );

  const retryableUpdateArticle = createRetryableOperation(
    async (articleId: string, articleData: any) => {
      console.log('🔄 DEBUG: Updating existing article with ID:', articleId);
      console.log('📝 DEBUG: Article data being updated:', articleData);
      
      const result = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', articleId)
        .select()
        .single();
      
      if (result.error) {
        console.error('❌ DEBUG: Error updating article:', result.error);
        throw result.error;
      }
      
      console.log('✅ DEBUG: Article update successful:', result.data);
      return result;
    }
  );

  const retryableCreateArticle = createRetryableOperation(
    async (articleData: any) => {
      console.log('🔄 DEBUG: Creating new article...');
      console.log('📝 DEBUG: Article data being created:', articleData);
      
      const result = await supabase
        .from('articles')
        .insert(articleData)
        .select()
        .single();
      
      if (result.error) {
        console.error('❌ DEBUG: Error creating article:', result.error);
        throw result.error;
      }
      
      console.log('✅ DEBUG: Article creation successful:', result.data);
      return result;
    }
  );

  const onSubmit = async (data: ArticleFormData) => {
    console.log('🚀 DEBUG: Form submission started');
    console.log('📋 DEBUG: Form data received:', data);
    console.log('🏷️ DEBUG: Article mode:', article ? 'UPDATE' : 'CREATE');
    
    setIsLoading(true);
    setRetryCount(0);
    setLastError(null);

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
      console.log('🔧 DEBUG: Prepared article data for submission:', articleData);

      if (data.pin_as_hero) {
        console.log('🎯 DEBUG: Article marked as hero, unpinning others...');
        await retryableUnpinHeroArticles(article?.id);
      }

      if (article) {
        console.log('✏️ DEBUG: Executing article update...');
        result = await retryableUpdateArticle(article.id, articleData);
        articleId = article.id;
      } else {
        console.log('➕ DEBUG: Executing article creation...');
        result = await retryableCreateArticle(articleData);
        articleId = result.data?.id;
      }

      console.log('💾 DEBUG: Database operation completed successfully');
      console.log('🆔 DEBUG: Article ID:', articleId);
      console.log('📄 DEBUG: Result data:', result.data);

      if (!result.data) {
        console.error('❌ DEBUG: No data returned from database operation');
        throw new Error('No data returned from database operation');
      }

      // Show success toast immediately
      const successMessage = article ? 'Article updated successfully!' : 'Article created successfully!';
      console.log('🎉 DEBUG: Showing success toast:', successMessage);
      
      toast({
        title: "Success",
        description: successMessage,
      });

      // Post to social media if publishing and social media is enabled
      if (data.published && (data.instagram_enabled || data.twitter_enabled || data.linkedin_enabled)) {
        console.log('📱 DEBUG: Initiating social media posting...');
        // Run social media posting in the background without awaiting
        postToSocialMedia(articleId, data).catch(error => {
          console.error('❌ DEBUG: Social media posting failed:', error);
          toast({
            title: "Warning",
            description: "Article saved successfully, but social media posting failed. You can retry from the admin panel.",
            variant: "destructive",
          });
        });
      } else {
        console.log('📱 DEBUG: Skipping social media posting (not published or not enabled)');
      }

      console.log('📞 DEBUG: Calling onSave callback...');
      console.log('🔍 DEBUG: onSave function exists:', !!onSave);
      
      if (onSave) {
        console.log('🔄 DEBUG: Executing onSave callback');
        onSave();
        console.log('✅ DEBUG: onSave callback completed');
      } else {
        console.warn('⚠️ DEBUG: No onSave callback provided');
      }
      
    } catch (error) {
      console.error('💥 DEBUG: Error in article submission:', error);
      console.error('📊 DEBUG: Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        errorContext
      });
      
      setRetryCount(prev => prev + 1);
      
      const enhancedError = analyzeError(error, errorContext);
      const userMessage = formatErrorForUser(enhancedError);
      
      console.log('🔧 DEBUG: Enhanced error analysis:', enhancedError);
      console.log('💬 DEBUG: User-friendly error message:', userMessage);
      
      // Store error info for the component to handle
      setLastError({
        message: userMessage,
        isRetryable: enhancedError.isRetryable,
        enhancedError,
      });
      
      // Show basic error toast without retry button
      toast({
        title: "Error",
        description: userMessage,
        variant: "destructive",
      });
      
      throw error; // Re-throw so form can handle it
    } finally {
      console.log('🏁 DEBUG: Setting loading state to false');
      setIsLoading(false);
    }
  };

  const retrySubmit = async (data: ArticleFormData) => {
    console.log('🔄 DEBUG: Retry submit called with data:', data);
    await onSubmit(data);
  };

  return { 
    isLoading, 
    onSubmit, 
    generateSlug,
    retryCount,
    lastError,
    retrySubmit,
  };
};
