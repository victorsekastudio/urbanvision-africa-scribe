
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { SEOSection } from "./SEOSection";
import { SocialMediaSection } from "./SocialMediaSection";
import { ContentFields } from "./form/ContentFields";
import { MetadataFields } from "./form/MetadataFields";
import { PublicationSettings } from "./form/PublicationSettings";
import { FormActions } from "./form/FormActions";
import { useArticleFormData } from "./hooks/useArticleFormData";
import { useArticleFormSubmit } from "./hooks/useArticleFormSubmit";
import type { Article } from "@/types/database";
import type { ArticleFormData } from "./types/ArticleFormTypes";

interface ArticleFormProps {
  article?: Article;
  onSave: () => void;
  onCancel: () => void;
}

export const ArticleForm = ({ article, onSave, onCancel }: ArticleFormProps) => {
  const { authors, categories, defaultAuthorId } = useArticleFormData();
  const { isLoading, onSubmit, generateSlug } = useArticleFormSubmit(article, onSave);

  const form = useForm<ArticleFormData>({
    mode: 'onBlur',
    defaultValues: {
      title: article?.title || "",
      title_fr: article?.title_fr || "",
      slug: article?.slug || "",
      slug_fr: article?.slug_fr || "",
      excerpt: article?.excerpt || "",
      excerpt_fr: article?.excerpt_fr || "",
      content: article?.content || "",
      content_fr: article?.content_fr || "",
      author_id: article?.author_id || defaultAuthorId,
      category_id: article?.category_id || "",
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
      instagram_text_color: article?.instagram_text_color || 'white',
      twitter_image_text: article?.twitter_image_text || "",
      twitter_text_color: article?.twitter_text_color || 'white',
      linkedin_image_text: article?.linkedin_image_text || "",
      linkedin_text_color: article?.linkedin_text_color || 'white',
    },
  });

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

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            isLoading={isLoading}
            isEditing={!!article}
            onCancel={onCancel}
          />
        </form>
      </Form>
    </div>
  );
};
