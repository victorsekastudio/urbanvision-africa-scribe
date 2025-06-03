
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Brevo/ConvertKit
    console.log("Newsletter signup:", email);
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-16 pb-24">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-light tracking-wide text-gray-900 mb-4">
          Stay Connected
        </h3>
        <p className="text-lg text-gray-600 font-light tracking-wide mb-8 font-serif">
          Get the latest insights on Africa's cities. No spam.
        </p>
        
        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-light tracking-wide">Thank you for subscribing! Check your email to confirm.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white font-light tracking-wide">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};
