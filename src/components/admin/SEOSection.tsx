
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Search, Globe, Image, Link } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface SEOSectionProps {
  form: UseFormReturn<any>;
  currentLanguage: 'EN' | 'FR';
}

export const SEOSection = ({ form, currentLanguage }: SEOSectionProps) => {
  return (
    <div className="space-y-6">
      <Separator />
      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium">SEO Optimization</h3>
      </div>

      {currentLanguage === 'EN' ? (
        <>
          <FormField
            control={form.control}
            name="meta_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Meta Title (English)</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="SEO title for search engines (50-60 characters)"
                    maxLength={60}
                  />
                </FormControl>
                <div className="text-xs text-gray-500">
                  {field.value?.length || 0}/60 characters
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description (English)</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Brief description for search engines (150-160 characters)"
                    maxLength={160}
                    rows={3}
                  />
                </FormControl>
                <div className="text-xs text-gray-500">
                  {field.value?.length || 0}/160 characters
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keywords (English)</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </FormControl>
                <div className="text-xs text-gray-500">
                  Separate keywords with commas
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      ) : (
        <>
          <FormField
            control={form.control}
            name="meta_title_fr"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Meta Title (French)</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Titre SEO pour les moteurs de recherche (50-60 caractères)"
                    maxLength={60}
                  />
                </FormControl>
                <div className="text-xs text-gray-500">
                  {field.value?.length || 0}/60 caractères
                </div>
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
                  <Textarea 
                    {...field} 
                    placeholder="Description brève pour les moteurs de recherche (150-160 caractères)"
                    maxLength={160}
                    rows={3}
                  />
                </FormControl>
                <div className="text-xs text-gray-500">
                  {field.value?.length || 0}/160 caractères
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_keywords_fr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mots-clés (French)</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="mot-clé1, mot-clé2, mot-clé3"
                  />
                </FormControl>
                <div className="text-xs text-gray-500">
                  Séparez les mots-clés par des virgules
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="og_image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center space-x-2">
                <Image className="w-4 h-4" />
                <span>Open Graph Image URL</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="https://example.com/og-image.jpg (1200x630px recommended)"
                />
              </FormControl>
              <div className="text-xs text-gray-500">
                Used for social media sharing previews
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="canonical_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center space-x-2">
                <Link className="w-4 h-4" />
                <span>Canonical URL</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="https://yourdomain.com/article/slug"
                />
              </FormControl>
              <div className="text-xs text-gray-500">
                Canonical URL to avoid duplicate content issues
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
