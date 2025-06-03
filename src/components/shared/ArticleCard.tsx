
import { ArrowRight } from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  slug: string;
}

interface ArticleCardProps {
  article: Article;
  size?: 'default' | 'large';
}

export const ArticleCard = ({ article, size = 'default' }: ArticleCardProps) => {
  const imageHeight = size === 'large' ? 'h-64' : 'h-48';
  const titleSize = size === 'large' ? 'text-xl' : 'text-lg';
  
  return (
    <article className="group cursor-pointer">
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-lg">
          <img 
            src={article.image}
            alt={article.title}
            className={`w-full ${imageHeight} object-cover group-hover:scale-105 transition-transform duration-300`}
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
              {article.category}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className={`${titleSize} font-medium text-gray-900 leading-tight group-hover:text-gray-700 transition-colors`}>
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed font-serif">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              <span>{article.author}</span>
              <span className="mx-1">•</span>
              <span>{article.date}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </article>
  );
};
