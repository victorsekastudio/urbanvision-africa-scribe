
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

interface TagsListProps {
  keywords?: string;
  keywords_fr?: string;
}

export const TagsList = ({ keywords, keywords_fr }: TagsListProps) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  // Get keywords based on current language
  const currentKeywords = currentLanguage === 'FR' && keywords_fr 
    ? keywords_fr 
    : keywords;

  if (!currentKeywords) return null;

  // Parse comma-separated keywords into array and clean them
  const tags = currentKeywords
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  if (tags.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-light text-gray-900">{t.tags}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Link key={index} to={`/tag/${encodeURIComponent(tag)}`}>
            <Badge 
              variant="outline" 
              className="hover:bg-gray-50 transition-colors cursor-pointer text-sm px-3 py-1"
            >
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};
