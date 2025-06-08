
import { ArticleDialog } from "@/components/admin/ArticleDialog";
import { EventDialog } from "@/components/admin/EventDialog";
import { CategoryDialog } from "@/components/admin/CategoryDialog";
import { AuthorDialog } from "@/components/admin/AuthorDialog";

interface AdminDialogsProps {
  dialogs: {
    articleDialogOpen: boolean;
    eventDialogOpen: boolean;
    categoryDialogOpen: boolean;
    authorDialogOpen: boolean;
    editingArticle: any;
    editingEvent: any;
    editingCategory: any;
    editingAuthor: any;
    setArticleDialogOpen: (open: boolean) => void;
    setEventDialogOpen: (open: boolean) => void;
    setCategoryDialogOpen: (open: boolean) => void;
    setAuthorDialogOpen: (open: boolean) => void;
  };
  onArticleSave: () => void;
  onEventSave: () => void;
  onCategorySave: () => void;
  onAuthorSave: () => void;
}

export const AdminDialogs = ({
  dialogs,
  onArticleSave,
  onEventSave,
  onCategorySave,
  onAuthorSave,
}: AdminDialogsProps) => {
  return (
    <>
      {/* Article Dialog */}
      <ArticleDialog
        open={dialogs.articleDialogOpen}
        onOpenChange={dialogs.setArticleDialogOpen}
        article={dialogs.editingArticle}
        onSave={onArticleSave}
      />

      {/* Event Dialog */}
      <EventDialog
        open={dialogs.eventDialogOpen}
        onOpenChange={dialogs.setEventDialogOpen}
        event={dialogs.editingEvent}
        onSave={onEventSave}
      />

      {/* Category Dialog */}
      <CategoryDialog
        open={dialogs.categoryDialogOpen}
        onOpenChange={dialogs.setCategoryDialogOpen}
        category={dialogs.editingCategory}
        onSave={onCategorySave}
      />

      {/* Author Dialog */}
      <AuthorDialog
        open={dialogs.authorDialogOpen}
        onOpenChange={dialogs.setAuthorDialogOpen}
        author={dialogs.editingAuthor}
        onSave={onAuthorSave}
      />
    </>
  );
};
