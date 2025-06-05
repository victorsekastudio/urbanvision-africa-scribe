
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useNewsletterSubscription } from "@/hooks/useNewsletterSubscription";

export const SubscribeModal = () => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { subscribe, isSubmitting } = useNewsletterSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await subscribe(email);
    if (success) {
      setEmail("");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="font-light text-gray-700 hover:text-gray-900 border-gray-200 hover:border-gray-300 transition-colors duration-300"
        >
          <Mail className="w-4 h-4 mr-2" />
          Subscribe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-light text-xl">Stay Updated</DialogTitle>
          <DialogDescription className="font-light text-gray-600">
            Get the latest urban insights delivered to your inbox.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="font-light"
            disabled={isSubmitting}
          />
          <Button 
            type="submit" 
            className="w-full font-light" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
