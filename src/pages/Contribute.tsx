
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

const Contribute = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-light text-gray-900 mb-8 font-serif">
            {t.contributeToUrbanVision}
          </h1>
          
          <div className="text-gray-700 font-light leading-relaxed space-y-6">
            <p className="text-xl text-gray-600 mb-8">
              {t.contributeSubtitle}
            </p>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              {t.whatWereLookingFor}
            </h2>
            
            <p>
              {t.whatWereLookingForText}
            </p>
            
            <ul className="space-y-3 list-disc list-inside">
              <li>{t.originalResearch}</li>
              <li>{t.caseStudies}</li>
              <li>{t.criticalPerspectives}</li>
              <li>{t.communityStories}</li>
              <li>{t.dataInvestigations}</li>
              <li>{t.internationalPerspectives}</li>
            </ul>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              {t.submissionGuidelines}
            </h2>
            
            <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">
              {t.articleLength}
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>{t.featureArticles}</li>
              <li>{t.analysisPieces}</li>
              <li>{t.opinionPieces}</li>
              <li>{t.briefReports}</li>
            </ul>
            
            <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">
              {t.formatRequirements}
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>{t.submitInWord}</li>
              <li>{t.includeBio}</li>
              <li>{t.provideImages}</li>
              <li>{t.includeCitations}</li>
              <li>{t.suggestTags}</li>
            </ul>
            
            <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">
              {t.proposalProcess}
            </h3>
            <p>
              {t.proposalProcessText}
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>{t.mainArgument}</li>
              <li>{t.whyTimely}</li>
              <li>{t.uniquePerspective}</li>
              <li>{t.keySources}</li>
            </ul>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              {t.editorialStandards}
            </h2>
            
            <p>
              {t.editorialStandardsText}
            </p>
            
            <ul className="space-y-3 list-disc list-inside">
              <li><strong>{t.accuracy}</strong> {t.accuracyDesc}</li>
              <li><strong>{t.originality}</strong> {t.originalityDesc}</li>
              <li><strong>{t.relevance}</strong> {t.relevanceDesc}</li>
              <li><strong>{t.clarity}</strong> {t.clarityDesc}</li>
              <li><strong>{t.balance}</strong> {t.balanceDesc}</li>
            </ul>
            
            <h2 className="text-2xl font-light text-gray-900 mt-12 mb-6 font-serif">
              {t.getInTouch}
            </h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-4">
                {t.readyToContribute}
              </p>
              <p>
                <strong>{t.email}</strong> <a href="mailto:v.isingizwe@seka.studio" className="text-blue-600 hover:text-blue-800">v.isingizwe@seka.studio</a>
              </p>
              <p className="mt-2">
                <strong>{t.responseTime}</strong> {t.responseTimeText}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contribute;
