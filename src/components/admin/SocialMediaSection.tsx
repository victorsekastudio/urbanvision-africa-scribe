
import { FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Instagram, Twitter, Hash, Image } from "lucide-react";
import type { ArticleFormData } from "./types/ArticleFormTypes";

interface SocialMediaSectionProps {
  form: UseFormReturn<ArticleFormData>;
}

export const SocialMediaSection = ({ form }: SocialMediaSectionProps) => {
  const watchTitle = form.watch("title");
  const watchExcerpt = form.watch("excerpt");
  
  const generateInstagramCaption = () => {
    const title = watchTitle || "";
    const excerpt = watchExcerpt || "";
    const caption = `${title}\n\n${excerpt}\n\n#UrbanVision #AfricanCities #UrbanDevelopment`;
    form.setValue("instagram_caption", caption);
  };

  const generateTwitterCaption = () => {
    const title = watchTitle || "";
    const excerpt = watchExcerpt ? watchExcerpt.substring(0, 150) + "..." : "";
    const caption = `${title}\n\n${excerpt}\n\n#UrbanVision #AfricanCities`;
    form.setValue("twitter_caption", caption);
  };

  const generateInstagramImageText = () => {
    const title = watchTitle || "";
    // Create a shorter, punchier version for image overlay
    const imageText = title.length > 50 ? title.substring(0, 47) + "..." : title;
    form.setValue("instagram_image_text", imageText);
  };

  return (
    <div className="space-y-6 p-6 border rounded-lg">
      <div className="flex items-center gap-2">
        <Hash className="w-5 h-5" />
        <h3 className="text-lg font-medium">Social Media Publishing</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Instagram Section */}
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
              {/* Image Text Overlay */}
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

        {/* Twitter Section */}
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
            </div>
          )}
        </div>
      </div>

      {/* Common Hashtags */}
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
    </div>
  );
};
