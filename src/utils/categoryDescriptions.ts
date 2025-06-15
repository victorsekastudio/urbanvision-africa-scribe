

import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "./translations";

export const useCategoryDescription = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const getCategoryDescription = (categorySlug: string): string => {
    switch (categorySlug) {
      case 'urban-trends':
        return t.urbanTrendsGrowthDesc;
      case 'infrastructure':
        return t.infrastructureInvestmentDesc;
      case 'climate':
        return t.climateSustainabilityDesc;
      case 'transport':
        return t.transportMobilityDesc;
      case 'smart-city':
        return t.smartCityTechDesc;
      case 'voices':
        return t.voicesGroundDesc;
      default:
        return t.urbanTrendsGrowthDesc;
    }
  };

  return { getCategoryDescription };
};

