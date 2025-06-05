import { useState } from "react";
import { useArticles, useCategories, useAuthors } from "@/hooks/useArticles";
import { useEvents, useDeleteEvent } from "@/hooks/useEvents";
import { useNewsletterSubscribers } from "@/hooks/useNewsletterSubscribers";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ArticleDialog } from "@/components/admin/ArticleDialog";
import { EventDialog } from "@/components/admin/EventDialog";
import { CategoryDialog } from "@/components/admin/CategoryDialog";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsDashboard } from "@/components/admin/StatsDashboard";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { ArticlesTab } from "@/components/admin/ArticlesTab";
import { EventsTab } from "@/components/admin/EventsTab";
import { CategoriesTab } from "@/components/admin/CategoriesTab";
import { AuthorsTab } from "@/components/admin/AuthorsTab";
import { NewsletterTab } from "@/components/admin/NewsletterTab";
import { createArticleHandlers } from "@/utils/adminHandlers";
import type { Article, Event, Category } from "@/types/database";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'categories' | 'authors' | 'events' | 'newsletter'>('articles');
  const [articleDialogOpen, setArticleDialogOpen] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | undefined>();
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  
  const { data: articles, isLoading: articlesLoading, refetch: refetchArticles } = useArticles();
  const { data: categories, isLoading: categoriesLoading, refetch: refetchCategories } = useCategories();
  const { data: authors, isLoading: authorsLoading } = useAuthors();
  const { data: events, isLoading: eventsLoading, refetch: refetchEvents } = useEvents();
  const { data: subscribers, isLoading: subscribersLoading } = useNewsletterSubscribers();
  const deleteEvent = useDeleteEvent();
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const isLoading = articlesLoading || categoriesLoading || authorsLoading || eventsLoading || subscribersLoading;

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

  const handleCreateArticle = () => {
    setEditingArticle(undefined);
    setArticleDialogOpen(true);
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setArticleDialogOpen(true);
  };

  const handleCreateEvent = () => {
    setEditingEvent(undefined);
    setEventDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setEventDialogOpen(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      await deleteEvent.mutateAsync(eventId);
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  const handleEventSave = () => {
    refetchEvents();
  };

  const handleArticleSave = () => {
    refetchArticles();
  };

  const handleCreateCategory = () => {
    setEditingCategory(undefined);
    setCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const handleCategorySave = () => {
    refetchCategories();
  };

  const articleHandlers = createArticleHandlers(toast, refetchArticles);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'articles':
        return (
          <ArticlesTab
            articles={articles}
            onCreateArticle={handleCreateArticle}
            onEditArticle={handleEditArticle}
            onDeleteArticle={articleHandlers.handleDeleteArticle}
            onTogglePublished={articleHandlers.handleTogglePublished}
            onToggleFeatured={articleHandlers.handleToggleFeatured}
          />
        );
      case 'events':
        return (
          <EventsTab
            events={events}
            onCreateEvent={handleCreateEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        );
      case 'categories':
        return (
          <CategoriesTab 
            categories={categories} 
            articles={articles}
            onCreateCategory={handleCreateCategory}
            onEditCategory={handleEditCategory}
          />
        );
      case 'authors':
        return <AuthorsTab authors={authors} articles={articles} />;
      case 'newsletter':
        return <NewsletterTab subscribers={subscribers} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminHeader userEmail={user?.email} onSignOut={handleSignOut} />
        
        <StatsDashboard articles={articles} events={events} categories={categories} />

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'articles', label: `Articles (${articles?.length || 0})` },
                { key: 'events', label: `Events (${events?.length || 0})` },
                { key: 'categories', label: `Categories (${categories?.length || 0})` },
                { key: 'authors', label: `Authors (${authors?.length || 0})` },
                { key: 'newsletter', label: `Newsletter (${subscribers?.length || 0})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          {renderTabContent()}
        </div>
      </div>

      <ArticleDialog
        open={articleDialogOpen}
        onOpenChange={setArticleDialogOpen}
        article={editingArticle}
        onSave={handleArticleSave}
      />

      <EventDialog
        open={eventDialogOpen}
        onOpenChange={setEventDialogOpen}
        event={editingEvent}
        onSave={handleEventSave}
      />

      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        category={editingCategory}
        onSave={handleCategorySave}
      />
    </div>
  );
};

export default Admin;
