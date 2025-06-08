
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

const About = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-light text-gray-900 mb-8 font-serif">
            {t.aboutUrbanVision}
          </h1>
          
          <div className="text-gray-700 font-light leading-relaxed space-y-6">
            <p className="text-xl text-gray-600 mb-8">
              {t.aboutSubtitle}
            </p>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              {t.ourEditorialMission}
            </h2>
            
            <p>
              {t.aboutEditorialMissionText1}
            </p>
            
            <p>
              {t.aboutEditorialMissionText2}
            </p>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              {t.whatWeCover}
            </h2>
            
            <ul className="space-y-3 list-disc list-inside">
              <li><strong>{t.urbanTrendsGrowth}:</strong> {t.urbanTrendsGrowthDesc}</li>
              <li><strong>{t.infrastructureInvestment}:</strong> {t.infrastructureInvestmentDesc}</li>
              <li><strong>{t.climateSustainability}:</strong> {t.climateSustainabilityDesc}</li>
              <li><strong>{t.transportMobility}:</strong> {t.transportMobilityDesc}</li>
              <li><strong>{t.smartCityTech}:</strong> {t.smartCityTechDesc}</li>
              <li><strong>{t.voicesGround}:</strong> {t.voicesGroundDesc}</li>
            </ul>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              {t.ourApproach}
            </h2>
            
            <p>
              {t.aboutApproachText1}
            </p>
            
            <p>
              {t.aboutApproachText2}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
