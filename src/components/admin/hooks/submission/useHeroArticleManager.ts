
import { supabase } from "@/integrations/supabase/client";

export const useHeroArticleManager = () => {
  const handleHeroArticlePinning = async (articleId: string, shouldPin: boolean) => {
    console.log('🎯 DEBUG: Hero article pinning requested:', { articleId, shouldPin });
    
    if (!shouldPin) {
      console.log('🎯 DEBUG: Not pinning as hero, skipping...');
      return;
    }

    if (!articleId) {
      console.error('❌ DEBUG: No article ID provided for hero pinning');
      throw new Error('Article ID is required for hero pinning');
    }

    console.log('🎯 DEBUG: Article marked as hero, unpinning others...');
    const { error: unpinError } = await supabase
      .from('articles')
      .update({ pin_as_hero: false })
      .neq('id', articleId);
    
    if (unpinError) {
      console.error('❌ DEBUG: Error unpinning hero articles:', unpinError);
      throw unpinError;
    }
    
    console.log('✅ DEBUG: Successfully unpinned other hero articles');

    // Now pin the current article as hero
    console.log('🎯 DEBUG: Pinning current article as hero...');
    const { error: pinError } = await supabase
      .from('articles')
      .update({ pin_as_hero: true })
      .eq('id', articleId);

    if (pinError) {
      console.error('❌ DEBUG: Error pinning article as hero:', pinError);
      throw pinError;
    }

    console.log('✅ DEBUG: Successfully pinned article as hero');
  };

  return {
    handleHeroArticlePinning,
  };
};
