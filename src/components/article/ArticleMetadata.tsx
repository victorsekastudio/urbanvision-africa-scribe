
import { Link } from "react-router-dom";
import { Calendar, User, Tag, Clock } from "lucide-react";
import { ShareButtons } from "@/components/shared/ShareButtons";
import type { Article } from "@/types/database";
import { formatReadingTime } from "@/utils/readingTime";

interface ArticleMetadataProps {
  article: Article;
  categoryName?: string;
  authorName: string;
  readingTime: number;
  title: string;
  excerpt?: string;
  currentLanguage: 'EN' | 'FR';
}

export const ArticleMetadata = ({
  article,
  categoryName,
  authorName,
  readingTime,
  title,
  excerpt,
  currentLanguage
}: ArticleMetadataProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        {article.category && (
          <Link 
            to={`/category/${article.category.slug}`}
            className="inline-flex items-center hover:text-gray-700 transition-colors"
          >
            <Tag className="w-4 h-4 mr-1" />
            {categoryName}
          </Link>
        )}
        {article.published_at && (
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(article.published_at).toLocaleDateString(currentLanguage === 'FR' ? 'fr-FR' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        )}
        <span className="flex items-center">
          <User className="w-4 h-4 mr-1" />
          {authorName}
        </span>
        <span className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {formatReadingTime(readingTime)}
        </span>
      </div>
      <ShareButtons 
        url={`/article/${article.slug}`}
        title={title}
        excerpt={excerpt}
      />
    </div>
  );
};
