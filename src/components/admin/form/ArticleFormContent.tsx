
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ContentFields } from "./ContentFields";
import { MetadataFields } from "./MetadataFields";
import { PublicationSettings } from "./PublicationSettings";
import { SocialMediaSection } from "../SocialMediaSection";
import { SEOSection } from "../SEOSection";
import { FormActions } from "./FormActions";
import type { ArticleFormData } from "../types/ArticleFormValidation";
import type { Author, Category } from "@/types/database";

interface ArticleFormContentProps {
  form: UseFormReturn<ArticleFormData>;
  authors: Author[];
  categories: Category[];
  defaultAuthorId: string;
  isLoading: boolean;
  isAutoSaving: boolean;
  isEditing: boolean;
  hasUnsavedChanges: boolean;
  onTitleChange: (title: string, language: 'en' | 'fr') => void;
  onSubmit: (data: ArticleFormData) => Promise<void>;
  onCancel: () => void;
}

export const ArticleFormContent = ({
  form,
  authors,
  categories,
  defaultAuthorId,
  isLoading,
  isAutoSaving,
  isEditing,
  hasUnsavedChanges,
  onTitleChange,
  onSubmit,
  onCancel,
}: ArticleFormContentProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ContentFields
          form={form}
          onTitleChange={onTitleChange}
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
          isLoading={isLoading || isAutoSaving}
          isEditing={isEditing}
          onCancel={onCancel}
          hasUnsavedChanges={hasUnsavedChanges}
        />
      </form>
    </Form>
  );
};
