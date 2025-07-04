
import { TagsList } from "@/components/shared/TagsList";
import { MoreLikeThis } from "@/components/shared/MoreLikeThis";
import { EditorialDisclaimer } from "@/components/shared/EditorialDisclaimer";
import type { Article } from "@/types/database";

interface ArticleFooterProps {
  article: Article;
}

export const ArticleFooter = ({ article }: ArticleFooterProps) => {
  return (
    <>
      <EditorialDisclaimer />

      <div className="border-t pt-8">
        <TagsList 
          keywords={article.meta_keywords} 
          keywords_fr={article.meta_keywords_fr} 
        />
      </div>

      {/* More Like This Section */}
      <div className="border-t pt-8">
        <MoreLikeThis
          currentArticleId={article.id}
          categoryId={article.category_id || undefined}
          keywords={article.meta_keywords}
        />
      </div>
    </>
  );
};
