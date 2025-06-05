
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { ArrowLeft } from "lucide-react";
import type { Article, Category as CategoryType } from "@/types/database";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: ['category', category, currentLanguage],
    queryFn: async () => {
      if (!category) throw new Error('No category provided');
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', category)
        .single();

      if (error) {
        console.error('Error fetching category:', error);
        throw error;
      }

      return data as CategoryType;
    },
    enabled: !!category,
  });

  const { data: articles, isLoading: articlesLoading } = useQuery({
    queryKey: ['category-articles', category, currentLanguage],
    queryFn: async () => {
      if (!category || !categoryData) return [];
      
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .eq('category_id', categoryData.id)
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching articles:', error);
        throw error;
      }

      console.log('Category: Articles fetched for language:', currentLanguage, data?.length || 0, 'articles');
      return data as Article[];
    },
    enabled: !!categoryData,
  });

  const isLoading = categoryLoading || articlesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-16 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-light text-gray-900 mb-4">{t.articleNotFound}</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              {t.returnToHomepage}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Use French versions when available and current language is French
  const categoryName = currentLanguage === 'FR' && categoryData.name_fr 
    ? categoryData.name_fr 
    : categoryData.name;
    
  const categoryDescription = currentLanguage === 'FR' && categoryData.description_fr 
    ? categoryData.description_fr 
    : categoryData.description;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToHomepage}
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            {categoryName}
          </h1>
          {categoryDescription && (
            <p className="text-lg text-gray-600 max-w-3xl">
              {categoryDescription}
            </p>
          )}
        </div>

        {articles && articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t.noArticlesFound}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Category;
