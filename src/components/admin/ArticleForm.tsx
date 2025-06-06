
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { SEOSection } from "./SEOSection";
import { SocialMediaSection } from "./SocialMediaSection";
import { ContentFields } from "./form/ContentFields";
import { MetadataFields } from "./form/MetadataFields";
import { PublicationSettings } from "./form/PublicationSettings";
import { FormActions } from "./form/FormActions";
import { useArticleFormData } from "./hooks/useArticleFormData";
import { useArticleFormSubmit } from "./hooks/useArticleFormSubmit";
import { articleFormSchema, type ArticleFormData } from "./types/ArticleFormValidation";
import type { Article } from "@/types/database";
import { useState, useEffect } from "react";

interface ArticleFormProps {
  article?: Article;
  onSave: () => void;
  onCancel: () => void;
}

export const ArticleForm = ({ article, onSave, onCancel }: ArticleFormProps) => {
  const { authors, categories, defaultAuthorId, isLoading: dataLoading } = useArticleFormData();
  const { isLoading: submitLoading, onSubmit, generateSlug } = useArticleFormSubmit(article, onSave);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

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

  const handleTitleChange = (title: string, language: 'en' | 'fr') => {
    console.log(`${language} title change handler called with:`, title);
    if (!article && title) {
      const newSlug = generateSlug(title);
      const slugField = language === 'en' ? 'slug' : 'slug_fr';
      const currentSlug = form.getValues(slugField);
      if (!currentSlug) {
        console.log(`Setting ${language} slug to:`, newSlug);
        form.setValue(slugField, newSlug);
      }
    }
  };

  const handleFormSubmit = async (data: ArticleFormData) => {
    console.log('Form submit handler called');
    setSubmitError(null);
    setSubmitSuccess(null);
    
    try {
      await onSubmit(data);
      
      setSubmitSuccess(article ? 'Article updated successfully!' : 'Article created successfully!');
      
      // Reset form only if this is a new article (not editing)
      if (!article) {
        console.log('Resetting form after successful creation');
        form.reset();
      }
      
      // Call onSave after a short delay to show success message
      setTimeout(() => {
        onSave();
      }, 1000);
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmitError(`Failed to ${article ? 'update' : 'create'} article: ${error.message || 'Unknown error'}`);
    }
  };

  if (dataLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {submitError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
      
      {submitSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{submitSuccess}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <ContentFields
            form={form}
            onTitleChange={handleTitleChange}
          />

          <MetadataFields
            form={form}
            authors={authors}
            categories={categories}
            defaultAuthorId={defaultAuthorId}
          />

          <PublicationSettings form={form} />

          <SocialMediaSection form={form} />

          <SEOSection form={form} />

          <FormActions
            isLoading={submitLoading}
            isEditing={!!article}
            onCancel={onCancel}
          />
        </form>
      </Form>
    </div>
  );
};
