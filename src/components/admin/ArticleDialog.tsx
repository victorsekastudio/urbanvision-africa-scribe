
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
  console.log('🎭 DEBUG: ArticleDialog rendered');
  console.log('👁️ DEBUG: Dialog open state:', open);
  console.log('📝 DEBUG: Article for editing:', article?.id || 'NEW ARTICLE');
  console.log('📞 DEBUG: onSave callback exists:', !!onSave);

  const handleSave = () => {
    console.log('💾 DEBUG: ArticleDialog handleSave called');
    console.log('🔄 DEBUG: Calling parent onSave callback');
    
    onSave();
    
    console.log('🚪 DEBUG: Closing dialog');
    onOpenChange(false);
    
    console.log('✅ DEBUG: ArticleDialog handleSave completed');
  };

  const handleCancel = () => {
    console.log('❌ DEBUG: ArticleDialog handleCancel called');
    console.log('🚪 DEBUG: Closing dialog without saving');
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
