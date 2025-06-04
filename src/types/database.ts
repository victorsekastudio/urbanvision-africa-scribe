
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
  published_at?: string;
  created_at: string;
  updated_at: string;
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
