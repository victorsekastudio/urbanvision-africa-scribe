
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { ArrowLeft } from "lucide-react";
import type { Article } from "@/types/database";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

const Tags = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles-by-tag', tagName],
    queryFn: async () => {
      if (!tagName) throw new Error('No tag provided');
      
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .eq('published', true)
        .or(`meta_keywords.ilike.%${tagName}%,meta_keywords_fr.ilike.%${tagName}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching articles by tag:', error);
        throw error;
      }

      return data as Article[];
    },
    enabled: !!tagName,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToHomepage}
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-900 mb-4">
            {t.taggedWith}: {tagName}
          </h1>
          <p className="text-xl text-gray-600 font-light">
            {articles?.length || 0} {t.articlesFound}
          </p>
        </div>

        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 font-light">{t.noArticlesWithTag}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Tags;
