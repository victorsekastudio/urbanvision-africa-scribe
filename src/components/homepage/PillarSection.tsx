
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";
import type { Article } from "@/types/database";

// Define string-only keys to avoid union type issues
type StringTranslationKey = 
  | "urbanTrendsGrowthTitle" | "urbanTrendsGrowthDesc"
  | "infrastructureInvestmentTitle" | "infrastructureInvestmentDesc" 
  | "climateSustainabilityTitle" | "climateSustainabilityDesc"
  | "transportMobilityTitle" | "transportMobilityDesc"
  | "smartCityTechTitle" | "smartCityTechDesc"
  | "voicesGroundTitle" | "voicesGroundDesc";

interface Pillar {
  id: string;
  titleKey: StringTranslationKey;
  descriptionKey: StringTranslationKey;
  categorySlug: string;
  articles: Article[];
}

interface PillarSectionProps {
  pillar: Pillar;
}

export const PillarSection = ({ pillar }: PillarSectionProps) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLanguage === 'FR' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="border-t border-gray-100 pt-12">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <h3 className="text-2xl font-light tracking-wide text-gray-900 mb-4">
            {t[pillar.titleKey] as string}
          </h3>
          <p className="text-gray-600 font-light tracking-wide leading-relaxed font-serif mb-6">
            {t[pillar.descriptionKey] as string}
          </p>
          <Link 
            to={`/category/${pillar.categorySlug}`}
            className="group flex items-center space-x-2 text-gray-900 font-medium tracking-wide hover:text-gray-700 transition-colors"
          >
            <span>{t.viewAllArticles}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-8">
            {pillar.articles.map((article) => {
              const title = currentLanguage === 'FR' && article.title_fr 
                ? article.title_fr 
                : article.title;
                
              const excerpt = currentLanguage === 'FR' && article.excerpt_fr 
                ? article.excerpt_fr 
                : article.excerpt;

              const authorName = article.author?.name || "UrbanVision Editorial Team";

              return (
                <Link 
                  key={article.id} 
                  to={`/article/${article.slug}`}
                  className="group cursor-pointer"
                >
                  <article className="group cursor-pointer">
                    <div className="space-y-4">
                      <div className="relative overflow-hidden rounded-lg">
                        <img 
                          src={article.featured_image_url || "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop&crop=entropy"}
                          alt={title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-lg font-light tracking-wide text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                          {title}
                        </h4>
                        <p className="text-gray-600 text-sm font-light tracking-wide leading-relaxed font-serif">
                          {excerpt || "Read more about this article..."}
                        </p>
                        <div className="text-xs text-gray-500 font-light tracking-wide">
                          <span>{authorName}</span>
                          <span className="mx-1">•</span>
                          <span>{formatDate(article.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
