
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Article } from "@/types/database";

interface ArticleCardProps {
  article: Article;
  size?: 'default' | 'large';
}

export const ArticleCard = ({ article, size = 'default' }: ArticleCardProps) => {
  const imageHeight = size === 'large' ? 'h-64' : 'h-48';
  const titleSize = size === 'large' ? 'text-xl' : 'text-lg';
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <Link to={`/article/${article.slug}`}>
      <article className="group cursor-pointer">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={article.featured_image_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"}
              alt={article.title}
              className={`w-full ${imageHeight} object-cover group-hover:scale-105 transition-transform duration-300`}
            />
            {article.category && (
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                  {article.category.name}
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <h3 className={`${titleSize} font-medium text-gray-900 leading-tight group-hover:text-gray-700 transition-colors`}>
              {article.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed font-serif">
              {article.excerpt || "Read more about this article..."}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                {article.author && (
                  <>
                    <span>{article.author.name}</span>
                    <span className="mx-1">•</span>
                  </>
                )}
                <span>{formatDate(article.created_at)}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
