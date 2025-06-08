
export interface SubmissionState {
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

export interface HeroArticleManagerOptions {
  shouldPin: boolean;
  currentArticleId?: string;
}

export interface DatabaseOperationResult {
  data: any;
  error: any;
}

export interface SubmissionNotificationOptions {
  isUpdate: boolean;
  showToast: boolean;
}
