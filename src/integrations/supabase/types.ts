export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          admin_user_id: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_user_id: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_user_id?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      articles: {
        Row: {
          author_id: string | null
          canonical_url: string | null
          canonical_url_fr: string | null
          category_id: string | null
          content: string | null
          content_fr: string | null
          created_at: string
          excerpt: string | null
          excerpt_fr: string | null
          exclusive: boolean
          featured: boolean
          featured_image_url: string | null
          id: string
          instagram_caption: string | null
          instagram_enabled: boolean | null
          instagram_image_text: string | null
          instagram_post_id: string | null
          instagram_post_url: string | null
          instagram_text_color: string | null
          linkedin_caption: string | null
          linkedin_enabled: boolean | null
          linkedin_image_text: string | null
          linkedin_post_id: string | null
          linkedin_post_url: string | null
          linkedin_text_color: string | null
          meta_description: string | null
          meta_description_fr: string | null
          meta_keywords: string | null
          meta_keywords_fr: string | null
          meta_title: string | null
          meta_title_fr: string | null
          og_image_url: string | null
          pin_as_hero: boolean | null
          published: boolean
          published_at: string | null
          slug: string
          slug_fr: string | null
          social_hashtags: string | null
          social_media_posted_at: string | null
          title: string
          title_fr: string | null
          twitter_caption: string | null
          twitter_enabled: boolean | null
          twitter_image_text: string | null
          twitter_post_id: string | null
          twitter_post_url: string | null
          twitter_text_color: string | null
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          canonical_url?: string | null
          canonical_url_fr?: string | null
          category_id?: string | null
          content?: string | null
          content_fr?: string | null
          created_at?: string
          excerpt?: string | null
          excerpt_fr?: string | null
          exclusive?: boolean
          featured?: boolean
          featured_image_url?: string | null
          id?: string
          instagram_caption?: string | null
          instagram_enabled?: boolean | null
          instagram_image_text?: string | null
          instagram_post_id?: string | null
          instagram_post_url?: string | null
          instagram_text_color?: string | null
          linkedin_caption?: string | null
          linkedin_enabled?: boolean | null
          linkedin_image_text?: string | null
          linkedin_post_id?: string | null
          linkedin_post_url?: string | null
          linkedin_text_color?: string | null
          meta_description?: string | null
          meta_description_fr?: string | null
          meta_keywords?: string | null
          meta_keywords_fr?: string | null
          meta_title?: string | null
          meta_title_fr?: string | null
          og_image_url?: string | null
          pin_as_hero?: boolean | null
          published?: boolean
          published_at?: string | null
          slug: string
          slug_fr?: string | null
          social_hashtags?: string | null
          social_media_posted_at?: string | null
          title: string
          title_fr?: string | null
          twitter_caption?: string | null
          twitter_enabled?: boolean | null
          twitter_image_text?: string | null
          twitter_post_id?: string | null
          twitter_post_url?: string | null
          twitter_text_color?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          canonical_url?: string | null
          canonical_url_fr?: string | null
          category_id?: string | null
          content?: string | null
          content_fr?: string | null
          created_at?: string
          excerpt?: string | null
          excerpt_fr?: string | null
          exclusive?: boolean
          featured?: boolean
          featured_image_url?: string | null
          id?: string
          instagram_caption?: string | null
          instagram_enabled?: boolean | null
          instagram_image_text?: string | null
          instagram_post_id?: string | null
          instagram_post_url?: string | null
          instagram_text_color?: string | null
          linkedin_caption?: string | null
          linkedin_enabled?: boolean | null
          linkedin_image_text?: string | null
          linkedin_post_id?: string | null
          linkedin_post_url?: string | null
          linkedin_text_color?: string | null
          meta_description?: string | null
          meta_description_fr?: string | null
          meta_keywords?: string | null
          meta_keywords_fr?: string | null
          meta_title?: string | null
          meta_title_fr?: string | null
          og_image_url?: string | null
          pin_as_hero?: boolean | null
          published?: boolean
          published_at?: string | null
          slug?: string
          slug_fr?: string | null
          social_hashtags?: string | null
          social_media_posted_at?: string | null
          title?: string
          title_fr?: string | null
          twitter_caption?: string | null
          twitter_enabled?: boolean | null
          twitter_image_text?: string | null
          twitter_post_id?: string | null
          twitter_post_url?: string | null
          twitter_text_color?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      authors: {
        Row: {
          avatar_url: string | null
          bio: string | null
          bio_fr: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          bio_fr?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          bio_fr?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          description_fr: string | null
          id: string
          name: string
          name_fr: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          description_fr?: string | null
          id?: string
          name: string
          name_fr?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          description_fr?: string | null
          id?: string
          name?: string
          name_fr?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          attendees_count: number | null
          created_at: string
          date: string
          description: string | null
          id: string
          image_url: string | null
          published: boolean
          registration_link: string | null
          time: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          attendees_count?: number | null
          created_at?: string
          date: string
          description?: string | null
          id?: string
          image_url?: string | null
          published?: boolean
          registration_link?: string | null
          time: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          attendees_count?: number | null
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          image_url?: string | null
          published?: boolean
          registration_link?: string | null
          time?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          status: string
          subscribed_at: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          status?: string
          subscribed_at?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          status?: string
          subscribed_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
