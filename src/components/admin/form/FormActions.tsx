
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isLoading: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

export const FormActions = ({ isLoading, isEditing, onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : (isEditing ? 'Update' : 'Create')} Article
      </Button>
    </div>
  );
};
