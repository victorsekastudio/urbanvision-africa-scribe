
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import type { Article } from "@/types/database";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const query = searchParams.get('q') || '';
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const { data: articles, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query.trim()) return [];
      
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .eq('published', true)
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error searching articles:', error);
        throw error;
      }

      return data as Article[];
    },
    enabled: !!query,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            {t.searchArticles}
          </h1>
          
          <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl">
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={!searchTerm.trim()}>
              <SearchIcon className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {query && (
          <div className="mb-8">
            <p className="text-gray-600">
              {t.searchResultsFor} <span className="font-medium">"{query}"</span>
            </p>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
          </div>
        )}

        {articles && articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : query && !isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t.noArticlesFound}</p>
          </div>
        ) : !query ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t.enterSearchTerm}</p>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default Search;
