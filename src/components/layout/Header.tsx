
import { Link } from "react-router-dom";
import { ExploreDropdown } from "./ExploreDropdown";
import { SubscribeModal } from "./SubscribeModal";
import { LanguageToggle } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";
import { AnimatedSearchBar } from "@/components/shared/AnimatedSearchBar";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/contexts/AuthContext";
import { translations } from "@/utils/translations";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export const Header = () => {
  const { currentLanguage } = useLanguage();
  const { user } = useAuth();
  const t = translations[currentLanguage];

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link 
            to="/" 
            className="text-2xl font-light tracking-wide text-gray-900 hover:text-gray-700 transition-colors duration-300"
          >
            UrbanVision
          </Link>
          
          {/* Desktop Navigation and Actions */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <ExploreDropdown />
              
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light"
              >
                {t.about}
              </Link>
              
              <Link 
                to="/contribute" 
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light"
              >
                {t.contribute}
              </Link>

              <Link 
                to="/studio-ai" 
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light"
              >
                UrbanVision AI Studio
              </Link>

              {user && (
                <Link 
                  to="/admin" 
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light"
                >
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              <SubscribeModal />
              <LanguageToggle />
              <AnimatedSearchBar />
              {!user && (
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center space-x-2">
            <AnimatedSearchBar />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
