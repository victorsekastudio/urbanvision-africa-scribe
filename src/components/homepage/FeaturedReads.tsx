
import { ArticleCard } from "@/components/shared/ArticleCard";

const featuredArticles = [
  {
    id: 1,
    title: "Nairobi's Green Corridors: Transforming Urban Mobility",
    excerpt: "An exploration of how Kenya's capital is integrating green infrastructure with transportation planning.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=250&fit=crop&crop=entropy",
    author: "David Kimani",
    date: "March 12, 2024",
    category: "Transport and Mobility",
    slug: "nairobi-green-corridors"
  },
  {
    id: 2,
    title: "Climate-Resilient Housing in Accra",
    excerpt: "Innovative building techniques helping Ghana's capital adapt to rising sea levels and extreme weather.",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=250&fit=crop&crop=entropy",
    author: "Esi Mensah",
    date: "March 10, 2024",
    category: "Climate Resilience",
    slug: "accra-climate-housing"
  },
  {
    id: 3,
    title: "The Digital Revolution in Cape Town's Planning Department",
    excerpt: "How South Africa's legislative capital is using AI and big data to improve urban planning decisions.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=entropy",
    author: "Thabo Mthembu",
    date: "March 8, 2024",
    category: "Smart City and Tech",
    slug: "cape-town-digital-planning"
  },
  {
    id: 4,
    title: "Water Infrastructure Investment Across the Sahel",
    excerpt: "A comprehensive analysis of funding gaps and opportunities in Sub-Saharan Africa's water systems.",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=250&fit=crop&crop=entropy",
    author: "Fatima Al-Rashid",
    date: "March 5, 2024",
    category: "Infrastructure Investment",
    slug: "sahel-water-infrastructure"
  }
];

export const FeaturedReads = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
          Featured Reads
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Curated insights from across the continent exploring the future of African cities
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};
