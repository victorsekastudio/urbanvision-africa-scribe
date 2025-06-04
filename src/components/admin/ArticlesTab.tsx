
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, Calendar, User, Tag, Trash2 } from "lucide-react";
import type { Article } from "@/types/database";

interface ArticlesTabProps {
  articles: Article[] | undefined;
  onCreateArticle: () => void;
  onEditArticle: (article: Article) => void;
  onDeleteArticle: (articleId: string) => void;
  onTogglePublished: (article: Article) => void;
  onToggleFeatured: (article: Article) => void;
}

export const ArticlesTab = ({
  articles,
  onCreateArticle,
  onEditArticle,
  onDeleteArticle,
  onTogglePublished,
  onToggleFeatured,
}: ArticlesTabProps) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Articles</h2>
        <Button onClick={onCreateArticle}>
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
                  onClick={() => onTogglePublished(article)}
                >
                  {article.published ? "Published" : "Draft"}
                </Badge>
                <Badge 
                  variant={article.featured ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => onToggleFeatured(article)}
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
                onClick={() => onEditArticle(article)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDeleteArticle(article.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
