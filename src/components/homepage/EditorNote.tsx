
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

export const EditorNote = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">
              {t.editorsNote}
            </h3>
            <blockquote className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed font-serif mb-6">
              "{t.editorsNoteQuote}"
            </blockquote>
            <footer className="text-gray-600">
              <cite className="font-medium">{t.editorsNoteAttribution}</cite>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
};
