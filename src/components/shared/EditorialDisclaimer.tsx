
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

export const EditorialDisclaimer = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <p className="text-sm text-gray-500 italic text-center">
        {t.editorialDisclaimer}
      </p>
    </div>
  );
};
