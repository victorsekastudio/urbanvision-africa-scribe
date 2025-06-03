import { useState } from "react";
import { useArticles, useCategories, useAuthors } from "@/hooks/useArticles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, Calendar, User, Tag, Trash2, LogOut, Settings } from "lucide-react";
import { ArticleDialog } from "@/components/admin/ArticleDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import type { Article } from "@/types/database";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'categories' | 'authors'>('articles');
  const [articleDialogOpen, setArticleDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | undefined>();
  
  const { data: articles, isLoading: articlesLoading, refetch: refetchArticles } = useArticles();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: authors, isLoading: authorsLoading } = useAuthors();
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const isLoading = articlesLoading || categoriesLoading || authorsLoading;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const publishedCount = articles?.filter(a => a.published).length || 0;
  const draftCount = articles?.filter(a => !a.published).length || 0;

  const handleCreateArticle = () => {
    setEditingArticle(undefined);
    setArticleDialogOpen(true);
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setArticleDialogOpen(true);
  };

  const handleDeleteArticle = async (articleId: string) => {
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
  };

  const handleTogglePublished = async (article: Article) => {
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
  };

  const handleToggleFeatured = async (article: Article) => {
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
  };

  const handleArticleSave = () => {
    refetchArticles();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">Content Management</h1>
            <p className="text-gray-600">Manage your articles, categories, and authors</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>Welcome, {user?.email}</span>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Account
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articles?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{publishedCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{draftCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'articles', label: 'Articles', count: articles?.length },
              { key: 'categories', label: 'Categories', count: categories?.length },
              { key: 'authors', label: 'Authors', count: authors?.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count || 0})
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'articles' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Articles</h2>
                <Button onClick={handleCreateArticle}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Article
                </Button>
              </div>
              
              <div className="space-y-4">
                {articles?.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{article.title}</h3>
                        <Badge 
                          variant={article.published ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => handleTogglePublished(article)}
                        >
                          {article.published ? "Published" : "Draft"}
                        </Badge>
                        <Badge 
                          variant={article.featured ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleToggleFeatured(article)}
                        >
                          {article.featured ? "Featured" : "Not Featured"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {article.author?.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {article.category?.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditArticle(article)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Categories</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Category
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories?.map((category) => (
                  <Card key={category.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {articles?.filter(a => a.category_id === category.id).length || 0} articles
                        </span>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'authors' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Authors</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Author
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {authors?.map((author) => (
                  <Card key={author.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {author.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{author.name}</CardTitle>
                          <CardDescription>{author.email}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{author.bio}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {articles?.filter(a => a.author_id === author.id).length || 0} articles
                        </span>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ArticleDialog
        open={articleDialogOpen}
        onOpenChange={setArticleDialogOpen}
        article={editingArticle}
        onSave={handleArticleSave}
      />
    </div>
  );
};

export default Admin;
