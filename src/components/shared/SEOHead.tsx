
import { Helmet } from "react-helmet-async";
import type { Article } from "@/types/database";

interface SEOHeadProps {
  article: Article;
  currentLanguage: 'EN' | 'FR';
}

export const SEOHead = ({ article, currentLanguage }: SEOHeadProps) => {
  const title = currentLanguage === 'FR' && article.title_fr 
    ? article.title_fr 
    : article.title;
    
  const excerpt = currentLanguage === 'FR' && article.excerpt_fr 
    ? article.excerpt_fr 
    : article.excerpt;
    
  const metaTitle = currentLanguage === 'FR' && article.meta_title_fr 
    ? article.meta_title_fr 
    : article.meta_title || title;
    
  const metaDescription = currentLanguage === 'FR' && article.meta_description_fr 
    ? article.meta_description_fr 
    : article.meta_description || excerpt;
    
  const metaKeywords = currentLanguage === 'FR' && article.meta_keywords_fr 
    ? article.meta_keywords_fr 
    : article.meta_keywords;

  const ogImage = article.og_image_url || article.featured_image_url;
  const canonicalUrl = article.canonical_url;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      {metaDescription && <meta name="description" content={metaDescription} />}
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      
      {/* Open Graph tags */}
      <meta property="og:title" content={metaTitle} />
      {metaDescription && <meta property="og:description" content={metaDescription} />}
      <meta property="og:type" content="article" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      {metaDescription && <meta name="twitter:description" content={metaDescription} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Article specific tags */}
      {article.published_at && (
        <meta property="article:published_time" content={article.published_at} />
      )}
      {article.author?.name && (
        <meta property="article:author" content={article.author.name} />
      )}
      {article.category?.name && (
        <meta property="article:section" content={article.category.name} />
      )}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
};
