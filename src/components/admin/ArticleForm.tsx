
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import type { Article, Author, Category } from "@/types/database";

interface ArticleFormData {
  title: string;
  title_fr: string;
  slug: string;
  excerpt: string;
  excerpt_fr: string;
  content: string;
  content_fr: string;
  author_id: string;
  category_id: string;
  published: boolean;
  featured: boolean;
  featured_image_url: string;
}

interface ArticleFormProps {
  article?: Article;
  onSave: () => void;
  onCancel: () => void;
}

export const ArticleForm = ({ article, onSave, onCancel }: ArticleFormProps) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { currentLanguage, setLanguage } = useLanguage();

  const form = useForm<ArticleFormData>({
    defaultValues: {
      title: article?.title || "",
      title_fr: article?.title_fr || "",
      slug: article?.slug || "",
      excerpt: article?.excerpt || "",
      excerpt_fr: article?.excerpt_fr || "",
      content: article?.content || "",
      content_fr: article?.content_fr || "",
      author_id: article?.author_id || "",
      category_id: article?.category_id || "",
      published: article?.published || false,
      featured: article?.featured || false,
      featured_image_url: article?.featured_image_url || "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const [authorsResponse, categoriesResponse] = await Promise.all([
        supabase.from('authors').select('*').order('name'),
        supabase.from('categories').select('*').order('name')
      ]);

      if (authorsResponse.data) setAuthors(authorsResponse.data);
      if (categoriesResponse.data) setCategories(categoriesResponse.data);
    };

    fetchData();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const onSubmit = async (data: ArticleFormData) => {
    setIsLoading(true);

    try {
      const articleData = {
        ...data,
        slug: data.slug || generateSlug(data.title),
        published_at: data.published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      };

      let result;
      if (article) {
        result = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', article.id);
      } else {
        result = await supabase
          .from('articles')
          .insert([articleData]);
      }

      if (result.error) {
        throw result.error;
      }

      toast({
        title: "Success",
        description: `Article ${article ? 'updated' : 'created'} successfully`,
      });

      onSave();
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Error",
        description: `Failed to ${article ? 'update' : 'create'} article`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (title: string) => {
    form.setValue('title', title);
    if (!article) {
      form.setValue('slug', generateSlug(title));
    }
  };

  return (
    <div className="space-y-6">
      {/* Language Toggle */}
      <div className="flex items-center space-x-4 pb-4 border-b">
        <Label className="text-sm font-medium">Editing Language:</Label>
        <div className="flex space-x-2">
          <Button
            type="button"
            variant={currentLanguage === 'EN' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('EN')}
          >
            English
          </Button>
          <Button
            type="button"
            variant={currentLanguage === 'FR' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('FR')}
          >
            Français
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {currentLanguage === 'EN' ? (
            <>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (English)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Article title in English"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt (English)</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Brief description in English" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content (English)</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Article content in English"
                        className="min-h-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="title_fr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (French)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Article title in French"
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
                      <Textarea {...field} placeholder="Brief description in French" />
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
                        placeholder="Article content in French"
                        className="min-h-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="article-slug" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featured_image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Featured Image URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://example.com/image.jpg" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="author_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an author" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Make this article visible to readers
                    </div>
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

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Feature this article on the homepage
                    </div>
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
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (article ? 'Update' : 'Create')} Article
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
