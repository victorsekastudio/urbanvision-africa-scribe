
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  isLoading: boolean;
  isEditing: boolean;
  onCancel: () => void;
  hasUnsavedChanges?: boolean;
}

export const FormActions = ({ isLoading, isEditing, onCancel, hasUnsavedChanges }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4 pt-6 border-t">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isLoading}
        className="min-w-[120px]"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {isEditing ? 'Updating...' : 'Creating...'}
          </>
        ) : (
          <>
            {isEditing ? 'Update' : 'Create'} Article
          </>
        )}
      </Button>
    </div>
  );
};
