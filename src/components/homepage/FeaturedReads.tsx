
import { useArticles } from "@/hooks/useArticles";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { Loader2 } from "lucide-react";

export const FeaturedReads = () => {
  const { data: articles, isLoading } = useArticles(true, true); // Only published and featured articles

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Featured Reads
          </h2>
        </div>
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        </div>
      </section>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Featured Reads
          </h2>
          <p className="text-gray-600">No featured articles available yet.</p>
        </div>
      </section>
    );
  }

  const displayArticles = articles.slice(0, 3); // Show up to 3 featured articles

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
          Featured Reads
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover our most impactful insights on African urban development
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
