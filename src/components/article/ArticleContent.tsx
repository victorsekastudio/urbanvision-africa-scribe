
import { useState, useEffect } from "react";
import { ExclusiveContentGate } from "./ExclusiveContentGate";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/types/database";

interface ArticleContentProps {
  content?: string;
  article?: Article;
}

export const ArticleContent = ({ content, article }: ArticleContentProps) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!content) {
    return (
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 italic">Full article content coming soon...</p>
      </div>
    );
  }

  // If article is exclusive and user is not logged in, show truncated content
  if (article?.exclusive && !user) {
    // Split content roughly in half
    const contentLength = content.length;
    const halfPoint = Math.floor(contentLength * 0.4); // Show about 40% of content
    
    // Find a good break point (end of sentence or paragraph)
    let breakPoint = halfPoint;
    for (let i = halfPoint; i < Math.min(halfPoint + 200, contentLength); i++) {
      if (content[i] === '.' && content[i + 1] === ' ') {
        breakPoint = i + 1;
        break;
      }
      if (content[i] === '</p>') {
        breakPoint = i + 4;
        break;
      }
    }

    const truncatedContent = content.substring(0, breakPoint);

    return (
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />
        <div className="mt-8">
          <ExclusiveContentGate />
        </div>
      </div>
    );
  }

  // Show full content for non-exclusive articles or logged-in users
  return (
    <div className="prose prose-lg max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
