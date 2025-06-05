
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ImageUpload } from "./ImageUpload";
import type { Author, Category } from "@/types/database";

interface MetadataFieldsProps {
  form: UseFormReturn<any>;
  authors: Author[];
  categories: Category[];
  defaultAuthorId: string;
}

export const MetadataFields = ({ form, authors, categories, defaultAuthorId }: MetadataFieldsProps) => {
  return (
    <>
      {/* Slug Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug (English)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="article-slug" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug_fr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug (French)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="article-slug-fr" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="featured_image_url"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                label="Featured Image"
                placeholder="https://example.com/image.jpg"
              />
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
              <Select onValueChange={field.onChange} defaultValue={field.value || defaultAuthorId}>
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
    </>
  );
};
