
import { generateSlug } from "./slugGenerator";
import type { Article } from "@/types/database";
import type { ArticleFormData } from "../../types/ArticleFormTypes";

export const prepareArticleData = (data: ArticleFormData, article?: Article) => {
  // Generate slug_fr if not provided
  const slugFr = data.slug_fr || (data.title_fr ? generateSlug(data.title_fr) : '');

  return {
    title: data.title,
    title_fr: data.title_fr || null,
    slug: data.slug || generateSlug(data.title),
    slug_fr: slugFr || null,
    excerpt: data.excerpt || null,
    excerpt_fr: data.excerpt_fr || null,
    content: data.content || null,
    content_fr: data.content_fr || null,
    author_id: data.author_id || null,
    category_id: data.category_id || null,
    published: data.published,
    featured: data.featured,
    pin_as_hero: data.pin_as_hero,
    featured_image_url: data.featured_image_url || null,
    meta_title: data.meta_title || null,
    meta_title_fr: data.meta_title_fr || null,
    meta_description: data.meta_description || null,
    meta_description_fr: data.meta_description_fr || null,
    meta_keywords: data.meta_keywords || null,
    meta_keywords_fr: data.meta_keywords_fr || null,
    og_image_url: data.og_image_url || null,
    canonical_url: data.canonical_url || null,
    canonical_url_fr: data.canonical_url_fr || null,
    instagram_enabled: data.instagram_enabled || false,
    twitter_enabled: data.twitter_enabled || false,
    linkedin_enabled: data.linkedin_enabled || false,
    instagram_caption: data.instagram_caption || null,
    twitter_caption: data.twitter_caption || null,
    linkedin_caption: data.linkedin_caption || null,
    social_hashtags: data.social_hashtags || null,
    instagram_image_text: data.instagram_image_text || null,
    instagram_text_color: data.instagram_text_color || 'white',
    twitter_image_text: data.twitter_image_text || null,
    twitter_text_color: data.twitter_text_color || 'white',
    linkedin_image_text: data.linkedin_image_text || null,
    linkedin_text_color: data.linkedin_text_color || 'white',
    published_at: data.published ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };
};
