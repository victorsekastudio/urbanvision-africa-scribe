
import { ArticleCard } from "@/components/shared/ArticleCard";
import { useArticles } from "@/hooks/useArticles";

export const FeaturedReads = () => {
  const { data: articles, isLoading } = useArticles(true);
  
  // Get non-featured published articles for this section
  const featuredReads = articles?.filter(article => !article.featured).slice(0, 4);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Featured Reads
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Curated insights from across the continent exploring the future of African cities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
          Featured Reads
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Curated insights from across the continent exploring the future of African cities
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredReads?.map((article) => (
          <ArticleCard 
            key={article.id} 
            article={{
              id: parseInt(article.id.slice(-8), 16), // Convert UUID to number for compatibility
              title: article.title,
              excerpt: article.excerpt || '',
              image: article.featured_image_url || `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1501854140801-50d01698950b' : '1426604966848-d7adac402bff'}?w=400&h=250&fit=crop&crop=entropy`,
              author: article.author?.name || 'Unknown Author',
              date: article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              }) : 'Recently',
              category: article.category?.name || 'Uncategorized',
              slug: article.slug
            }} 
          />
        ))}
      </div>
    </section>
  );
};
