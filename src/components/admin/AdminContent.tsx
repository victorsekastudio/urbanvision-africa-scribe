
import { useState } from "react";
import { useArticles, useCategories, useAuthors } from "@/hooks/useArticles";
import { useEvents } from "@/hooks/useEvents";
import { useNewsletterSubscribers } from "@/hooks/useNewsletterSubscribers";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminHandlers } from "@/hooks/useAdminHandlers";
import { useAdminDialogs } from "@/hooks/useAdminDialogs";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsDashboard } from "@/components/admin/StatsDashboard";
import { AdminTabContent } from "@/components/admin/AdminTabContent";
import { AdminDialogs } from "@/components/admin/AdminDialogs";

export const AdminContent = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'categories' | 'authors' | 'events' | 'newsletter'>('articles');
  
  // Data fetching
  const { data: articles, isLoading: articlesLoading, refetch: refetchArticles } = useArticles(undefined, undefined, true);
  const { data: categories, isLoading: categoriesLoading, refetch: refetchCategories } = useCategories();
  const { data: authors, isLoading: authorsLoading, refetch: refetchAuthors } = useAuthors();
  const { data: events, isLoading: eventsLoading, refetch: refetchEvents } = useEvents();
  const { data: subscribers, isLoading: subscribersLoading } = useNewsletterSubscribers();
  
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  
  // Custom hooks
  const adminHandlers = useAdminHandlers(refetchArticles, refetchEvents);
  const dialogs = useAdminDialogs();

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

  const handleArticleSave = async () => {
    console.log('💾 DEBUG: Admin handleArticleSave called');
    dialogs.setArticleDialogOpen(false);
    
    try {
      console.log('🔄 DEBUG: Refetching articles...');
      const result = await refetchArticles();
      console.log('✅ DEBUG: Articles refreshed successfully');
    } catch (error) {
      console.error('❌ DEBUG: Error refreshing articles:', error);
      toast({
        title: "Warning",
        description: "Article saved but list might not be updated. Please refresh the page.",
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

  return (
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
        <AdminTabContent
          activeTab={activeTab}
          articles={articles}
          events={events}
          categories={categories}
          authors={authors}
          subscribers={subscribers}
          handlers={adminHandlers}
          dialogs={dialogs}
          refetchCategories={refetchCategories}
          refetchAuthors={refetchAuthors}
          refetchEvents={refetchEvents}
        />
      </div>

      <AdminDialogs
        dialogs={dialogs}
        onArticleSave={handleArticleSave}
        onEventSave={refetchEvents}
        onCategorySave={refetchCategories}
        onAuthorSave={refetchAuthors}
      />
    </div>
  );
};
