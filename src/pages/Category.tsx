
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { ArrowLeft } from "lucide-react";
import type { Article, Category as CategoryType } from "@/types/database";

const Category = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching category:', error);
        throw error;
      }

      return data as CategoryType;
    },
    enabled: !!slug,
  });

  const { data: articles, isLoading: articlesLoading } = useQuery({
    queryKey: ['category-articles', slug],
    queryFn: async () => {
      if (!slug || !category) return [];
      
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .eq('category_id', category.id)
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching articles:', error);
        throw error;
      }

      return data as Article[];
    },
    enabled: !!category,
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
      </div>
    );
  }

  if (!category) {
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
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-gray-600 max-w-3xl">
              {category.description}
            </p>
          )}
        </div>

        {articles && articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} to={`/article/${article.slug}`}>
                <ArticleCard 
                  article={{
                    id: parseInt(article.id.slice(-8), 16),
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
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found in this category yet.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Category;
