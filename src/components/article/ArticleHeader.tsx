
import type { Article } from "@/types/database";

interface ArticleHeaderProps {
  article: Article;
  title: string;
  excerpt?: string;
}

export const ArticleHeader = ({ article, title, excerpt }: ArticleHeaderProps) => {
  return (
    <header className="space-y-6">
      <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-900">
        {title}
      </h1>

      {excerpt && (
        <p className="text-xl text-gray-600 leading-relaxed font-serif">
          {excerpt}
        </p>
      )}

      {article.featured_image_url && (
        <div className="relative">
          <img 
            src={article.featured_image_url}
            alt={title}
            className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
          />
        </div>
      )}
    </header>
  );
};
