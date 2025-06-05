
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface ContentFieldsProps {
  form: UseFormReturn<any>;
  onTitleChange?: (title: string) => void;
}

export const ContentFields = ({ form, onTitleChange }: ContentFieldsProps) => {
  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
      </div>

      {/* Excerpt Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
      </div>
    </div>
  );
};
