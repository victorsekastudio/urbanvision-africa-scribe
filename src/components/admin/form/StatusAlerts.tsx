
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Clock, Wifi, WifiOff } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import type { SubmitError } from "../hooks/useArticleFormSubmit";

interface StatusAlertsProps {
  hasUnsavedChanges: boolean;
  isAutoSaving: boolean;
  retryCount: number;
  isValidatingSlug: boolean;
  slugError: string | null;
  isSlugAvailable: boolean;
  slugSuggestions: string[];
  submitError: string | null;
  submitSuccess: string | null;
  lastError: SubmitError | null;
  lastFormData: any;
  retrySubmit: (data: any) => Promise<void>;
  onSlugSuggestionClick: (suggestion: string) => void;
}

export const StatusAlerts = ({
  hasUnsavedChanges,
  isAutoSaving,
  retryCount,
  isValidatingSlug,
  slugError,
  isSlugAvailable,
  slugSuggestions,
  submitError,
  submitSuccess,
  onSlugSuggestionClick,
}: StatusAlertsProps) => {
  return (
    <div className="space-y-4">
      {/* Enhanced status indicators */}
      {hasUnsavedChanges && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            You have unsaved changes. They will be lost if you leave without saving.
          </AlertDescription>
        </Alert>
      )}

      {isAutoSaving && (
        <Alert>
          <Wifi className="h-4 w-4" />
          <AlertDescription>Auto-saving your changes...</AlertDescription>
        </Alert>
      )}

      {retryCount > 0 && (
        <Alert variant="destructive">
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            Connection issues detected. Retry attempt #{retryCount}
          </AlertDescription>
        </Alert>
      )}

      {/* Slug validation feedback */}
      {(isValidatingSlug || slugError || !isSlugAvailable) && (
        <Alert variant={slugError || !isSlugAvailable ? "destructive" : "default"}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {isValidatingSlug && "Checking slug availability..."}
            {slugError && slugError}
            {!isSlugAvailable && slugSuggestions.length > 0 && (
              <div className="mt-2">
                <p>Suggested alternatives:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {slugSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => onSlugSuggestionClick(suggestion)}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {submitError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
      
      {submitSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{submitSuccess}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
