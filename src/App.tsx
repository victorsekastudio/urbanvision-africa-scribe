
import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Category from "./pages/Category";
import Article from "./pages/Article";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Search from "./pages/Search";
import AllArticles from "./pages/AllArticles";
import About from "./pages/About";
import Contribute from "./pages/Contribute";
import Events from "./pages/Events";
import Tags from "./pages/Tags";
import StudioAI from "./pages/StudioAI";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  console.log('App: Rendering...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/category/:category" element={<Category />} />
                <Route path="/article/:slug" element={<Article />} />
                <Route path="/tag/:tagName" element={<Tags />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/search" element={<Search />} />
                <Route path="/articles" element={<AllArticles />} />
                <Route path="/about" element={<About />} />
                <Route path="/contribute" element={<Contribute />} />
                <Route path="/events" element={<Events />} />
                <Route path="/studio-ai" element={<StudioAI />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
