
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { SEOSection } from "./SEOSection";
import { LanguageToggle } from "./form/LanguageToggle";
import { ContentFields } from "./form/ContentFields";
import { MetadataFields } from "./form/MetadataFields";
import { PublicationSettings } from "./form/PublicationSettings";
import { FormActions } from "./form/FormActions";
import type { Article, Author, Category } from "@/types/database";

interface ArticleFormData {
  title: string;
  title_fr: string;
  slug: string;
  excerpt: string;
  excerpt_fr: string;
  content: string;
  content_fr: string;
  author_id: string;
  category_id: string;
  published: boolean;
  featured: boolean;
  pin_as_hero: boolean;
  featured_image_url: string;
  meta_title: string;
  meta_title_fr: string;
  meta_description: string;
  meta_description_fr: string;
  meta_keywords: string;
  meta_keywords_fr: string;
  og_image_url: string;
  canonical_url: string;
}

interface ArticleFormProps {
  article?: Article;
  onSave: () => void;
  onCancel: () => void;
}

export const ArticleForm = ({ article, onSave, onCancel }: ArticleFormProps) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultAuthorId, setDefaultAuthorId] = useState<string>("");
  const { toast } = useToast();
  const { currentLanguage, setLanguage } = useLanguage();

  const form = useForm<ArticleFormData>({
    defaultValues: {
      title: article?.title || "",
      title_fr: article?.title_fr || "",
      slug: article?.slug || "",
      excerpt: article?.excerpt || "",
      excerpt_fr: article?.excerpt_fr || "",
      content: article?.content || "",
      content_fr: article?.content_fr || "",
      author_id: article?.author_id || "",
      category_id: article?.category_id || "",
      published: article?.published || false,
      featured: article?.featured || false,
      pin_as_hero: (article as any)?.pin_as_hero || false,
      featured_image_url: article?.featured_image_url || "",
      meta_title: article?.meta_title || "",
      meta_title_fr: article?.meta_title_fr || "",
      meta_description: article?.meta_description || "",
      meta_description_fr: article?.meta_description_fr || "",
      meta_keywords: article?.meta_keywords || "",
      meta_keywords_fr: article?.meta_keywords_fr || "",
      og_image_url: article?.og_image_url || "",
      canonical_url: article?.canonical_url || "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const [authorsResponse, categoriesResponse] = await Promise.all([
        supabase.from('authors').select('*').order('name'),
        supabase.from('categories').select('*').order('name')
      ]);

      if (authorsResponse.data) {
        setAuthors(authorsResponse.data);
        
        // Find UrbanVision Editorial Team author and set as default
        const editorialTeam = authorsResponse.data.find(
          author => author.name === "UrbanVision Editorial Team"
        );
        
        if (editorialTeam && !article) {
          setDefaultAuthorId(editorialTeam.id);
          form.setValue('author_id', editorialTeam.id);
        }
      }
      
      if (categoriesResponse.data) setCategories(categoriesResponse.data);
    };

    fetchData();
  }, [article, form]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
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
      if (article) {
        result = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', article.id);
      } else {
        result = await supabase
          .from('articles')
          .insert([articleData]);
      }

      if (result.error) {
        throw result.error;
      }

      toast({
        title: "Success",
        description: `Article ${article ? 'updated' : 'created'} successfully`,
      });

      onSave();
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

  const handleTitleChange = (title: string) => {
    if (!article) {
      form.setValue('slug', generateSlug(title));
    }
  };

  return (
    <div className="space-y-6">
      <LanguageToggle
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ContentFields
            form={form}
            currentLanguage={currentLanguage}
            onTitleChange={handleTitleChange}
          />

          <MetadataFields
            form={form}
            authors={authors}
            categories={categories}
            defaultAuthorId={defaultAuthorId}
          />

          <PublicationSettings form={form} />

          <SEOSection form={form} currentLanguage={currentLanguage} />

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
