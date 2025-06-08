
import type { Article } from "@/types/database";
import type { ArticleFormData } from "../types/ArticleFormTypes";
import { generateSlug } from "./utils/slugGenerator";
import { useSocialMediaPoster } from "./utils/socialMediaPoster";
import { useSubmissionState } from "./submission/useSubmissionState";
import { useHeroArticleManager } from "./submission/useHeroArticleManager";
import { useArticleDatabase } from "./submission/useArticleDatabase";
import { useSubmissionNotifications } from "./submission/useSubmissionNotifications";

export const useArticleFormSubmit = (article?: Article, onSave?: () => void) => {
  const { isLoading, setLoading, resetState } = useSubmissionState();
  const { handleHeroArticlePinning } = useHeroArticleManager();
  const { createArticle, updateArticle } = useArticleDatabase();
  const { showSuccessNotification, showErrorNotification, showSocialMediaWarning } = useSubmissionNotifications();
  const { postToSocialMedia } = useSocialMediaPoster();

  const onSubmit = async (data: ArticleFormData) => {
    console.log('🚀 DEBUG: Form submission started');
    console.log('📋 DEBUG: Form data received:', data);
    console.log('🏷️ DEBUG: Article mode:', article ? 'UPDATE' : 'CREATE');
    
    setLoading(true);
    resetState();

    try {
      // Handle hero article pinning
      await handleHeroArticlePinning({
        shouldPin: data.pin_as_hero,
        currentArticleId: article?.id,
      });

      // Perform database operation
      let result;
      let articleId: string;

      if (article) {
        result = await updateArticle(article, data);
        articleId = article.id;
      } else {
        result = await createArticle(data);
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

      // Show success notification
      showSuccessNotification({
        isUpdate: !!article,
        showToast: true,
      });

      // Post to social media if publishing and social media is enabled
      if (data.published && (data.instagram_enabled || data.twitter_enabled || data.linkedin_enabled)) {
        console.log('📱 DEBUG: Initiating social media posting...');
        postToSocialMedia(articleId, data).catch(error => {
          console.error('❌ DEBUG: Social media posting failed:', error);
          showSocialMediaWarning();
        });
      } else {
        console.log('📱 DEBUG: Skipping social media posting (not published or not enabled)');
      }

      // Call onSave callback
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
      showErrorNotification(error);
      throw error;
    } finally {
      console.log('🏁 DEBUG: Setting loading state to false');
      setLoading(false);
    }
  };

  return { 
    isLoading, 
    onSubmit, 
    generateSlug,
  };
};
