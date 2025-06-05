
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { ArticleCardSkeleton } from "@/components/shared/ArticleCardSkeleton";
import type { Article } from "@/types/database";

interface MoreLikeThisProps {
  currentArticleId: string;
  categoryId?: string;
  keywords?: string;
  limit?: number;
}

export const MoreLikeThis = ({
  currentArticleId,
  categoryId,
  keywords,
  limit = 4
}: MoreLikeThisProps) => {
  const { data: similarArticles, isLoading } = useQuery({
    queryKey: ['more-like-this', currentArticleId, categoryId, keywords],
    queryFn: async () => {
      // Start with articles from the same category
      let articles: Article[] = [];

      if (categoryId) {
        const { data: categoryArticles, error } = await supabase
          .from('articles')
          .select(`
            *,
            author:authors(*),
            category:categories(*)
          `)
          .eq('published', true)
          .eq('category_id', categoryId)
          .neq('id', currentArticleId)
          .limit(limit)
          .order('created_at', { ascending: false });

        if (!error && categoryArticles) {
          articles = categoryArticles as Article[];
        }
      }

      // If we need more articles, get them from other categories
      if (articles.length < limit) {
        const { data: additionalArticles, error } = await supabase
          .from('articles')
          .select(`
            *,
            author:authors(*),
            category:categories(*)
          `)
          .eq('published', true)
          .neq('id', currentArticleId)
          .limit(limit - articles.length)
          .order('created_at', { ascending: false });

        if (!error && additionalArticles) {
          articles = [...articles, ...additionalArticles as Article[]];
        }
      }

      return articles.slice(0, limit);
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-light text-gray-900">More Like This</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(limit)].map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!similarArticles || similarArticles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-light text-gray-900">More Like This</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {similarArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};
