
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Shield, AlertTriangle } from "lucide-react";
import { isAdminSubdomain, redirectToMainDomain } from "@/utils/subdomainUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, isCheckingAdmin, profile } = useAdminAuth();

  console.log('🛡️ ADMIN ROUTE: Security check', {
    user: !!user,
    isAdmin,
    isCheckingAdmin,
    authLoading,
    isAdminSubdomain: isAdminSubdomain(),
    profile: profile?.role
  });

  // Show loading while checking authentication
  if (authLoading || isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 font-light">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Check if user is not authenticated
  if (!user) {
    console.log('🚫 ADMIN ROUTE: No user, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  // Check if user is not admin
  if (!isAdmin) {
    console.log('🚫 ADMIN ROUTE: User not admin, showing access denied');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-xl font-light text-gray-900">Access Denied</CardTitle>
            <CardDescription>
              You don't have admin privileges to access this area.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Current role: <span className="font-medium">{profile?.role || 'Unknown'}</span>
            </p>
            <p className="text-sm text-gray-600">
              Contact your administrator if you believe this is an error.
            </p>
            <Button 
              onClick={redirectToMainDomain}
              className="w-full"
              variant="outline"
            >
              Return to Main Site
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin access granted
  console.log('✅ ADMIN ROUTE: Admin access granted');
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Admin Panel</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span>Logged in as: {user.email}</span>
            <span className="bg-indigo-500 px-2 py-1 rounded text-xs">
              {profile?.role?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
