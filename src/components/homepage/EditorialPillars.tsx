
import { PillarSection } from "@/components/homepage/PillarSection";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/types/database";

// Define the pillar categories that should exist in your database
const pillarCategories = [
  {
    id: "urban-trends-growth",
    titleKey: "urbanTrendsGrowthTitle" as const,
    descriptionKey: "urbanTrendsGrowthDesc" as const,
    categorySlug: "urban-trends"
  },
  {
    id: "infrastructure-investment",
    titleKey: "infrastructureInvestmentTitle" as const,
    descriptionKey: "infrastructureInvestmentDesc" as const,
    categorySlug: "infrastructure"
  },
  {
    id: "climate-sustainability",
    titleKey: "climateSustainabilityTitle" as const,
    descriptionKey: "climateSustainabilityDesc" as const,
    categorySlug: "climate"
  },
  {
    id: "transport-mobility",
    titleKey: "transportMobilityTitle" as const,
    descriptionKey: "transportMobilityDesc" as const,
    categorySlug: "transport"
  },
  {
    id: "smart-city-tech",
    titleKey: "smartCityTechTitle" as const,
    descriptionKey: "smartCityTechDesc" as const,
    categorySlug: "smart-city"
  },
  {
    id: "voices-ground",
    titleKey: "voicesGroundTitle" as const,
    descriptionKey: "voicesGroundDesc" as const,
    categorySlug: "voices"
  }
];

export const EditorialPillars = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  // Fetch articles for all categories
  const { data: articles, isLoading } = useQuery({
    queryKey: ['pillar-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pillar articles:', error);
        throw error;
      }

      return data as Article[];
    },
  });

  // Group articles by category and create pillar data
  const pillarsData = pillarCategories.map(pillar => {
    const categoryArticles = articles?.filter(article => 
      article.category?.slug === pillar.categorySlug
    ).slice(0, 2) || []; // Limit to 2 articles per pillar

    return {
      ...pillar,
      articles: categoryArticles
    };
  }).filter(pillar => pillar.articles.length > 0); // Only show pillars that have articles

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900 mb-4">
            {t.editorialPillars}
          </h2>
          <p className="text-lg text-gray-600 font-light tracking-wide max-w-3xl mx-auto">
            {t.editorialPillarsSubtitle}
          </p>
        </div>
        
        <div className="space-y-16">
          {[1, 2, 3].map((index) => (
            <div key={index} className="border-t border-gray-100 pt-12">
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                  <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="h-20 bg-gray-200 rounded mb-6 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid md:grid-cols-2 gap-8">
                    {[1, 2].map((articleIndex) => (
                      <div key={articleIndex} className="space-y-4">
                        <div className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="space-y-3">
                          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <section className="py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900 mb-4">
            {t.editorialPillars}
          </h2>
          <p className="text-lg text-gray-600 font-light tracking-wide">
            {t.noArticlesFound}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900 mb-4">
          {t.editorialPillars}
        </h2>
        <p className="text-lg text-gray-600 font-light tracking-wide max-w-3xl mx-auto">
          {t.editorialPillarsSubtitle}
        </p>
      </div>
      
      <div className="space-y-16">
        {pillarsData.map((pillar, index) => (
          <PillarSection key={index} pillar={pillar} />
        ))}
      </div>
    </section>
  );
};
