
import { useState, useCallback, useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ArticleFormData } from "../types/ArticleFormValidation";

interface FormStateOptions {
  autoSaveDelay?: number;
  enableAutoSave?: boolean;
  onAutoSave?: (data: ArticleFormData) => Promise<void>;
}

interface FormState {
  isDirty: boolean;
  isAutoSaving: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
}

export const useEnhancedFormState = (
  form: UseFormReturn<ArticleFormData>,
  options: FormStateOptions = {}
) => {
  const { autoSaveDelay = 30000, enableAutoSave = false, onAutoSave } = options;
  const { toast } = useToast();
  
  const [formState, setFormState] = useState<FormState>({
    isDirty: false,
    isAutoSaving: false,
    lastSaved: null,
    hasUnsavedChanges: false,
  });

  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();
  const formDataRef = useRef<ArticleFormData>();

  // Track form changes
  const formValues = form.watch();

  useEffect(() => {
    const isDirty = form.formState.isDirty;
    const hasUnsavedChanges = isDirty && formState.lastSaved === null;

    setFormState(prev => ({
      ...prev,
      isDirty,
      hasUnsavedChanges,
    }));

    // Auto-save logic
    if (enableAutoSave && isDirty && onAutoSave && formValues) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      autoSaveTimeoutRef.current = setTimeout(async () => {
        try {
          setFormState(prev => ({ ...prev, isAutoSaving: true }));
          console.log('Auto-saving form data...');
          
          await onAutoSave(formValues);
          
          setFormState(prev => ({
            ...prev,
            isAutoSaving: false,
            lastSaved: new Date(),
            hasUnsavedChanges: false,
          }));

          toast({
            title: "Auto-saved",
            description: "Your changes have been automatically saved as a draft.",
            duration: 2000,
          });
        } catch (error) {
          console.error('Auto-save failed:', error);
          setFormState(prev => ({ ...prev, isAutoSaving: false }));
          
          toast({
            title: "Auto-save failed",
            description: "Failed to save draft. Your changes are still preserved in the form.",
            variant: "destructive",
            duration: 3000,
          });
        }
      }, autoSaveDelay);
    }

    formDataRef.current = formValues;
  }, [formValues, form.formState.isDirty, enableAutoSave, onAutoSave, autoSaveDelay, toast, formState.lastSaved]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  const markAsSaved = useCallback(() => {
    setFormState(prev => ({
      ...prev,
      lastSaved: new Date(),
      hasUnsavedChanges: false,
    }));
  }, []);

  const resetFormState = useCallback(() => {
    setFormState({
      isDirty: false,
      isAutoSaving: false,
      lastSaved: null,
      hasUnsavedChanges: false,
    });
    form.reset();
  }, [form]);

  // Warning before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (formState.hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formState.hasUnsavedChanges]);

  return {
    formState,
    markAsSaved,
    resetFormState,
  };
};
