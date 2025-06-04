
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { SEOHead } from "@/components/shared/SEOHead";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import type { Article } from "@/types/database";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        console.error('Error fetching article:', error);
        throw error;
      }

      return data as Article;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-light text-gray-900 mb-4">{t.articleNotFound}</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              {t.returnToHomepage}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const title = currentLanguage === 'FR' && article.title_fr 
    ? article.title_fr 
    : article.title;
    
  const excerpt = currentLanguage === 'FR' && article.excerpt_fr 
    ? article.excerpt_fr 
    : article.excerpt;
    
  const content = currentLanguage === 'FR' && article.content_fr 
    ? article.content_fr 
    : article.content;

  const categoryName = currentLanguage === 'FR' && article.category?.name_fr 
    ? article.category.name_fr 
    : article.category?.name;

  return (
    <div className="min-h-screen bg-white">
      <SEOHead article={article} currentLanguage={currentLanguage} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToHomepage}
        </Link>

        <article className="space-y-8">
          <header className="space-y-6">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {article.category && (
                <Link 
                  to={`/category/${article.category.slug}`}
                  className="inline-flex items-center hover:text-gray-700 transition-colors"
                >
                  <Tag className="w-4 h-4 mr-1" />
                  {categoryName}
                </Link>
              )}
              {article.published_at && (
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(article.published_at).toLocaleDateString(currentLanguage === 'FR' ? 'fr-FR' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
              {article.author && (
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {article.author.name}
                </span>
              )}
            </div>

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

          <div className="prose prose-lg max-w-none">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p className="text-gray-600 italic">Full article content coming soon...</p>
            )}
          </div>
        </article>
      </main>
    </div>
  );
};

export default Article;
