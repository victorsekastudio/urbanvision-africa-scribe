
import { Instagram, Twitter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/types/database";

interface SocialMediaStatusProps {
  article: Article;
}

export const SocialMediaStatus = ({ article }: SocialMediaStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      {article.instagram_post_url && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Instagram className="w-3 h-3 text-pink-600" />
          <span className="text-xs">Posted</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0"
            onClick={() => window.open(article.instagram_post_url, '_blank')}
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
        </Badge>
      )}
      
      {article.twitter_post_url && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Twitter className="w-3 h-3 text-blue-600" />
          <span className="text-xs">Posted</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0"
            onClick={() => window.open(article.twitter_post_url, '_blank')}
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
        </Badge>
      )}
      
      {(article.instagram_enabled || article.twitter_enabled) && 
       !article.instagram_post_url && !article.twitter_post_url && (
        <Badge variant="outline" className="text-xs">
          Social Media Enabled
        </Badge>
      )}
    </div>
  );
};
