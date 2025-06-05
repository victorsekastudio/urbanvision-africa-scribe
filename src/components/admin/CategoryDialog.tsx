
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateCategory, useUpdateCategory } from "@/hooks/useCategoryMutations";
import { useToast } from "@/hooks/use-toast";
import type { Category } from "@/types/database";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category;
  onSave?: () => void;
}

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const CategoryDialog = ({ open, onOpenChange, category, onSave }: CategoryDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    name_fr: "",
    slug: "",
    description: "",
    description_fr: "",
  });

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const { toast } = useToast();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        name_fr: category.name_fr || "",
        slug: category.slug,
        description: category.description || "",
        description_fr: category.description_fr || "",
      });
    } else {
      setFormData({
        name: "",
        name_fr: "",
        slug: "",
        description: "",
        description_fr: "",
      });
    }
  }, [category, open]);

  const handleNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      name: value,
      slug: generateSlug(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const categoryData = {
        name: formData.name.trim(),
        name_fr: formData.name_fr.trim() || undefined,
        slug: formData.slug,
        description: formData.description.trim() || undefined,
        description_fr: formData.description_fr.trim() || undefined,
      };

      if (category) {
        await updateCategory.mutateAsync({ id: category.id, ...categoryData });
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      } else {
        await createCategory.mutateAsync(categoryData);
        toast({
          title: "Success",
          description: "Category created successfully",
        });
      }
      
      onOpenChange(false);
      onSave?.();
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Create New Category"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name (English) *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Technology"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name_fr">Name (French)</Label>
              <Input
                id="name_fr"
                value={formData.name_fr}
                onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })}
                placeholder="Technologie"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="technology"
              required
            />
            <p className="text-xs text-gray-500">
              Auto-generated from the English name, but you can customize it
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description (English)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Articles about technology and innovation"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_fr">Description (French)</Label>
              <Textarea
                id="description_fr"
                value={formData.description_fr}
                onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                placeholder="Articles sur la technologie et l'innovation"
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={createCategory.isPending || updateCategory.isPending}>
              {category ? "Update Category" : "Create Category"}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
