
interface ArticleContentProps {
  content?: string;
}

export const ArticleContent = ({ content }: ArticleContentProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <p className="text-gray-600 italic">Full article content coming soon...</p>
      )}
    </div>
  );
};
