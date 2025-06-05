
import { FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { Instagram } from "lucide-react";
import { InstagramImageOverlay } from "./InstagramImageOverlay";
import type { ArticleFormData } from "../types/ArticleFormTypes";

interface InstagramSectionProps {
  form: UseFormReturn<ArticleFormData>;
  watchTitle: string;
  watchExcerpt: string;
}

export const InstagramSection = ({ form, watchTitle, watchExcerpt }: InstagramSectionProps) => {
  const generateInstagramCaption = () => {
    const title = watchTitle || "";
    const excerpt = watchExcerpt || "";
    const caption = `${title}\n\n${excerpt}\n\n#UrbanVision #AfricanCities #UrbanDevelopment`;
    form.setValue("instagram_caption", caption);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="instagram_enabled"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-600" />
                Post to Instagram
              </FormLabel>
              <FormDescription>
                Automatically post to Instagram when publishing
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

      {form.watch("instagram_enabled") && (
        <div className="space-y-3">
          <InstagramImageOverlay form={form} watchTitle={watchTitle} />

          <FormField
            control={form.control}
            name="instagram_caption"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Instagram Caption</FormLabel>
                  <button
                    type="button"
                    onClick={generateInstagramCaption}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Auto-generate
                  </button>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Write your Instagram caption..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};
