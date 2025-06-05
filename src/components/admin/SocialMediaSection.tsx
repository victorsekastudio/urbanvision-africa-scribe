
import { UseFormReturn } from "react-hook-form";
import { Hash } from "lucide-react";
import { InstagramSection } from "./social/InstagramSection";
import { TwitterSection } from "./social/TwitterSection";
import { SocialHashtagsField } from "./social/SocialHashtagsField";
import type { ArticleFormData } from "./types/ArticleFormTypes";

interface SocialMediaSectionProps {
  form: UseFormReturn<ArticleFormData>;
}

export const SocialMediaSection = ({ form }: SocialMediaSectionProps) => {
  const watchTitle = form.watch("title");
  const watchExcerpt = form.watch("excerpt");

  return (
    <div className="space-y-6 p-6 border rounded-lg">
      <div className="flex items-center gap-2">
        <Hash className="w-5 h-5" />
        <h3 className="text-lg font-medium">Social Media Publishing</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InstagramSection 
          form={form} 
          watchTitle={watchTitle} 
          watchExcerpt={watchExcerpt} 
        />
        
        <TwitterSection 
          form={form} 
          watchTitle={watchTitle} 
          watchExcerpt={watchExcerpt} 
        />
      </div>

      <SocialHashtagsField form={form} />
    </div>
  );
};
