
import { useArticles } from "@/hooks/useArticles";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

const AllArticles = () => {
  const { data: articles, isLoading } = useArticles(true); // Only published articles
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
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
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            {t.allArticles}
          </h1>
          <p className="text-lg text-gray-600 font-serif">
            {t.exploreComplete}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {(!articles || articles.length === 0) && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{t.noArticles}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AllArticles;
