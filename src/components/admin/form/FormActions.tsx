
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isLoading: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

export const FormActions = ({ isLoading, isEditing, onCancel }: FormActionsProps) => {
  const handleCreateClick = (e: React.MouseEvent) => {
    console.log('Create/Update button clicked');
    console.log('Button type:', (e.currentTarget as HTMLButtonElement).type);
    console.log('Is loading:', isLoading);
    
    // Don't prevent default - let the form submission happen naturally
  };

  return (
    <div className="flex justify-end space-x-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isLoading}
        onClick={handleCreateClick}
      >
        {isLoading ? 'Saving...' : (isEditing ? 'Update' : 'Create')} Article
      </Button>
    </div>
  );
};
