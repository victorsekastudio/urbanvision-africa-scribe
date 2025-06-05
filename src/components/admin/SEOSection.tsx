
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ImageUpload } from "./form/ImageUpload";

interface SEOSectionProps {
  form: UseFormReturn<any>;
  currentLanguage: 'EN' | 'FR';
}

export const SEOSection = ({ form, currentLanguage }: SEOSectionProps) => {
  if (currentLanguage === 'EN') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings (English)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="meta_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="SEO title for search engines" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Brief description for search engines" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Keywords</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="keyword1, keyword2, keyword3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="canonical_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canonical URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://example.com/canonical-url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings (French)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <FormField
          control={form.control}
          name="canonical_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Canonical URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://example.com/canonical-url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
