
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleFormSchema, type ArticleFormData } from "../types/ArticleFormValidation";
import type { Article } from "@/types/database";

export const useArticleFormState = (
  article?: Article,
  defaultAuthorId?: string,
  categories: any[] = [],
  dataLoading = false
) => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [lastFormData, setLastFormData] = useState<ArticleFormData | null>(null);

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleFormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: "",
      title_fr: "",
      slug: "",
      slug_fr: "",
      excerpt: "",
      excerpt_fr: "",
      content: "",
      content_fr: "",
      author_id: "",
      category_id: "",
      published: false,
      featured: false,
      pin_as_hero: false,
      featured_image_url: "",
      meta_title: "",
      meta_title_fr: "",
      meta_description: "",
      meta_description_fr: "",
      meta_keywords: "",
      meta_keywords_fr: "",
      og_image_url: "",
      canonical_url: "",
      canonical_url_fr: "",
      instagram_enabled: false,
      twitter_enabled: false,
      linkedin_enabled: false,
      instagram_caption: "",
      twitter_caption: "",
      linkedin_caption: "",
      social_hashtags: "",
      instagram_image_text: "",
      instagram_text_color: 'white' as const,
      twitter_image_text: "",
      twitter_text_color: 'white' as const,
      linkedin_image_text: "",
      linkedin_text_color: 'white' as const,
    },
  });

  // Set form values when data is loaded
  useEffect(() => {
    if (!dataLoading && (defaultAuthorId || categories.length > 0)) {
      const values = {
        title: article?.title || "",
        title_fr: article?.title_fr || "",
        slug: article?.slug || "",
        slug_fr: article?.slug_fr || "",
        excerpt: article?.excerpt || "",
        excerpt_fr: article?.excerpt_fr || "",
        content: article?.content || "",
        content_fr: article?.content_fr || "",
        author_id: article?.author_id || defaultAuthorId,
        category_id: article?.category_id || (categories?.[0]?.id || ""),
        published: article?.published || false,
        featured: article?.featured || false,
        pin_as_hero: article?.pin_as_hero || false,
        featured_image_url: article?.featured_image_url || "",
        meta_title: article?.meta_title || "",
        meta_title_fr: article?.meta_title_fr || "",
        meta_description: article?.meta_description || "",
        meta_description_fr: article?.meta_description_fr || "",
        meta_keywords: article?.meta_keywords || "",
        meta_keywords_fr: article?.meta_keywords_fr || "",
        og_image_url: article?.og_image_url || "",
        canonical_url: article?.canonical_url || "",
        canonical_url_fr: article?.canonical_url_fr || "",
        instagram_enabled: article?.instagram_enabled || false,
        twitter_enabled: article?.twitter_enabled || false,
        linkedin_enabled: article?.linkedin_enabled || false,
        instagram_caption: article?.instagram_caption || "",
        twitter_caption: article?.twitter_caption || "",
        linkedin_caption: article?.linkedin_caption || "",
        social_hashtags: article?.social_hashtags || "",
        instagram_image_text: article?.instagram_image_text || "",
        instagram_text_color: (article?.instagram_text_color as 'white' | 'black') || 'white',
        twitter_image_text: article?.twitter_image_text || "",
        twitter_text_color: (article?.twitter_text_color as 'white' | 'black') || 'white',
        linkedin_image_text: article?.linkedin_image_text || "",
        linkedin_text_color: (article?.linkedin_text_color as 'white' | 'black') || 'white',
      };
      
      console.log('Setting form values:', values);
      form.reset(values);
    }
  }, [article, defaultAuthorId, categories, dataLoading, form]);

  return {
    form,
    submitError,
    setSubmitError,
    submitSuccess,
    setSubmitSuccess,
    lastFormData,
    setLastFormData,
  };
};
