
import { useArticles } from "@/hooks/useArticles";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";
import { Skeleton } from "@/components/ui/skeleton";

export const FeaturedReads = () => {
  const { data: articles, isLoading } = useArticles(true, true); // Only published and featured articles
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900 mb-4">
            {t.featuredReads}
          </h2>
          <p className="text-lg text-gray-600 font-light tracking-wide max-w-3xl mx-auto">
            {t.featuredReadsSubtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="w-full h-48 rounded-lg" />
              <div className="space-y-3">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900 mb-4">
            {t.featuredReads}
          </h2>
          <p className="text-gray-600 font-light tracking-wide">{t.noFeaturedArticles}</p>
        </div>
      </section>
    );
  }

  const displayArticles = articles.slice(0, 3); // Show up to 3 featured articles

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900 mb-4">
          {t.featuredReads}
        </h2>
        <p className="text-lg text-gray-600 font-light tracking-wide max-w-3xl mx-auto">
          {t.featuredReadsSubtitle}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};
