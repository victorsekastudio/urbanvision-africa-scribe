
import { createArticleHandlers } from "./adminHandlers";
import { useDeleteArticle, useUpdateArticleStatus } from "@/hooks/useArticleMutations";

export const createArticleHandlers = (toast: any, refetchArticles: any) => {
  const deleteArticle = useDeleteArticle();
  const updateArticleStatus = useUpdateArticleStatus();

  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      await deleteArticle.mutateAsync(articleId);
      toast({
        title: "Success",
        description: "Article deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      });
    }
  };

  const handleTogglePublished = async (articleId: string, published: boolean) => {
    try {
      await updateArticleStatus.mutateAsync({
        id: articleId,
        field: 'published',
        value: published
      });
      toast({
        title: "Success",
        description: `Article ${published ? 'published' : 'unpublished'} successfully`,
      });
    } catch (error) {
      console.error('Error updating article status:', error);
      toast({
        title: "Error",
        description: "Failed to update article status",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (articleId: string, featured: boolean) => {
    try {
      await updateArticleStatus.mutateAsync({
        id: articleId,
        field: 'featured',
        value: featured
      });
      toast({
        title: "Success",
        description: `Article ${featured ? 'featured' : 'unfeatured'} successfully`,
      });
    } catch (error) {
      console.error('Error updating article status:', error);
      toast({
        title: "Error",
        description: "Failed to update article status",
        variant: "destructive",
      });
    }
  };

  return {
    handleDeleteArticle,
    handleTogglePublished,
    handleToggleFeatured
  };
};
