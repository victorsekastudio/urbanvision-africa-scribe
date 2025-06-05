
export interface ArticleFormData {
  title: string;
  title_fr: string;
  slug: string;
  slug_fr: string;
  excerpt: string;
  excerpt_fr: string;
  content: string;
  content_fr: string;
  author_id: string;
  category_id: string;
  published: boolean;
  featured: boolean;
  pin_as_hero: boolean;
  featured_image_url: string;
  meta_title: string;
  meta_title_fr: string;
  meta_description: string;
  meta_description_fr: string;
  meta_keywords: string;
  meta_keywords_fr: string;
  og_image_url: string;
  canonical_url: string;
  canonical_url_fr: string;
  // Social media fields
  instagram_enabled: boolean;
  twitter_enabled: boolean;
  linkedin_enabled: boolean;
  instagram_caption: string;
  twitter_caption: string;
  linkedin_caption: string;
  social_hashtags: string;
  // Image overlay fields
  instagram_image_text: string;
  instagram_text_color: 'white' | 'black';
  twitter_image_text: string;
  twitter_text_color: 'white' | 'black';
  linkedin_image_text: string;
  linkedin_text_color: 'white' | 'black';
}
