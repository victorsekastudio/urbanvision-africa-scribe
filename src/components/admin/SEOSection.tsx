
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ImageUpload } from "./form/ImageUpload";

interface SEOSectionProps {
  form: UseFormReturn<any>;
}

export const SEOSection = ({ form }: SEOSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Meta Title Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="meta_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title (English)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="SEO title for search engines" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_title_fr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title (French)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="SEO title for search engines in French" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Meta Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description (English)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Brief description for search engines" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_description_fr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description (French)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Brief description for search engines in French" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Meta Keywords Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="meta_keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Keywords (English)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="keyword1, keyword2, keyword3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_keywords_fr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Keywords (French)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="mot-clé1, mot-clé2, mot-clé3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Canonical URL Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="canonical_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canonical URL (English)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://example.com/canonical-url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="canonical_url_fr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canonical URL (French)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://example.com/canonical-url-fr" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Open Graph Image */}
        <FormField
          control={form.control}
          name="og_image_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  label="Open Graph Image"
                  placeholder="https://example.com/og-image.jpg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
