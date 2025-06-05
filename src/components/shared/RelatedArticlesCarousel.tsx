
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { ArticleCardSkeleton } from "@/components/shared/ArticleCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Article } from "@/types/database";

interface RelatedArticlesCarouselProps {
  currentArticleId: number;
  categoryId?: number;
  tags?: string;
  limit?: number;
}

export const RelatedArticlesCarousel = ({
  currentArticleId,
  categoryId,
  tags,
  limit = 6
}: RelatedArticlesCarouselProps) => {
  const { data: relatedArticles, isLoading } = useQuery({
    queryKey: ['related-articles', currentArticleId, categoryId, tags],
    queryFn: async () => {
      let query = supabase
        .from('articles')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .eq('published', true)
        .neq('id', currentArticleId)
        .limit(limit);

      // Prefer articles from the same category
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      // If we don't have enough articles from the same category, get more from other categories
      if (data.length < limit) {
        const { data: additionalArticles, error: additionalError } = await supabase
          .from('articles')
          .select(`
            *,
            author:authors(*),
            category:categories(*)
          `)
          .eq('published', true)
          .neq('id', currentArticleId)
          .limit(limit - data.length)
          .order('created_at', { ascending: false });

        if (additionalError) throw additionalError;
        return [...data, ...additionalArticles];
      }

      return data as Article[];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-light text-gray-900">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!relatedArticles || relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-light text-gray-900">Related Articles</h3>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {relatedArticles.map((article) => (
            <CarouselItem key={article.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <ArticleCard article={article} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-12" />
        <CarouselNext className="-right-12" />
      </Carousel>
    </div>
  );
};
