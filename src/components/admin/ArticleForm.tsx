
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
  console.log('🎯 DEBUG: ArticleForm rendered');
  console.log('📝 DEBUG: Article prop:', article);
  console.log('📞 DEBUG: onSave callback exists:', !!onSave);
  console.log('📞 DEBUG: onCancel callback exists:', !!onCancel);

  const { authors, categories, defaultAuthorId, isLoading: dataLoading } = useArticleFormData();
  
  console.log('👥 DEBUG: Authors loaded:', authors?.length || 0);
  console.log('🏷️ DEBUG: Categories loaded:', categories?.length || 0);
  console.log('👤 DEBUG: Default author ID:', defaultAuthorId);
  console.log('⏳ DEBUG: Data loading:', dataLoading);

  const { 
    isLoading: submitLoading, 
    onSubmit, 
    generateSlug 
  } = useArticleFormSubmit(article, onSave);

  console.log('🔄 DEBUG: Submit loading:', submitLoading);

  const {
    form,
    submitError,
    setSubmitError,
    submitSuccess,
    setSubmitSuccess,
    lastFormData,
    setLastFormData,
  } = useArticleFormState(article, defaultAuthorId, categories, dataLoading);

  console.log('📋 DEBUG: Form state initialized');
  console.log('✅ DEBUG: Submit success:', submitSuccess);
  console.log('❌ DEBUG: Submit error:', submitError);

  // Enhanced form state management
  const { formState: enhancedFormState, markAsSaved, resetFormState } = useEnhancedFormState(form, {
    enableAutoSave: false, // Will implement in Phase 3
    autoSaveDelay: 30000,
  });

  console.log('🎛️ DEBUG: Enhanced form state:', enhancedFormState);

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
    console.log(`🏷️ DEBUG: ${language} title change handler called with:`, title);
    if (!article && title) {
      const newSlug = generateSlug(title);
      const slugField = language === 'en' ? 'slug' : 'slug_fr';
      const currentSlug = form.getValues(slugField);
      if (!currentSlug) {
        console.log(`🔗 DEBUG: Setting ${language} slug to:`, newSlug);
        form.setValue(slugField, newSlug);
      }
    }
  };

  const handleFormSubmit = async (data: ArticleFormData) => {
    console.log('🚀 DEBUG: Form submit handler called');
    console.log('📋 DEBUG: Form submission data:', data);
    
    setSubmitError(null);
    setSubmitSuccess(null);
    setLastFormData(data); // Store for potential retry
    
    console.log('💾 DEBUG: Stored form data for potential retry');
    
    try {
      console.log('🔄 DEBUG: Calling onSubmit...');
      await onSubmit(data);
      
      console.log('✅ DEBUG: onSubmit completed successfully');
      
      const successMessage = article ? 'Article updated successfully!' : 'Article created successfully!';
      setSubmitSuccess(successMessage);
      markAsSaved();
      
      // Reset form only if this is a new article (not editing)
      if (!article) {
        console.log('🔄 DEBUG: Resetting form after successful creation');
        resetFormState();
      }
      
      // Call onSave to trigger parent component refresh
      console.log('📞 DEBUG: Calling onSave callback to refresh article list...');
      console.log('🔍 DEBUG: onSave function check:', typeof onSave, !!onSave);
      
      if (onSave) {
        console.log('🔄 DEBUG: Executing onSave callback');
        onSave();
        console.log('✅ DEBUG: onSave callback execution completed');
      } else {
        console.warn('⚠️ DEBUG: onSave callback is not available');
      }
      
    } catch (error) {
      console.error('💥 DEBUG: Form submission failed:', error);
      console.error('📊 DEBUG: Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      const fullErrorMessage = `Failed to ${article ? 'update' : 'create'} article: ${errorMessage}`;
      
      console.log('💬 DEBUG: Setting error message:', fullErrorMessage);
      setSubmitError(fullErrorMessage);
    }
  };

  const handleSlugSuggestionClick = (suggestion: string) => {
    console.log('🔗 DEBUG: Slug suggestion clicked:', suggestion);
    form.setValue('slug', suggestion);
  };

  if (dataLoading) {
    console.log('⏳ DEBUG: Rendering loading skeleton');
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

  console.log('🎨 DEBUG: Rendering article form');

  return (
    <div className="space-y-6">
      <StatusAlerts
        hasUnsavedChanges={enhancedFormState.hasUnsavedChanges}
        isAutoSaving={enhancedFormState.isAutoSaving}
        isValidatingSlug={isValidatingSlug}
        slugError={slugError}
        isSlugAvailable={isSlugAvailable}
        slugSuggestions={slugSuggestions}
        submitError={submitError}
        submitSuccess={submitSuccess}
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
