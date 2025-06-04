
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/types/database";

export const createArticleHandlers = (toast: any, refetchArticles: () => void) => ({
  handleDeleteArticle: async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Article deleted successfully",
      });

      refetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      });
    }
  },

  handleTogglePublished: async (article: Article) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ 
          published: !article.published,
          published_at: !article.published ? new Date().toISOString() : null
        })
        .eq('id', article.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Article ${!article.published ? 'published' : 'unpublished'} successfully`,
      });

      refetchArticles();
    } catch (error) {
      console.error('Error updating article:', error);
      toast({
        title: "Error",
        description: "Failed to update article",
        variant: "destructive",
      });
    }
  },

  handleToggleFeatured: async (article: Article) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ featured: !article.featured })
        .eq('id', article.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Article ${!article.featured ? 'featured' : 'unfeatured'} successfully`,
      });

      refetchArticles();
    } catch (error) {
      console.error('Error updating article:', error);
      toast({
        title: "Error",
        description: "Failed to update article",
        variant: "destructive",
      });
    }
  },
});
