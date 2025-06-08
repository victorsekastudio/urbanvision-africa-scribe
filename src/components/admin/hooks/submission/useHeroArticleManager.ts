
import { supabase } from "@/integrations/supabase/client";
import type { HeroArticleManagerOptions } from "../../types/SubmissionTypes";

export const useHeroArticleManager = () => {
  const handleHeroArticlePinning = async (options: HeroArticleManagerOptions) => {
    console.log('🎯 DEBUG: Hero article pinning requested:', options);
    
    if (!options.shouldPin) {
      console.log('🎯 DEBUG: Not pinning as hero, skipping...');
      return;
    }

    console.log('🎯 DEBUG: Article marked as hero, unpinning others...');
    const { error: unpinError } = await supabase
      .from('articles')
      .update({ pin_as_hero: false })
      .neq('id', options.currentArticleId || '');
    
    if (unpinError) {
      console.error('❌ DEBUG: Error unpinning hero articles:', unpinError);
      throw unpinError;
    }
    
    console.log('✅ DEBUG: Successfully unpinned other hero articles');
  };

  return {
    handleHeroArticlePinning,
  };
};
