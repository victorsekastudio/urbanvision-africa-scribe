
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Article } from "@/types/database";
import type { ArticleFormData } from "../types/ArticleFormTypes";
import { generateSlug } from "./utils/slugGenerator";
import { useSocialMediaPoster } from "./utils/socialMediaPoster";
import { prepareArticleData } from "./utils/articleDataPreparer";

export const useArticleFormSubmit = (article?: Article, onSave?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { postToSocialMedia } = useSocialMediaPoster();

  const onSubmit = async (data: ArticleFormData) => {
    console.log('🚀 DEBUG: Form submission started');
    console.log('📋 DEBUG: Form data received:', data);
    console.log('🏷️ DEBUG: Article mode:', article ? 'UPDATE' : 'CREATE');
    
    setIsLoading(true);

    try {
      let result;
      let articleId: string;

      const articleData = prepareArticleData(data, article);
      console.log('🔧 DEBUG: Prepared article data for submission:', articleData);

      // Handle hero article pinning
      if (data.pin_as_hero) {
        console.log('🎯 DEBUG: Article marked as hero, unpinning others...');
        const { error: unpinError } = await supabase
          .from('articles')
          .update({ pin_as_hero: false })
          .neq('id', article?.id || '');
        
        if (unpinError) {
          console.error('❌ DEBUG: Error unpinning hero articles:', unpinError);
          throw unpinError;
        }
        console.log('✅ DEBUG: Successfully unpinned other hero articles');
      }

      if (article) {
        console.log('✏️ DEBUG: Executing article update...');
        result = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', article.id)
          .select()
          .single();
        articleId = article.id;
      } else {
        console.log('➕ DEBUG: Executing article creation...');
        result = await supabase
          .from('articles')
          .insert(articleData)
          .select()
          .single();
        articleId = result.data?.id;
      }

      if (result.error) {
        console.error('❌ DEBUG: Database operation failed:', result.error);
        throw result.error;
      }

      console.log('💾 DEBUG: Database operation completed successfully');
      console.log('🆔 DEBUG: Article ID:', articleId);
      console.log('📄 DEBUG: Result data:', result.data);

      if (!result.data) {
        console.error('❌ DEBUG: No data returned from database operation');
        throw new Error('No data returned from database operation');
      }

      // Show success toast
      const successMessage = article ? 'Article updated successfully!' : 'Article created successfully!';
      console.log('🎉 DEBUG: Showing success toast:', successMessage);
      
      toast({
        title: "Success",
        description: successMessage,
      });

      // Post to social media if publishing and social media is enabled
      if (data.published && (data.instagram_enabled || data.twitter_enabled || data.linkedin_enabled)) {
        console.log('📱 DEBUG: Initiating social media posting...');
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
      if (onSave) {
        console.log('🔄 DEBUG: Executing onSave callback');
        onSave();
        console.log('✅ DEBUG: onSave callback completed');
      } else {
        console.warn('⚠️ DEBUG: No onSave callback provided');
      }
      
    } catch (error) {
      console.error('💥 DEBUG: Error in article submission:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    } finally {
      console.log('🏁 DEBUG: Setting loading state to false');
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    onSubmit, 
    generateSlug,
  };
};
