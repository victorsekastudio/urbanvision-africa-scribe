
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateAuthor, useUpdateAuthor } from "@/hooks/useAuthorMutations";
import { useToast } from "@/hooks/use-toast";
import type { Author } from "@/types/database";

interface AuthorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  author?: Author;
  onSave?: () => void;
}

export const AuthorDialog = ({ open, onOpenChange, author, onSave }: AuthorDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    bio_fr: "",
    avatar_url: "",
  });

  const createAuthor = useCreateAuthor();
  const updateAuthor = useUpdateAuthor();
  const { toast } = useToast();

  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name,
        email: author.email || "",
        bio: author.bio || "",
        bio_fr: author.bio_fr || "",
        avatar_url: author.avatar_url || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        bio: "",
        bio_fr: "",
        avatar_url: "",
      });
    }
  }, [author, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Author name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const authorData = {
        name: formData.name.trim(),
        email: formData.email.trim() || undefined,
        bio: formData.bio.trim() || undefined,
        bio_fr: formData.bio_fr.trim() || undefined,
        avatar_url: formData.avatar_url.trim() || undefined,
      };

      if (author) {
        await updateAuthor.mutateAsync({ id: author.id, ...authorData });
        toast({
          title: "Success",
          description: "Author updated successfully",
        });
      } else {
        await createAuthor.mutateAsync(authorData);
        toast({
          title: "Success",
          description: "Author created successfully",
        });
      }
      
      onOpenChange(false);
      onSave?.();
    } catch (error) {
      console.error("Error saving author:", error);
      toast({
        title: "Error",
        description: "Failed to save author",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{author ? "Edit Author" : "Create New Author"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar_url">Avatar URL</Label>
            <Input
              id="avatar_url"
              value={formData.avatar_url}
              onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio (English)</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Author biography in English"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio_fr">Bio (French)</Label>
              <Textarea
                id="bio_fr"
                value={formData.bio_fr}
                onChange={(e) => setFormData({ ...formData, bio_fr: e.target.value })}
                placeholder="Biographie de l'auteur en français"
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={createAuthor.isPending || updateAuthor.isPending}>
              {author ? "Update Author" : "Create Author"}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
