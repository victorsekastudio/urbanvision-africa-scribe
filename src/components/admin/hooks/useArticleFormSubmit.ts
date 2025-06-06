
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

  const onSubmit = async (data: ArticleFormData) => {
    console.log('Form submission started with data:', data);
    setIsLoading(true);

    try {
      // Generate slug_fr if not provided
      const slugFr = data.slug_fr || (data.title_fr ? generateSlug(data.title_fr) : '');

      // If pinning as hero, unpin all other articles first
      if (data.pin_as_hero) {
        console.log('Unpinning other hero articles...');
        await supabase
          .from('articles')
          .update({ pin_as_hero: false })
          .neq('id', article?.id || '');
      }

      const articleData = {
        ...data,
        slug: data.slug || generateSlug(data.title),
        slug_fr: slugFr,
        published_at: data.published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      };

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
          .insert([articleData])
          .select()
          .single();
        articleId = result.data?.id;
      }

      console.log('Supabase result:', result);

      if (result.error) {
        console.error('Supabase error:', result.error);
        throw result.error;
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
      toast({
        title: "Error",
        description: `Failed to ${article ? 'update' : 'create'} article: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
      throw error; // Re-throw so form can handle it
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onSubmit, generateSlug };
};
