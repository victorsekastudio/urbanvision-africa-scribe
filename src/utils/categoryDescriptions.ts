
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "./translations";

export const useCategoryDescription = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const getCategoryDescription = (categorySlug: string): string => {
    switch (categorySlug) {
      case 'urban-trends':
        return t.latestTrendsAfricanUrban;
      case 'infrastructure':
        return t.infrastructureGapsInvestmentDesc;
      case 'climate':
        return t.climateResilienceSustainabilityDesc;
      case 'transport':
        return t.transportMobilityDesc;
      case 'smart-city':
        return t.smartCityTechPlanningDesc;
      case 'voices':
        return t.voicesFromGroundDesc;
      default:
        return t.latestTrendsAfricanUrban;
    }
  };

  return { getCategoryDescription };
};

