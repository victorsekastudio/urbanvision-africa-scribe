
import { FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { ArticleFormData } from "../types/ArticleFormTypes";

interface SocialHashtagsFieldProps {
  form: UseFormReturn<ArticleFormData>;
}

export const SocialHashtagsField = ({ form }: SocialHashtagsFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="social_hashtags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Additional Hashtags</FormLabel>
          <FormControl>
            <Input
              placeholder="#hashtag1 #hashtag2 #hashtag3"
              {...field}
            />
          </FormControl>
          <FormDescription>
            Add additional hashtags separated by spaces (will be added to both platforms)
          </FormDescription>
        </FormItem>
      )}
    />
  );
};
