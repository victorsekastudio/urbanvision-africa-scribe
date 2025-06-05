
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useDeleteCategory } from "@/hooks/useCategoryMutations";
import { useToast } from "@/hooks/use-toast";
import type { Category } from "@/types/database";

interface CategoriesTabProps {
  categories: Category[] | undefined;
  articles: any[] | undefined;
  onCreateCategory: () => void;
  onEditCategory: (category: Category) => void;
}

export const CategoriesTab = ({ categories, articles, onCreateCategory, onEditCategory }: CategoriesTabProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const deleteCategory = useDeleteCategory();
  const { toast } = useToast();

  const getArticleCount = (categoryId: string) => {
    return articles?.filter(article => article.category_id === categoryId).length || 0;
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    const articleCount = getArticleCount(categoryToDelete.id);
    
    if (articleCount > 0) {
      toast({
        title: "Cannot delete category",
        description: `This category has ${articleCount} article(s). Please reassign or delete the articles first.`,
        variant: "destructive",
      });
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
      return;
    }

    try {
      await deleteCategory.mutateAsync(categoryToDelete.id);
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Button onClick={onCreateCategory}>
          <Plus className="w-4 h-4 mr-2" />
          New Category
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category) => {
          const articleCount = getArticleCount(category.id);
          return (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="text-lg">{category.name}</CardTitle>
                {category.name_fr && (
                  <CardDescription className="text-sm text-blue-600">
                    FR: {category.name_fr}
                  </CardDescription>
                )}
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {articleCount} article{articleCount !== 1 ? 's' : ''}
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEditCategory(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteClick(category)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{categoryToDelete?.name}"? This action cannot be undone.
              {categoryToDelete && getArticleCount(categoryToDelete.id) > 0 && (
                <span className="block mt-2 text-red-600 font-medium">
                  Warning: This category has {getArticleCount(categoryToDelete.id)} article(s). 
                  You cannot delete it until all articles are reassigned or deleted.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
