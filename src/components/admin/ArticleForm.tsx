
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
import type { Article, Author, Category } from "@/types/database";

interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
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

  const form = useForm<ArticleFormData>({
    defaultValues: {
      title: article?.title || "",
      slug: article?.slug || "",
      excerpt: article?.excerpt || "",
      content: article?.content || "",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Article title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Brief description of the article" />
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
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Article content"
                  className="min-h-[200px]"
                />
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
  );
};
