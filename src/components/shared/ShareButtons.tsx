
import { useState } from "react";
import { Share2, Twitter, Linkedin, Facebook, MessageCircle, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ShareButtonsProps {
  url: string;
  title: string;
  excerpt?: string;
  className?: string;
}

export const ShareButtons = ({ url, title, excerpt, className }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}${url}`;
  const shareText = excerpt ? `${title} - ${excerpt}` : title;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
  };

  const shareButtons = [
    { name: 'Twitter', icon: Twitter, url: shareLinks.twitter, color: 'hover:text-blue-500' },
    { name: 'LinkedIn', icon: Linkedin, url: shareLinks.linkedin, color: 'hover:text-blue-700' },
    { name: 'Facebook', icon: Facebook, url: shareLinks.facebook, color: 'hover:text-blue-600' },
    { name: 'WhatsApp', icon: MessageCircle, url: shareLinks.whatsapp, color: 'hover:text-green-600' }
  ];

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4" align="end">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Share this article</h4>
            
            <div className="grid grid-cols-2 gap-2">
              {shareButtons.map((button) => (
                <Button
                  key={button.name}
                  variant="ghost"
                  size="sm"
                  className={`justify-start gap-2 ${button.color}`}
                  onClick={() => window.open(button.url, '_blank', 'noopener,noreferrer')}
                >
                  <button.icon className="w-4 h-4" />
                  {button.name}
                </Button>
              ))}
            </div>

            <div className="border-t pt-3">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2"
                onClick={handleCopyLink}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4" />
                    Copy link
                  </>
                )}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
