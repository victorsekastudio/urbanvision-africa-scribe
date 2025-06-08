
import { useToast } from "@/hooks/use-toast";
import type { SubmissionNotificationOptions } from "../../types/SubmissionTypes";

export const useSubmissionNotifications = () => {
  const { toast } = useToast();

  const showSuccessNotification = (options: SubmissionNotificationOptions) => {
    if (!options.showToast) return;

    const message = options.isUpdate ? 'Article updated successfully!' : 'Article created successfully!';
    
    console.log('🎉 DEBUG: Showing success toast:', message);
    
    toast({
      title: "Success",
      description: message,
    });
  };

  const showErrorNotification = (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    console.log('💥 DEBUG: Showing error toast:', errorMessage);
    
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  };

  const showSocialMediaWarning = () => {
    toast({
      title: "Warning",
      description: "Article saved successfully, but social media posting failed. You can retry from the admin panel.",
      variant: "destructive",
    });
  };

  return {
    showSuccessNotification,
    showErrorNotification,
    showSocialMediaWarning,
  };
};
