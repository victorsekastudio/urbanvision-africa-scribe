
import { useState } from "react";
import { useSlugValidation } from "./hooks/useSlugValidation";
import { useEnhancedFormState } from "./hooks/useEnhancedFormState";
import { useArticleFormData } from "./hooks/useArticleFormData";
import { useArticleFormSubmit } from "./hooks/useArticleFormSubmit";
import { useArticleFormState } from "./hooks/useArticleFormState";
import { StatusAlerts } from "./form/StatusAlerts";
import { ArticleFormContent } from "./form/ArticleFormContent";
import type { Article } from "@/types/database";
import type { ArticleFormData } from "./types/ArticleFormValidation";

interface ArticleFormProps {
  article?: Article;
  onSave: () => void;
  onCancel: () => void;
}

export const ArticleForm = ({ article, onSave, onCancel }: ArticleFormProps) => {
  const { authors, categories, defaultAuthorId, isLoading: dataLoading } = useArticleFormData();
  const { 
    isLoading: submitLoading, 
    onSubmit, 
    generateSlug, 
    lastError,
    retryCount,
    retrySubmit 
  } = useArticleFormSubmit(article, onSave);

  const {
    form,
    submitError,
    setSubmitError,
    submitSuccess,
    setSubmitSuccess,
    lastFormData,
    setLastFormData,
  } = useArticleFormState(article, defaultAuthorId, categories, dataLoading, lastError, retrySubmit);

  // Enhanced form state management
  const { formState: enhancedFormState, markAsSaved, resetFormState } = useEnhancedFormState(form, {
    enableAutoSave: false, // Will implement in Phase 3
    autoSaveDelay: 30000,
  });

  // Slug validation for both English and French
  const { 
    isValidating: isValidatingSlug, 
    isAvailable: isSlugAvailable, 
    error: slugError,
    suggestions: slugSuggestions,
  } = useSlugValidation(form.watch('slug'), article?.id);

  const [slugFrValidation] = useState({
    isValidating: false,
    isAvailable: true,
    error: null as string | null,
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

  const handleFormSubmit = async (data: ArticleFormData) => {
    console.log('Form submit handler called with data:', data);
    setSubmitError(null);
    setSubmitSuccess(null);
    setLastFormData(data); // Store for potential retry
    
    try {
      await onSubmit(data);
      
      setSubmitSuccess(article ? 'Article updated successfully!' : 'Article created successfully!');
      markAsSaved();
      
      // Reset form only if this is a new article (not editing)
      if (!article) {
        console.log('Resetting form after successful creation');
        resetFormState();
      }
      
      // Call onSave to trigger parent component refresh
      console.log('Calling onSave callback to refresh article list...');
      onSave();
      
    } catch (error) {
      console.error('Form submission failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setSubmitError(`Failed to ${article ? 'update' : 'create'} article: ${errorMessage}`);
    }
  };

  const handleSlugSuggestionClick = (suggestion: string) => {
    form.setValue('slug', suggestion);
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
      <StatusAlerts
        hasUnsavedChanges={enhancedFormState.hasUnsavedChanges}
        isAutoSaving={enhancedFormState.isAutoSaving}
        retryCount={retryCount}
        isValidatingSlug={isValidatingSlug}
        slugError={slugError}
        isSlugAvailable={isSlugAvailable}
        slugSuggestions={slugSuggestions}
        submitError={submitError}
        submitSuccess={submitSuccess}
        lastError={lastError}
        lastFormData={lastFormData}
        retrySubmit={retrySubmit}
        onSlugSuggestionClick={handleSlugSuggestionClick}
      />

      <ArticleFormContent
        form={form}
        authors={authors}
        categories={categories}
        defaultAuthorId={defaultAuthorId}
        isLoading={submitLoading}
        isAutoSaving={enhancedFormState.isAutoSaving}
        isEditing={!!article}
        hasUnsavedChanges={enhancedFormState.hasUnsavedChanges}
        onTitleChange={handleTitleChange}
        onSubmit={handleFormSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};
