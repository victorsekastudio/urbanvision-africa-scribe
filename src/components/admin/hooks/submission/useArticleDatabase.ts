
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/types/database";
import type { ArticleFormData } from "../../types/ArticleFormTypes";
import type { DatabaseOperationResult } from "../../types/SubmissionTypes";
import { prepareArticleData } from "../utils/articleDataPreparer";

export const useArticleDatabase = () => {
  const createArticle = async (data: ArticleFormData): Promise<DatabaseOperationResult> => {
    console.log('➕ DEBUG: Executing article creation...');
    
    const articleData = prepareArticleData(data);
    console.log('🔧 DEBUG: Prepared article data for creation:', articleData);

    const result = await supabase
      .from('articles')
      .insert(articleData)
      .select()
      .single();

    console.log('💾 DEBUG: Create operation result:', result);
    return result;
  };

  const updateArticle = async (article: Article, data: ArticleFormData): Promise<DatabaseOperationResult> => {
    console.log('✏️ DEBUG: Executing article update...');
    
    const articleData = prepareArticleData(data, article);
    console.log('🔧 DEBUG: Prepared article data for update:', articleData);

    const result = await supabase
      .from('articles')
      .update(articleData)
      .eq('id', article.id)
      .select()
      .single();

    console.log('💾 DEBUG: Update operation result:', result);
    return result;
  };

  return {
    createArticle,
    updateArticle,
  };
};
