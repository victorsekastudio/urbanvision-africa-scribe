
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArticleForm } from "./ArticleForm";
import type { Article } from "@/types/database";

interface ArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article?: Article;
  onSave: () => void;
}

export const ArticleDialog = ({ open, onOpenChange, article, onSave }: ArticleDialogProps) => {
  const handleSave = async () => {
    console.log('ArticleDialog: handleSave called');
    // Wait for the parent to handle the save and refresh
    await onSave();
    console.log('ArticleDialog: onSave completed, closing dialog');
    onOpenChange(false);
  };

  const handleCancel = () => {
    console.log('ArticleDialog: handleCancel called');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {article ? 'Edit Article' : 'Create New Article'}
          </DialogTitle>
        </DialogHeader>
        <ArticleForm
          article={article}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};
