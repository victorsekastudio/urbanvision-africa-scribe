
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { ArrowLeft } from "lucide-react";
import type { Article, Category as CategoryType } from "@/types/database";

const Category = () => {
  const { category } = useParams<{ category: string }>();

  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: ['category', category],
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
    queryKey: ['category-articles', category],
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
            <h1 className="text-2xl font-light text-gray-900 mb-4">Category not found</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Return to homepage
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to homepage
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            {categoryData.name}
          </h1>
          {categoryData.description && (
            <p className="text-lg text-gray-600 max-w-3xl">
              {categoryData.description}
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
            <p className="text-gray-500 text-lg">No articles found in this category yet.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Category;
