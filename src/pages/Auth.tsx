
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { testDatabaseAuth } from "@/components/admin/hooks/utils/authTester";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, signIn, signUp, refreshSession } = useAuth();

  // Redirect if already logged in
  if (user) {
    console.log('🔄 AUTH: User logged in, redirecting to admin...');
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log(`🚀 AUTH: Starting ${isLogin ? 'sign in' : 'sign up'} process...`);

    try {
      let result;
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        if (!fullName.trim()) {
          setError("Full name is required");
          setLoading(false);
          return;
        }
        result = await signUp(email, password, fullName);
      }

      if (result.error) {
        console.error(`❌ AUTH ERROR: ${isLogin ? 'Sign in' : 'Sign up'} failed:`, result.error);
        
        if (result.error.message.includes("User already registered")) {
          setError("An account with this email already exists. Please sign in instead.");
        } else if (result.error.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please check your credentials.");
        } else {
          setError(result.error.message);
        }
      } else {
        console.log(`✅ AUTH SUCCESS: ${isLogin ? 'Sign in' : 'Sign up'} completed`);
        
        if (!isLogin) {
          setError("Account created successfully! You can now sign in.");
          setIsLogin(true);
        } else {
          // Test database authentication after successful sign in
          setTimeout(async () => {
            await testDatabaseAuth();
          }, 1000);
        }
      }
    } catch (err) {
      console.error('❌ AUTH ERROR: Unexpected error:', err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTestAuth = async () => {
    console.log('🧪 AUTH: Testing authentication manually...');
    const result = await testDatabaseAuth();
    
    if (!result.hasSession) {
      console.log('🔄 AUTH: No session found, attempting refresh...');
      await refreshSession();
      setTimeout(() => testDatabaseAuth(), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-light text-center">
              {isLogin ? "Sign In" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin 
                ? "Enter your credentials to access the CMS" 
                : "Create your account to start managing content"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant={error.includes("successfully") ? "default" : "destructive"}>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setFullName("");
                }}
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>

            {/* Debug button - remove in production */}
            <div className="mt-4 text-center">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleTestAuth}
                className="text-xs"
              >
                Test Auth Debug
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
