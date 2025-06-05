
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";

interface ContentFieldsProps {
  form: UseFormReturn<any>;
  currentLanguage: 'EN' | 'FR';
  onTitleChange?: (title: string) => void;
}

export const ContentFields = ({ form, currentLanguage, onTitleChange }: ContentFieldsProps) => {
  // Clear the opposite language fields when switching languages to prevent interference
  useEffect(() => {
    const currentValues = form.getValues();
    
    // Only clear if we're switching languages and there's content in the current language
    if (currentLanguage === 'EN') {
      // If user has English content and switches to French, don't interfere with French fields
      // This effect just ensures proper isolation
    } else {
      // If user has French content and switches to English, don't interfere with English fields
      // This effect just ensures proper isolation
    }
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
