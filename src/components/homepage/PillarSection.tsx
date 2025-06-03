
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PillarArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  slug?: string; // Add slug for linking
}

interface Pillar {
  title: string;
  description: string;
  articles: PillarArticle[];
}

interface PillarSectionProps {
  pillar: Pillar;
}

// Mapping of pillar titles to category slugs
const pillarToCategorySlug = {
  "Urban Trends and Growth": "urban-trends-growth",
  "Infrastructure Gaps and Investment": "infrastructure-investment", 
  "Climate Resilience and Sustainability": "climate-sustainability",
  "Transport and Mobility": "transport-mobility",
  "Smart City and Tech in Planning": "smart-city-tech",
  "Voices from the Ground": "voices-ground"
};

export const PillarSection = ({ pillar }: PillarSectionProps) => {
  const categorySlug = pillarToCategorySlug[pillar.title as keyof typeof pillarToCategorySlug] || "all";
  
  return (
    <div className="border-t border-gray-100 pt-12">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <h3 className="text-2xl font-light text-gray-900 mb-4">
            {pillar.title}
          </h3>
          <p className="text-gray-600 leading-relaxed font-serif mb-6">
            {pillar.description}
          </p>
          <Link 
            to={categorySlug === "all" ? "/articles" : `/category/${categorySlug}`}
            className="group flex items-center space-x-2 text-gray-900 font-medium hover:text-gray-700 transition-colors"
          >
            <span>View All Articles</span>
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
                      <h4 className="text-lg font-medium text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed font-serif">
                        {article.excerpt}
                      </p>
                      <div className="text-xs text-gray-500">
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
