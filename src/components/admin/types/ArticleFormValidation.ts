
import { z } from "zod";

// Base schema without refinements
const baseArticleSchema = z.object({
  // Required fields with database-aligned constraints
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim(),
  
  title_fr: z.string()
    .max(200, "French title must be less than 200 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  slug: z.string()
    .min(1, "Slug is required")
    .max(100, "Slug must be less than 100 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
    .regex(/^[a-z0-9]/, "Slug must start with a letter or number")
    .regex(/[a-z0-9]$/, "Slug must end with a letter or number")
    .trim(),
  
  slug_fr: z.string()
    .max(100, "French slug must be less than 100 characters")
    .regex(/^[a-z0-9-]*$/, "French slug must contain only lowercase letters, numbers, and hyphens")
    .trim()
    .optional()
    .or(z.literal("")),
  
  // Content fields with realistic limits
  excerpt: z.string()
    .max(500, "Excerpt must be less than 500 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  excerpt_fr: z.string()
    .max(500, "French excerpt must be less than 500 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  content: z.string()
    .min(1, "Content is required")
    .max(50000, "Content must be less than 50,000 characters")
    .trim(),
  
  content_fr: z.string()
    .max(50000, "French content must be less than 50,000 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  // Required foreign keys
  author_id: z.string()
    .uuid("Invalid author selected")
    .min(1, "Author is required"),
  
  category_id: z.string()
    .uuid("Invalid category selected")
    .min(1, "Category is required"),
  
  // Boolean fields with proper defaults
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  pin_as_hero: z.boolean().default(false),
  
  // URL fields with proper validation
  featured_image_url: z.string()
    .url("Featured image must be a valid URL")
    .max(500, "Featured image URL is too long")
    .optional()
    .or(z.literal("")),
  
  // SEO fields with realistic limits
  meta_title: z.string()
    .max(60, "Meta title should be less than 60 characters for SEO")
    .trim()
    .optional()
    .or(z.literal("")),
  
  meta_title_fr: z.string()
    .max(60, "French meta title should be less than 60 characters for SEO")
    .trim()
    .optional()
    .or(z.literal("")),
  
  meta_description: z.string()
    .max(160, "Meta description should be less than 160 characters for SEO")
    .trim()
    .optional()
    .or(z.literal("")),
  
  meta_description_fr: z.string()
    .max(160, "French meta description should be less than 160 characters for SEO")
    .trim()
    .optional()
    .or(z.literal("")),
  
  meta_keywords: z.string()
    .max(300, "Meta keywords must be less than 300 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  meta_keywords_fr: z.string()
    .max(300, "French meta keywords must be less than 300 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  og_image_url: z.string()
    .url("OG image must be a valid URL")
    .max(500, "OG image URL is too long")
    .optional()
    .or(z.literal("")),
  
  canonical_url: z.string()
    .url("Canonical URL must be a valid URL")
    .max(500, "Canonical URL is too long")
    .optional()
    .or(z.literal("")),
  
  canonical_url_fr: z.string()
    .url("French canonical URL must be a valid URL")
    .max(500, "French canonical URL is too long")
    .optional()
    .or(z.literal("")),
  
  // Social media fields
  instagram_enabled: z.boolean().default(false),
  twitter_enabled: z.boolean().default(false),
  linkedin_enabled: z.boolean().default(false),
  
  instagram_caption: z.string()
    .max(2200, "Instagram caption must be less than 2200 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  twitter_caption: z.string()
    .max(280, "Twitter caption must be less than 280 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  linkedin_caption: z.string()
    .max(3000, "LinkedIn caption must be less than 3000 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  social_hashtags: z.string()
    .max(500, "Social hashtags must be less than 500 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  // Image overlay fields
  instagram_image_text: z.string()
    .max(100, "Instagram image text must be less than 100 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  instagram_text_color: z.enum(['white', 'black']).default('white'),
  
  twitter_image_text: z.string()
    .max(100, "Twitter image text must be less than 100 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  twitter_text_color: z.enum(['white', 'black']).default('white'),
  
  linkedin_image_text: z.string()
    .max(100, "LinkedIn image text must be less than 100 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  linkedin_text_color: z.enum(['white', 'black']).default('white'),
});

// Enhanced validation schema with refinements
export const articleFormSchema = baseArticleSchema
.refine(
  (data) => {
    // If French title exists, French slug should also exist
    if (data.title_fr && data.title_fr.trim() && (!data.slug_fr || !data.slug_fr.trim())) {
      return false;
    }
    return true;
  },
  {
    message: "French slug is required when French title is provided",
    path: ["slug_fr"],
  }
)
.refine(
  (data) => {
    // If social media is enabled, caption should be provided
    if (data.instagram_enabled && (!data.instagram_caption || !data.instagram_caption.trim())) {
      return false;
    }
    return true;
  },
  {
    message: "Instagram caption is required when Instagram posting is enabled",
    path: ["instagram_caption"],
  }
)
.refine(
  (data) => {
    if (data.twitter_enabled && (!data.twitter_caption || !data.twitter_caption.trim())) {
      return false;
    }
    return true;
  },
  {
    message: "Twitter caption is required when Twitter posting is enabled",
    path: ["twitter_caption"],
  }
)
.refine(
  (data) => {
    if (data.linkedin_enabled && (!data.linkedin_caption || !data.linkedin_caption.trim())) {
      return false;
    }
    return true;
  },
  {
    message: "LinkedIn caption is required when LinkedIn posting is enabled",
    path: ["linkedin_caption"],
  }
);

export type ArticleFormData = z.infer<typeof articleFormSchema>;

// Helper function to validate individual fields
export const validateField = (fieldName: keyof ArticleFormData, value: any) => {
  try {
    const fieldSchema = baseArticleSchema.shape[fieldName];
    if (fieldSchema) {
      fieldSchema.parse(value);
      return { isValid: true, error: null };
    }
    return { isValid: true, error: null };
  } catch (error: any) {
    return { 
      isValid: false, 
      error: error.errors?.[0]?.message || 'Invalid value' 
    };
  }
};
