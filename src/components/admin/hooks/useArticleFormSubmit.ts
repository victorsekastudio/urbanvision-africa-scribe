
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
        }),
      });
      promises.push(twitterPromise);
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
      let articleId: string;

      if (article) {
        result = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', article.id)
          .select()
          .single();
        articleId = article.id;
      } else {
        result = await supabase
          .from('articles')
          .insert([articleData])
          .select()
          .single();
        articleId = result.data?.id;
      }

      if (result.error) {
        throw result.error;
      }

      // Post to social media if publishing and social media is enabled
      if (data.published && (data.instagram_enabled || data.twitter_enabled)) {
        // Run social media posting in the background
        postToSocialMedia(articleId, data);
      } else {
        toast({
          title: "Success",
          description: `Article ${article ? 'updated' : 'created'} successfully`,
        });
      }

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
