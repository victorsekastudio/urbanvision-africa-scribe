
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { Article } from "@/types/database";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";
import { calculateReadingTime, formatReadingTime } from "@/utils/readingTime";

interface ArticleCardProps {
  article: Article;
  size?: 'default' | 'large';
}

export const ArticleCard = ({ article, size = 'default' }: ArticleCardProps) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const imageHeight = size === 'large' ? 'h-64' : 'h-48';
  const titleSize = size === 'large' ? 'text-xl' : 'text-lg';
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLanguage === 'FR' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const title = currentLanguage === 'FR' && article.title_fr 
    ? article.title_fr 
    : article.title;
    
  const excerpt = currentLanguage === 'FR' && article.excerpt_fr 
    ? article.excerpt_fr 
    : article.excerpt;

  const content = currentLanguage === 'FR' && article.content_fr 
    ? article.content_fr 
    : article.content;

  const categoryName = currentLanguage === 'FR' && article.category?.name_fr 
    ? article.category.name_fr 
    : article.category?.name;

  // Use "UrbanVision Editorial Team" as default author name
  const authorName = article.author?.name || "UrbanVision Editorial Team";

  // Calculate reading time
  const readingTime = content ? calculateReadingTime(content) : 5;

  console.log('ArticleCard: Rendering article', article.slug, 'with title:', title, 'for language:', currentLanguage);
  
  return (
    <Link to={`/article/${article.slug}`}>
      <article className="group cursor-pointer">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={article.featured_image_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"}
              alt={title}
              className={`w-full ${imageHeight} object-cover group-hover:scale-105 transition-transform duration-300`}
            />
            {article.category && (
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full tracking-wide">
                  {categoryName}
                </span>
              </div>
            )}
            <div className="absolute top-3 right-3">
              <span className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full tracking-wide flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatReadingTime(readingTime)}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className={`${titleSize} font-light tracking-wide text-gray-900 leading-tight group-hover:text-gray-700 transition-colors`}>
              {title}
            </h3>
            <p className="text-gray-600 text-sm font-light tracking-wide leading-relaxed font-serif">
              {excerpt || "Read more about this article..."}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 font-light tracking-wide">
                <span>{authorName}</span>
                <span className="mx-1">•</span>
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
