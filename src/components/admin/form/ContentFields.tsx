
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface ContentFieldsProps {
  form: UseFormReturn<any>;
  currentLanguage: 'EN' | 'FR';
  onTitleChange?: (title: string) => void;
}

export const ContentFields = ({ form, currentLanguage, onTitleChange }: ContentFieldsProps) => {
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
                <Textarea {...field} placeholder="Brief description in English" />
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
              <Textarea {...field} placeholder="Brief description in French" />
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
