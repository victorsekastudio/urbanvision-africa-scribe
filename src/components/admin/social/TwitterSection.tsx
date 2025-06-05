
import { FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { Twitter } from "lucide-react";
import { TwitterImageOverlay } from "./TwitterImageOverlay";
import type { ArticleFormData } from "../types/ArticleFormTypes";

interface TwitterSectionProps {
  form: UseFormReturn<ArticleFormData>;
  watchTitle: string;
  watchExcerpt: string;
}

export const TwitterSection = ({ form, watchTitle, watchExcerpt }: TwitterSectionProps) => {
  const generateTwitterCaption = () => {
    const title = watchTitle || "";
    const excerpt = watchExcerpt ? watchExcerpt.substring(0, 150) + "..." : "";
    const caption = `${title}\n\n${excerpt}\n\n#UrbanVision #AfricanCities`;
    form.setValue("twitter_caption", caption);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="twitter_enabled"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base flex items-center gap-2">
                <Twitter className="w-4 h-4 text-blue-600" />
                Post to Twitter
              </FormLabel>
              <FormDescription>
                Automatically post to Twitter when publishing
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {form.watch("twitter_enabled") && (
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="twitter_caption"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Twitter Caption</FormLabel>
                  <button
                    type="button"
                    onClick={generateTwitterCaption}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Auto-generate
                  </button>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Write your Twitter caption..."
                    className="min-h-[80px]"
                    maxLength={280}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {field.value?.length || 0}/280 characters
                </FormDescription>
              </FormItem>
            )}
          />

          <TwitterImageOverlay 
            form={form} 
            watchTitle={watchTitle} 
          />
        </div>
      )}
    </div>
  );
};
