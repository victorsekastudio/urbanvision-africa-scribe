
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { useEffect, useRef } from "react";

interface ContentFieldsProps {
  form: UseFormReturn<any>;
  currentLanguage: 'EN' | 'FR';
  onTitleChange?: (title: string) => void;
}

export const ContentFields = ({ form, currentLanguage, onTitleChange }: ContentFieldsProps) => {
  const previousLanguage = useRef<'EN' | 'FR'>(currentLanguage);

  // Clear opposite language fields when switching languages to prevent interference
  useEffect(() => {
    console.log('Language changed from', previousLanguage.current, 'to', currentLanguage);
    
    // Only clear if we're actually switching languages (not initial load)
    if (previousLanguage.current !== currentLanguage) {
      const currentValues = form.getValues();
      
      if (currentLanguage === 'EN') {
        // Switching to English - clear French fields if they match English fields
        if (currentValues.title && currentValues.title_fr === currentValues.title) {
          console.log('Clearing French title field');
          form.setValue('title_fr', '');
        }
        if (currentValues.excerpt && currentValues.excerpt_fr === currentValues.excerpt) {
          console.log('Clearing French excerpt field');
          form.setValue('excerpt_fr', '');
        }
        if (currentValues.content && currentValues.content_fr === currentValues.content) {
          console.log('Clearing French content field');
          form.setValue('content_fr', '');
        }
      } else {
        // Switching to French - clear English fields if they match French fields
        if (currentValues.title_fr && currentValues.title === currentValues.title_fr) {
          console.log('Clearing English title field');
          form.setValue('title', '');
        }
        if (currentValues.excerpt_fr && currentValues.excerpt === currentValues.excerpt_fr) {
          console.log('Clearing English excerpt field');
          form.setValue('excerpt', '');
        }
        if (currentValues.content_fr && currentValues.content === currentValues.content_fr) {
          console.log('Clearing English content field');
          form.setValue('content', '');
        }
      }
    }
    
    previousLanguage.current = currentLanguage;
  }, [currentLanguage, form]);

  if (currentLanguage === 'EN') {
    return (
      <>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title (English)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    console.log('English title changed:', e.target.value);
                    field.onChange(e);
                    onTitleChange?.(e.target.value);
                  }}
                  placeholder="Article title in English"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt (English)</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  value={field.value || ''}
                  onChange={(e) => {
                    console.log('English excerpt changed:', e.target.value.substring(0, 50));
                    field.onChange(e);
                  }}
                  placeholder="Brief description in English" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (English)</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  value={field.value || ''}
                  onChange={(e) => {
                    console.log('English content changed:', e.target.value.substring(0, 50));
                    field.onChange(e);
                  }}
                  placeholder="Article content in English"
                  className="min-h-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  return (
    <>
      <FormField
        control={form.control}
        name="title_fr"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title (French)</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || ''}
                onChange={(e) => {
                  console.log('French title changed:', e.target.value);
                  field.onChange(e);
                }}
                placeholder="Article title in French"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="excerpt_fr"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Excerpt (French)</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value || ''}
                onChange={(e) => {
                  console.log('French excerpt changed:', e.target.value.substring(0, 50));
                  field.onChange(e);
                }}
                placeholder="Brief description in French" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="content_fr"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content (French)</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value || ''}
                onChange={(e) => {
                  console.log('French content changed:', e.target.value.substring(0, 50));
                  field.onChange(e);
                }}
                placeholder="Article content in French"
                className="min-h-[200px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
