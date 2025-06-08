
import { ArticlesTab } from "@/components/admin/ArticlesTab";
import { EventsTab } from "@/components/admin/EventsTab";
import { CategoriesTab } from "@/components/admin/CategoriesTab";
import { AuthorsTab } from "@/components/admin/AuthorsTab";
import { NewsletterTab } from "@/components/admin/NewsletterTab";
import type { Article, Event, Category, Author } from "@/types/database";

interface AdminTabContentProps {
  activeTab: 'articles' | 'categories' | 'authors' | 'events' | 'newsletter';
  articles: Article[] | undefined;
  events: Event[] | undefined;
  categories: Category[] | undefined;
  authors: Author[] | undefined;
  subscribers: any[] | undefined;
  handlers: {
    handleDeleteArticle: (articleId: string) => Promise<void>;
    handleTogglePublished: (articleId: string, published: boolean) => Promise<void>;
    handleToggleFeatured: (articleId: string, featured: boolean) => Promise<void>;
    handleDeleteEvent: (eventId: string) => Promise<void>;
  };
  dialogs: {
    openArticleDialog: (article?: Article) => void;
    openEventDialog: (event?: Event) => void;
    openCategoryDialog: (category?: Category) => void;
    openAuthorDialog: (author?: Author) => void;
  };
  refetchCategories: () => void;
  refetchAuthors: () => void;
  refetchEvents: () => void;
}

export const AdminTabContent = ({
  activeTab,
  articles,
  events,
  categories,
  authors,
  subscribers,
  handlers,
  dialogs,
}: AdminTabContentProps) => {
  // Adapter functions to match ArticlesTab expected signatures
  const handleTogglePublished = (article: Article) => {
    handlers.handleTogglePublished(article.id, !article.published);
  };

  const handleToggleFeatured = (article: Article) => {
    handlers.handleToggleFeatured(article.id, !article.featured);
  };

  switch (activeTab) {
    case 'articles':
      return (
        <ArticlesTab
          articles={articles}
          onCreateArticle={() => dialogs.openArticleDialog()}
          onEditArticle={dialogs.openArticleDialog}
          onDeleteArticle={handlers.handleDeleteArticle}
          onTogglePublished={handleTogglePublished}
          onToggleFeatured={handleToggleFeatured}
        />
      );
    case 'events':
      return (
        <EventsTab
          events={events}
          onCreateEvent={() => dialogs.openEventDialog()}
          onEditEvent={dialogs.openEventDialog}
          onDeleteEvent={handlers.handleDeleteEvent}
        />
      );
    case 'categories':
      return (
        <CategoriesTab 
          categories={categories} 
          articles={articles}
          onCreateCategory={() => dialogs.openCategoryDialog()}
          onEditCategory={dialogs.openCategoryDialog}
        />
      );
    case 'authors':
      return (
        <AuthorsTab 
          authors={authors} 
          articles={articles}
          onCreateAuthor={() => dialogs.openAuthorDialog()}
          onEditAuthor={dialogs.openAuthorDialog}
        />
      );
    case 'newsletter':
      return <NewsletterTab subscribers={subscribers} />;
    default:
      return null;
  }
};
