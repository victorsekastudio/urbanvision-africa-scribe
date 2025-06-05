
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { SEOHead } from "@/components/shared/SEOHead";
import { ReadingProgress } from "@/components/shared/ReadingProgress";
import { ArticleMetadata } from "@/components/article/ArticleMetadata";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleContent } from "@/components/article/ArticleContent";
import { ArticleFooter } from "@/components/article/ArticleFooter";
import { ArrowLeft } from "lucide-react";
import type { Article } from "@/types/database";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";
import { calculateReadingTime } from "@/utils/readingTime";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug, currentLanguage],
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

      console.log('Article: Fetched article for language:', currentLanguage, 'slug:', slug);
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

  // Use "UrbanVision Editorial Team" as default author name
  const authorName = article.author?.name || "UrbanVision Editorial Team";

  // Calculate reading time
  const readingTime = content ? calculateReadingTime(content) : 5;

  console.log('Article: Displaying article with title:', title, 'for language:', currentLanguage);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead article={article} currentLanguage={currentLanguage} />
      <ReadingProgress />
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
          <ArticleMetadata
            article={article}
            categoryName={categoryName}
            authorName={authorName}
            readingTime={readingTime}
            title={title}
            excerpt={excerpt}
            currentLanguage={currentLanguage}
          />

          <ArticleHeader
            article={article}
            title={title}
            excerpt={excerpt}
          />

          <ArticleContent content={content} />

          <ArticleFooter article={article} />
        </article>
      </main>
    </div>
  );
};

export default Article;
