
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@/types/database";
import { useEffect } from "react";

export const Hero = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const queryClient = useQueryClient();

  // Invalidate hero article query when language changes
  useEffect(() => {
    console.log('Hero: Language changed, invalidating hero article query');
    queryClient.invalidateQueries({ queryKey: ['hero-article'] });
  }, [currentLanguage, queryClient]);

  // Fetch hero article (pinned article has priority, then featured articles)
  const { data: heroArticle, isLoading } = useQuery({
    queryKey: ['hero-article', currentLanguage],
    queryFn: async (): Promise<Article | null> => {
      // First try to get a pinned hero article
      const { data: pinnedArticle } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .eq('published', true)
        .eq('pin_as_hero', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (pinnedArticle) {
        console.log('Hero: Found pinned article for language', currentLanguage);
        return pinnedArticle as Article;
      }

      // If no pinned article, fall back to featured articles
      const { data: featuredArticles, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .eq('published', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching hero article:', error);
        throw error;
      }

      console.log('Hero: Found featured article for language', currentLanguage);
      return featuredArticles?.[0] as Article || null;
    },
  });

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

  if (!heroArticle) {
    return (
      <section className="py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-2xl font-light tracking-wide text-gray-500">{t.noFeaturedArticles}</h2>
        </div>
      </section>
    );
  }

  const title = currentLanguage === 'FR' && heroArticle.title_fr 
    ? heroArticle.title_fr 
    : heroArticle.title;
    
  const excerpt = currentLanguage === 'FR' && heroArticle.excerpt_fr 
    ? heroArticle.excerpt_fr 
    : heroArticle.excerpt;

  console.log('Hero: Displaying article with title:', title, 'for language:', currentLanguage);

  return (
    <section className="py-16 md:py-24">
      <article className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {t.featuredArticle}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight text-gray-900">
              {title}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 font-light tracking-wide leading-relaxed font-serif">
            {excerpt}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 font-light tracking-wide">
            <span>{t.by} {heroArticle.author?.name}</span>
            <span>•</span>
            <span>{heroArticle.published_at ? new Date(heroArticle.published_at).toLocaleDateString(currentLanguage === 'FR' ? 'fr-FR' : 'en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : t.recently}</span>
          </div>
          <Link 
            to={`/article/${heroArticle.slug}`}
            className="group flex items-center space-x-2 text-gray-900 font-medium tracking-wide hover:text-gray-700 transition-colors"
          >
            <span>{t.readArticle}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="relative">
          <img 
            src={heroArticle.featured_image_url || "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&crop=entropy"}
            alt={title}
            className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </article>
    </section>
  );
};
