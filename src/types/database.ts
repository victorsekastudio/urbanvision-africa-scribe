
export interface Category {
  id: string;
  name: string;
  name_fr?: string;
  slug: string;
  description?: string;
  description_fr?: string;
  created_at: string;
  updated_at: string;
}

export interface Author {
  id: string;
  name: string;
  email?: string;
  bio?: string;
  bio_fr?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  title_fr?: string;
  slug: string;
  excerpt?: string;
  excerpt_fr?: string;
  content?: string;
  content_fr?: string;
  featured_image_url?: string;
  author_id?: string;
  category_id?: string;
  published: boolean;
  featured: boolean;
  pin_as_hero?: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
  // SEO fields
  meta_title?: string;
  meta_title_fr?: string;
  meta_description?: string;
  meta_description_fr?: string;
  meta_keywords?: string;
  meta_keywords_fr?: string;
  og_image_url?: string;
  canonical_url?: string;
  // Social media fields
  instagram_enabled?: boolean;
  twitter_enabled?: boolean;
  instagram_caption?: string;
  twitter_caption?: string;
  social_hashtags?: string;
  instagram_post_id?: string;
  twitter_post_id?: string;
  instagram_post_url?: string;
  twitter_post_url?: string;
  social_media_posted_at?: string;
  // Image overlay fields
  instagram_image_text?: string;
  instagram_text_color?: 'white' | 'black';
  twitter_image_text?: string;
  twitter_text_color?: 'white' | 'black';
  // Joined data
  author?: Author;
  category?: Category;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  type: 'webinar' | 'event';
  image_url?: string;
  registration_link?: string;
  attendees_count: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}
