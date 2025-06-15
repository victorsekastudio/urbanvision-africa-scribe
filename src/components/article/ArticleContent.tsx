
import { ExclusiveContentGate } from "./ExclusiveContentGate";
import { useAuth } from "@/contexts/AuthContext";
import { truncateHtmlContent } from "@/utils/htmlTruncate";
import type { Article } from "@/types/database";

interface ArticleContentProps {
  content?: string;
  article?: Article;
}

export const ArticleContent = ({ content, article }: ArticleContentProps) => {
  const { user } = useAuth();

  if (!content) {
    return (
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 italic">Full article content coming soon...</p>
      </div>
    );
  }

  // If article is exclusive and user is not logged in, show truncated content
  if (article?.exclusive && !user) {
    const truncatedContent = truncateHtmlContent(content, 0.4);

    return (
      <div className="prose prose-lg max-w-none">
        <div className="relative">
          <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />
          
          {/* Gradient fade overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
        </div>
        
        <div className="mt-8">
          <ExclusiveContentGate />
        </div>
      </div>
    );
  }

  // Show full content for non-exclusive articles or logged-in users
  return (
    <div className="prose prose-lg max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
