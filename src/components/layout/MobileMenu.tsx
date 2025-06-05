
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SubscribeModal } from "./SubscribeModal";
import { LanguageToggle } from "./LanguageToggle";
import { SearchButton } from "./SearchButton";

const categories = [
  { name: "Urban Trends & Growth", path: "/category/urban-trends-growth" },
  { name: "Infrastructure Gaps & Investment", path: "/category/infrastructure-investment" },
  { name: "Climate Resilience & Sustainability", path: "/category/climate-sustainability" },
  { name: "Transport & Mobility", path: "/category/transport-mobility" },
  { name: "Smart Cities & Tech", path: "/category/smart-city-tech" },
  { name: "Voices from the Ground", path: "/category/voices-ground" },
];

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            Navigation
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-light text-sm text-gray-500 uppercase tracking-wide mb-3">
              Explore
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Main Navigation */}
          <div>
            <h3 className="font-light text-sm text-gray-500 uppercase tracking-wide mb-3">
              Pages
            </h3>
            <div className="space-y-2">
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light"
              >
                About
              </Link>
              <Link
                to="/contribute"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light"
              >
                Contribute
              </Link>
              <Link
                to="/studio-ai"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light"
              >
                Urban Vision Studio AI
              </Link>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-gray-100">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-light text-sm text-gray-500">Search</span>
                <SearchButton />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-light text-sm text-gray-500">Language</span>
                <LanguageToggle />
              </div>
              
              <div className="pt-2">
                <SubscribeModal />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
