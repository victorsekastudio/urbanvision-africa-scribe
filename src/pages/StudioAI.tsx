
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StaticSEOHead } from "@/components/shared/StaticSEOHead";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

const StudioAI = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

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
              {t.studioAITitle}
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              {t.studioAISubtitle}
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
              {t.studioAIIntro1}
            </p>

            <p>
              {t.studioAIIntro2}
            </p>

            {/* Second Image with Context */}
            <div className="my-8">
              <img 
                src="/lovable-uploads/e0e47970-1acb-49fd-9804-34de75a6e737.png"
                alt="Aerial view showing urban infrastructure and transportation networks in an African city"
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                {t.studioAIImageCaption}
              </p>
            </div>

            <p>
              {t.studioAIIntro3}
            </p>

            <p>
              {t.studioAIFeaturesList}
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>{t.studioAIFeature1}</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>{t.studioAIFeature2}</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>{t.studioAIFeature3}</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>{t.studioAIFeature4}</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>{t.studioAIFeature5}</span>
              </li>
            </ul>

            <p>
              {t.studioAIConclusion}
            </p>

            <div className="text-center space-y-4 pt-8">
              <p className="text-lg font-medium text-gray-900">
                {t.stayTuned}
              </p>
              <p className="text-xl text-gray-600 font-light">
                {t.studioAILaunchingSoon}
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
