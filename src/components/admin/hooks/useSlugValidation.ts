
import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useDebounce } from "@/hooks/useDebounce";

interface SlugValidationState {
  isValidating: boolean;
  isAvailable: boolean;
  error: string | null;
  suggestions: string[];
}

export const useSlugValidation = (initialSlug: string = "", articleId?: string) => {
  const [validationState, setValidationState] = useState<SlugValidationState>({
    isValidating: false,
    isAvailable: true,
    error: null,
    suggestions: [],
  });

  const debouncedSlug = useDebounce(initialSlug, 500);

  const validateSlug = useCallback(async (slug: string, field: 'slug' | 'slug_fr') => {
    if (!slug || slug.length < 2) {
      setValidationState({
        isValidating: false,
        isAvailable: true,
        error: null,
        suggestions: [],
      });
      return;
    }

    setValidationState(prev => ({ ...prev, isValidating: true, error: null }));

    try {
      let query = supabase
        .from('articles')
        .select('id, slug, slug_fr')
        .eq(field, slug);

      if (articleId) {
        query = query.neq('id', articleId);
      }

      const { data, error } = await query;

      if (error) {
        setValidationState({
          isValidating: false,
          isAvailable: false,
          error: 'Failed to validate slug',
          suggestions: [],
        });
        return;
      }

      const isAvailable = !data || data.length === 0;
      const suggestions = isAvailable ? [] : generateSlugSuggestions(slug);

      setValidationState({
        isValidating: false,
        isAvailable,
        error: isAvailable ? null : 'This slug is already taken',
        suggestions,
      });
    } catch (error) {
      console.error('Slug validation error:', error);
      setValidationState({
        isValidating: false,
        isAvailable: false,
        error: 'Failed to validate slug',
        suggestions: [],
      });
    }
  }, [articleId]);

  const generateSlugSuggestions = (baseSlug: string): string[] => {
    const timestamp = Date.now().toString().slice(-4);
    return [
      `${baseSlug}-${timestamp}`,
      `${baseSlug}-new`,
      `${baseSlug}-updated`,
      `${baseSlug}-v2`,
    ];
  };

  useEffect(() => {
    if (debouncedSlug) {
      validateSlug(debouncedSlug, 'slug');
    }
  }, [debouncedSlug, validateSlug]);

  const validateSlugFr = useCallback((slugFr: string) => {
    if (slugFr) {
      validateSlug(slugFr, 'slug_fr');
    }
  }, [validateSlug]);

  return {
    ...validationState,
    validateSlug: validateSlug,
    validateSlugFr,
    generateSlugSuggestions,
  };
};
