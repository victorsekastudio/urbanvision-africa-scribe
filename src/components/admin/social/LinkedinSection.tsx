
import { FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { Linkedin } from "lucide-react";
import { LinkedinImageOverlay } from "./LinkedinImageOverlay";
import type { ArticleFormData } from "../types/ArticleFormTypes";

interface LinkedinSectionProps {
  form: UseFormReturn<ArticleFormData>;
  watchTitle: string;
  watchExcerpt: string;
}

export const LinkedinSection = ({ form, watchTitle, watchExcerpt }: LinkedinSectionProps) => {
  const generateLinkedinCaption = () => {
    const title = watchTitle || "";
    const excerpt = watchExcerpt ? watchExcerpt.substring(0, 200) + "..." : "";
    const caption = `${title}\n\n${excerpt}\n\n#UrbanVision #AfricanCities #ProfessionalDevelopment`;
    form.setValue("linkedin_caption", caption);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="linkedin_enabled"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-700" />
                Post to LinkedIn
              </FormLabel>
              <FormDescription>
                Automatically post to LinkedIn when publishing
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

      {form.watch("linkedin_enabled") && (
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="linkedin_caption"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>LinkedIn Caption</FormLabel>
                  <button
                    type="button"
                    onClick={generateLinkedinCaption}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Auto-generate
                  </button>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Write your LinkedIn caption..."
                    className="min-h-[100px]"
                    maxLength={3000}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {field.value?.length || 0}/3000 characters
                </FormDescription>
              </FormItem>
            )}
          />

          <LinkedinImageOverlay 
            form={form} 
            watchTitle={watchTitle} 
          />
        </div>
      )}
    </div>
  );
};
