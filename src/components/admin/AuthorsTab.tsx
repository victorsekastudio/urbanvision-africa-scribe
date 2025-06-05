
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useDeleteAuthor } from "@/hooks/useAuthorMutations";
import { useToast } from "@/hooks/use-toast";
import type { Author } from "@/types/database";

interface AuthorsTabProps {
  authors: Author[] | undefined;
  articles: any[] | undefined;
  onCreateAuthor: () => void;
  onEditAuthor: (author: Author) => void;
}

export const AuthorsTab = ({ authors, articles, onCreateAuthor, onEditAuthor }: AuthorsTabProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState<Author | null>(null);
  const deleteAuthor = useDeleteAuthor();
  const { toast } = useToast();

  const getArticleCount = (authorId: string) => {
    return articles?.filter(article => article.author_id === authorId).length || 0;
  };

  const handleDeleteClick = (author: Author) => {
    setAuthorToDelete(author);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!authorToDelete) return;

    const articleCount = getArticleCount(authorToDelete.id);
    
    if (articleCount > 0) {
      toast({
        title: "Cannot delete author",
        description: `This author has ${articleCount} article(s). Please reassign or delete the articles first.`,
        variant: "destructive",
      });
      setDeleteDialogOpen(false);
      setAuthorToDelete(null);
      return;
    }

    try {
      await deleteAuthor.mutateAsync(authorToDelete.id);
      toast({
        title: "Success",
        description: "Author deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting author:', error);
      toast({
        title: "Error",
        description: "Failed to delete author",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setAuthorToDelete(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Authors</h2>
        <Button onClick={onCreateAuthor}>
          <Plus className="w-4 h-4 mr-2" />
          New Author
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors?.map((author) => {
          const articleCount = getArticleCount(author.id);
          return (
            <Card key={author.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={author.avatar_url} alt={author.name} />
                    <AvatarFallback>
                      {author.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{author.name}</CardTitle>
                    {author.email && (
                      <CardDescription>{author.email}</CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {author.bio && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{author.bio}</p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {articleCount} article{articleCount !== 1 ? 's' : ''}
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEditAuthor(author)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteClick(author)}
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
            <AlertDialogTitle>Delete Author</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{authorToDelete?.name}"? This action cannot be undone.
              {authorToDelete && getArticleCount(authorToDelete.id) > 0 && (
                <span className="block mt-2 text-red-600 font-medium">
                  Warning: This author has {getArticleCount(authorToDelete.id)} article(s). 
                  You cannot delete them until all articles are reassigned or deleted.
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
