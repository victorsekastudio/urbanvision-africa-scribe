
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { translations, TranslationKey } from "@/utils/translations";

interface PillarArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  slug?: string;
}

interface Pillar {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  articles: PillarArticle[];
}

interface PillarSectionProps {
  pillar: Pillar;
}

export const PillarSection = ({ pillar }: PillarSectionProps) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  
  return (
    <div className="border-t border-gray-100 pt-12">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <h3 className="text-2xl font-light tracking-wide text-gray-900 mb-4">
            {t[pillar.titleKey]}
          </h3>
          <p className="text-gray-600 font-light tracking-wide leading-relaxed font-serif mb-6">
            {t[pillar.descriptionKey]}
          </p>
          <Link 
            to={`/category/${pillar.id}`}
            className="group flex items-center space-x-2 text-gray-900 font-medium tracking-wide hover:text-gray-700 transition-colors"
          >
            <span>{t.viewAllArticles}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-8">
            {pillar.articles.map((article) => (
              <Link 
                key={article.id} 
                to={article.slug ? `/article/${article.slug}` : '#'}
                className="group cursor-pointer"
              >
                <article className="group cursor-pointer">
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src={article.image}
                        alt={article.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-lg font-light tracking-wide text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 text-sm font-light tracking-wide leading-relaxed font-serif">
                        {article.excerpt}
                      </p>
                      <div className="text-xs text-gray-500 font-light tracking-wide">
                        <span>{article.author}</span>
                        <span className="mx-1">•</span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
