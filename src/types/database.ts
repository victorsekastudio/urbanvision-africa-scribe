
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Author {
  id: string;
  name: string;
  email?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
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
