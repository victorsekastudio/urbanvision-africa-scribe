
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ContributeFormData {
  title: string;
  email: string;
  message: string;
}

export const ContributeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContributeFormData>();

  const onSubmit = async (data: ContributeFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-form', {
        body: data
      });

      if (error) throw error;

      toast.success("Your message has been sent successfully! We'll get back to you within 1 week.");
      reset();
    } catch (error) {
      console.error('Error sending contact form:', error);
      toast.error("Failed to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-light text-gray-900 mb-4 font-serif">
        Get in Touch
      </h3>
      <p className="text-gray-600 mb-6">
        Ready to contribute? We'd love to hear from you.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          <Label htmlFor="title">Article/Contribution Title</Label>
          <FormControl>
            <Input
              id="title"
              placeholder="What would you like to write about?"
              {...register("title", { 
                required: "Title is required",
                minLength: { value: 5, message: "Title must be at least 5 characters" }
              })}
            />
          </FormControl>
          {errors.title && <FormMessage>{errors.title.message}</FormMessage>}
        </FormItem>

        <FormItem>
          <Label htmlFor="email">Your Email</Label>
          <FormControl>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
          </FormControl>
          {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
        </FormItem>

        <FormItem>
          <Label htmlFor="message">Your Message</Label>
          <FormControl>
            <Textarea
              id="message"
              placeholder="Tell us about your contribution idea, your background, and why this topic is important..."
              rows={6}
              {...register("message", { 
                required: "Message is required",
                minLength: { value: 50, message: "Message must be at least 50 characters" }
              })}
            />
          </FormControl>
          {errors.message && <FormMessage>{errors.message.message}</FormMessage>}
        </FormItem>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
      
      <p className="text-sm text-gray-500 mt-4">
        <strong>Response time:</strong> We aim to respond to all submissions within 1 week.
      </p>
    </div>
  );
};
