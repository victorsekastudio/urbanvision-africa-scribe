
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminHeaderProps {
  userEmail: string | undefined;
  onSignOut: () => void;
}

export const AdminHeader = ({ userEmail, onSignOut }: AdminHeaderProps) => {
  const { toast } = useToast();

  const handleAccountClick = () => {
    toast({
      title: "Account Settings",
      description: "Account settings will be available when authentication is enabled.",
    });
  };

  return (
    <div className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-light text-gray-900 mb-2">Content Management</h1>
        <p className="text-gray-600">Manage your articles, categories, authors, and events</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>Welcome, {userEmail || 'Admin'}</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleAccountClick}>
          <Settings className="w-4 h-4 mr-2" />
          Account
        </Button>
        <Button variant="outline" size="sm" onClick={onSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
