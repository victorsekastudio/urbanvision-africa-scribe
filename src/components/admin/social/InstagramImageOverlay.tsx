
import { FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Image } from "lucide-react";
import type { ArticleFormData } from "../types/ArticleFormTypes";

interface InstagramImageOverlayProps {
  form: UseFormReturn<ArticleFormData>;
  watchTitle: string;
}

export const InstagramImageOverlay = ({ form, watchTitle }: InstagramImageOverlayProps) => {
  const generateInstagramImageText = () => {
    const title = watchTitle || "";
    // Create a shorter, punchier version for image overlay
    const imageText = title.length > 50 ? title.substring(0, 47) + "..." : title;
    form.setValue("instagram_image_text", imageText);
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center gap-2 mb-3">
        <Image className="w-4 h-4" />
        <span className="font-medium">Image Text Overlay</span>
      </div>
      
      <FormField
        control={form.control}
        name="instagram_image_text"
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between items-center">
              <FormLabel>Text on Image</FormLabel>
              <button
                type="button"
                onClick={generateInstagramImageText}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Use Title
              </button>
            </div>
            <FormControl>
              <Input
                placeholder="Text to overlay on the image..."
                {...field}
              />
            </FormControl>
            <FormDescription>
              Short text that will appear on the Instagram image
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="instagram_text_color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Text Color</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select text color" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="black">Black</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Choose text color for best readability on your image
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};
