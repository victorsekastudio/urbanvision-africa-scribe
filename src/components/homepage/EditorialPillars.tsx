
import { PillarSection } from "@/components/homepage/PillarSection";

const pillarsData = [
  {
    title: "Urban Trends and Growth",
    description: "Analyzing population dynamics, urbanization patterns, and emerging city development models across Sub-Saharan Africa.",
    articles: [
      {
        id: 5,
        title: "The Rise of Secondary Cities in East Africa",
        excerpt: "How medium-sized urban centers are becoming economic powerhouses.",
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop&crop=entropy",
        author: "Sarah Nyong",
        date: "March 3, 2024"
      },
      {
        id: 6,
        title: "Youth-Driven Urban Innovation in Kampala",
        excerpt: "Young entrepreneurs reshaping Uganda's capital through technology and creativity.",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop&crop=entropy",
        author: "Moses Ssali",
        date: "February 28, 2024"
      }
    ]
  },
  {
    title: "Infrastructure Gaps and Investment",
    description: "Examining funding mechanisms, public-private partnerships, and innovative financing for essential urban infrastructure.",
    articles: [
      {
        id: 7,
        title: "Bridging the Infrastructure Financing Gap in West Africa",
        excerpt: "New models for funding critical urban infrastructure projects.",
        image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=200&fit=crop&crop=entropy",
        author: "Kemi Adebayo",
        date: "February 25, 2024"
      },
      {
        id: 8,
        title: "PPP Success Stories from Johannesburg",
        excerpt: "How public-private partnerships are transforming South Africa's largest city.",
        image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=300&h=200&fit=crop&crop=entropy",
        author: "Mandla Ndaba",
        date: "February 22, 2024"
      }
    ]
  },
  {
    title: "Climate Resilience and Sustainability",
    description: "Exploring adaptation strategies, green infrastructure, and sustainable development practices for African cities.",
    articles: [
      {
        id: 9,
        title: "Flood Management in Dakar: Lessons from the 2023 Season",
        excerpt: "How Senegal's capital is building resilience against extreme weather events.",
        image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=300&h=200&fit=crop&crop=entropy",
        author: "Aminata Diallo",
        date: "February 20, 2024"
      },
      {
        id: 10,
        title: "Solar Microgrids Powering Urban Growth",
        excerpt: "Decentralized energy solutions transforming African city planning.",
        image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop&crop=entropy",
        author: "Emmanuel Asante",
        date: "February 18, 2024"
      }
    ]
  },
  {
    title: "Transport and Mobility",
    description: "Investigating sustainable transportation solutions, urban mobility innovations, and infrastructure development.",
    articles: [
      {
        id: 11,
        title: "BRT Systems Transforming African Cities",
        excerpt: "The success and challenges of Bus Rapid Transit across the continent.",
        image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop&crop=entropy",
        author: "Grace Ochieng",
        date: "February 15, 2024"
      },
      {
        id: 12,
        title: "Motorcycle Taxis: Formalizing Informal Transport",
        excerpt: "How digital platforms are organizing traditional transportation modes.",
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop&crop=entropy",
        author: "Bola Tinubu",
        date: "February 12, 2024"
      }
    ]
  },
  {
    title: "Smart City and Tech in Planning",
    description: "Covering digital transformation, data-driven governance, and technology adoption in urban planning.",
    articles: [
      {
        id: 13,
        title: "AI-Powered Traffic Management in Rwanda",
        excerpt: "How Kigali is using artificial intelligence to optimize urban mobility.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop&crop=entropy",
        author: "Jean-Claude Nzeyimana",
        date: "February 10, 2024"
      },
      {
        id: 14,
        title: "Digital Twin Technology for African Cities",
        excerpt: "Virtual city models helping planners make better decisions.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop&crop=entropy",
        author: "Nomsa Mbeki",
        date: "February 8, 2024"
      }
    ]
  },
  {
    title: "Voices from the Ground",
    description: "Featuring community perspectives, grassroots initiatives, and local solutions to urban challenges.",
    articles: [
      {
        id: 15,
        title: "Community-Led Urban Agriculture in Lusaka",
        excerpt: "How residents are transforming vacant lots into productive green spaces.",
        image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop&crop=entropy",
        author: "Chipo Mwanza",
        date: "February 5, 2024"
      },
      {
        id: 16,
        title: "Women's Cooperatives Building Better Cities",
        excerpt: "Female-led initiatives driving urban development across Sub-Saharan Africa.",
        image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&h=200&fit=crop&crop=entropy",
        author: "Aisha Mohammed",
        date: "February 3, 2024"
      }
    ]
  }
];

export const EditorialPillars = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
          Editorial Pillars
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our coverage is organized around six core themes that shape the future of African cities
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
