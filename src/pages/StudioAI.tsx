import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StaticSEOHead } from "@/components/shared/StaticSEOHead";

const StudioAI = () => {
  return (
    <div className="min-h-screen bg-white">
      <StaticSEOHead 
        title="UrbanVision AI Studio - Intelligence Engine for Africa's Urban Future"
        description="Transform how African cities are planned, built, and experienced through data, technology, and design with UrbanVision AI Studio."
      />
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
              UrbanVision AI Studio
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              Coming Soon – The Intelligence Engine Behind Africa's Urban Future
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/3084d7ec-76db-43a2-991f-5c68b5e7f669.png"
              alt="Aerial view of African urban development showing mixed formal and informal settlements"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700 leading-relaxed">
            <p>
              UrbanVision AI Studio is the next evolution of our mission — transforming how African cities are planned, built, and experienced through data, technology, and design.
            </p>

            <p>
              While UrbanVision Magazine brings you stories, insights, and voices from across the continent, AI Studio will provide the tools to act on those insights. It will be a platform where real-time geospatial data meets predictive analytics, giving city leaders, planners, and developers the intelligence they need to make informed decisions — fast.
            </p>

            {/* Second Image with Context */}
            <div className="my-8">
              <img 
                src="/lovable-uploads/e0e47970-1acb-49fd-9804-34de75a6e737.png"
                alt="Aerial view showing urban infrastructure and transportation networks in an African city"
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                Complex urban dynamics require intelligent data-driven solutions
              </p>
            </div>

            <p>
              As urban growth accelerates across Africa, challenges like infrastructure deficits, climate vulnerability, and unplanned sprawl demand smarter, more responsive solutions. UrbanVision AI Studio is built to meet that need.
            </p>

            <p>
              Using a blend of satellite imagery, open urban datasets, and machine learning, AI Studio will help users:
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Map infrastructure gaps in transport, health, education, and housing.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Forecast urban expansion before it happens, especially in informal and peri-urban areas.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Identify climate risks including flood zones, pollution clusters, and heat islands.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Pinpoint areas of opportunity for investment, public-private partnerships, and innovation.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Access all insights through a conversational AI assistant, built to respond to urban planning queries in real time and across multiple languages.</span>
              </li>
            </ul>

            <p>
              Whether you're building a transport corridor, investing in real estate, or designing inclusive housing policy — AI Studio will be your intelligence companion for urban strategy. Pilot cities include Kigali, Accra, and Nairobi.
            </p>

            <div className="text-center space-y-4 pt-8">
              <p className="text-lg font-medium text-gray-900">
                Stay tuned.
              </p>
              <p className="text-xl text-gray-600 font-light">
                UrbanVision AI Studio is launching soon
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudioAI;
