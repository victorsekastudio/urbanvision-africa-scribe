
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useArticles } from "@/hooks/useArticles";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";
import { Skeleton } from "@/components/ui/skeleton";

export const Hero = () => {
  const { data: articles, isLoading } = useArticles(true, true);
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const featuredArticle = articles?.[0];

  if (isLoading) {
    return (
      <section className="py-16 md:py-24">
        <article className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-12 w-4/5" />
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="relative">
            <Skeleton className="w-full h-[400px] md:h-[500px] rounded-lg" />
          </div>
        </article>
      </section>
    );
  }

  if (!featuredArticle) {
    return (
      <section className="py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-2xl font-light tracking-wide text-gray-500">No featured articles available</h2>
        </div>
      </section>
    );
  }

  const title = currentLanguage === 'FR' && featuredArticle.title_fr 
    ? featuredArticle.title_fr 
    : featuredArticle.title;
    
  const excerpt = currentLanguage === 'FR' && featuredArticle.excerpt_fr 
    ? featuredArticle.excerpt_fr 
    : featuredArticle.excerpt;

  return (
    <section className="py-16 md:py-24">
      <article className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Featured Article
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight text-gray-900">
              {title}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 font-light tracking-wide leading-relaxed font-serif">
            {excerpt}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 font-light tracking-wide">
            <span>{t.by} {featuredArticle.author?.name}</span>
            <span>•</span>
            <span>{featuredArticle.published_at ? new Date(featuredArticle.published_at).toLocaleDateString(currentLanguage === 'FR' ? 'fr-FR' : 'en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : t.recently}</span>
          </div>
          <Link 
            to={`/article/${featuredArticle.slug}`}
            className="group flex items-center space-x-2 text-gray-900 font-medium tracking-wide hover:text-gray-700 transition-colors"
          >
            <span>{t.readArticle}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="relative">
          <img 
            src={featuredArticle.featured_image_url || "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&crop=entropy"}
            alt={title}
            className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </article>
    </section>
  );
};
