import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Settings } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SubscribeModal } from "./SubscribeModal";
import { LanguageToggle } from "./LanguageToggle";
import { SearchButton } from "./SearchButton";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/contexts/AuthContext";
import { translations } from "@/utils/translations";
import { redirectToAdminDomain } from "@/utils/subdomainUtils";

const categories = [
  { 
    nameKey: "urbanTrendsGrowth" as const, 
    path: "/category/urban-trends-growth" 
  },
  { 
    nameKey: "infrastructureInvestment" as const, 
    path: "/category/infrastructure-investment" 
  },
  { 
    nameKey: "climateSustainability" as const, 
    path: "/category/climate-sustainability" 
  },
  { 
    nameKey: "transportMobility" as const, 
    path: "/category/transport-mobility" 
  },
  { 
    nameKey: "smartCityTech" as const, 
    path: "/category/smart-city-tech" 
  },
  { 
    nameKey: "voicesGround" as const, 
    path: "/category/voices-ground" 
  },
];

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage } = useLanguage();
  const { user } = useAuth();
  const t = translations[currentLanguage];

  // Utility to go to admin subdomain (works client-side)
  function goToAdminSubdomain(e?: React.MouseEvent) {
    e?.preventDefault?.();
    redirectToAdminDomain();
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 text-gray-700 hover:text-gray-900 transition-colors duration-300">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-white">
        <SheetHeader>
          <SheetTitle className="text-left font-light text-xl text-gray-900">
            {t.navigation}
          </SheetTitle>
        </SheetHeader>
        {/* Moved Search and Language to Top */}
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-light text-sm text-gray-500">{t.search}</span>
            <SearchButton />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-light text-sm text-gray-500">{t.language}</span>
            <LanguageToggle />
          </div>
        </div>
        <div className="mt-8 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-light text-sm text-gray-500 uppercase tracking-wide mb-3">
              {t.explore}
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light"
                >
                  {t[category.nameKey]}
                </Link>
              ))}
            </div>
          </div>
          {/* Main Navigation */}
          <div>
            <h3 className="font-light text-sm text-gray-500 uppercase tracking-wide mb-3">
              {t.pages}
            </h3>
            <div className="space-y-2">
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light"
              >
                {t.about}
              </Link>
              <Link
                to="/contribute"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light"
              >
                {t.contribute}
              </Link>
              <Link
                to="/studio-ai"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light"
              >
                UrbanVision AI Studio
              </Link>
              {user && (
                <a
                  href="#"
                  onClick={goToAdminSubdomain}
                  className="block py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light"
                  tabIndex={0}
                  role="button"
                  aria-label="Admin Panel"
                >
                  <div className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Panel
                  </div>
                </a>
              )}
            </div>
          </div>
          {/* Actions: now only Subscribe and Sign In */}
          <div className="pt-6 border-t border-gray-100">
            <div className="space-y-4">
              <div className="pt-2">
                <SubscribeModal />
              </div>
              {!user && (
                <div className="pt-2">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
