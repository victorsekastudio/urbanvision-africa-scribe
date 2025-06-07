
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { ArticleFormData } from "../../types/ArticleFormTypes";

export const useSocialMediaPoster = () => {
  const { toast } = useToast();

  const postToSocialMedia = async (articleId: string, data: ArticleFormData) => {
    const promises = [];

    if (data.instagram_enabled && data.instagram_caption && data.featured_image_url) {
      const instagramPromise = fetch('/functions/v1/post-to-instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          articleId,
          imageUrl: data.featured_image_url,
          caption: `${data.instagram_caption}\n\n${data.social_hashtags || ''}`.trim(),
          imageText: data.instagram_image_text,
          textColor: data.instagram_text_color,
        }),
      });
      promises.push(instagramPromise);
    }

    if (data.twitter_enabled && data.twitter_caption && data.featured_image_url) {
      const twitterPromise = fetch('/functions/v1/post-to-twitter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          articleId,
          imageUrl: data.featured_image_url,
          caption: `${data.twitter_caption}\n\n${data.social_hashtags || ''}`.trim(),
          imageText: data.twitter_image_text,
          textColor: data.twitter_text_color,
        }),
      });
      promises.push(twitterPromise);
    }

    if (data.linkedin_enabled && data.linkedin_caption && data.featured_image_url) {
      const linkedinPromise = fetch('/functions/v1/post-to-linkedin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          articleId,
          imageUrl: data.featured_image_url,
          caption: `${data.linkedin_caption}\n\n${data.social_hashtags || ''}`.trim(),
          imageText: data.linkedin_image_text,
          textColor: data.linkedin_text_color,
        }),
      });
      promises.push(linkedinPromise);
    }

    if (promises.length > 0) {
      try {
        const results = await Promise.allSettled(promises);
        
        const failures = results.filter(result => result.status === 'rejected');
        if (failures.length > 0) {
          console.error('Some social media posts failed:', failures);
          toast({
            title: "Partial Success",
            description: "Article published but some social media posts failed. Check your social media credentials.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Article published and posted to social media!",
          });
        }
      } catch (error) {
        console.error('Social media posting error:', error);
        toast({
          title: "Warning",
          description: "Article published but social media posting failed. Check your credentials.",
          variant: "destructive",
        });
      }
    }
  };

  return { postToSocialMedia };
};
