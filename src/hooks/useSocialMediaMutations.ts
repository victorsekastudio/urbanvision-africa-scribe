
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SocialMediaPostData {
  articleId: string;
  imageUrl: string;
  caption: string;
}

export const useInstagramPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SocialMediaPostData) => {
      const session = await supabase.auth.getSession();
      const response = await fetch('/functions/v1/post-to-instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.data.session?.access_token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useTwitterPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SocialMediaPostData) => {
      const session = await supabase.auth.getSession();
      const response = await fetch('/functions/v1/post-to-twitter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.data.session?.access_token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useLinkedinPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SocialMediaPostData) => {
      const session = await supabase.auth.getSession();
      const response = await fetch('/functions/v1/post-to-linkedin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.data.session?.access_token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};
