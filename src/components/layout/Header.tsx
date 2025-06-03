
import { Link } from "react-router-dom";
import { ExploreDropdown } from "./ExploreDropdown";
import { SearchButton } from "./SearchButton";
import { SubscribeModal } from "./SubscribeModal";
import { LanguageToggle } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
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
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <ExploreDropdown />
            
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light"
            >
              About
            </Link>
            
            <Link 
              to="/contribute" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light"
            >
              Contribute
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <SubscribeModal />
            <LanguageToggle />
            <SearchButton />
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center space-x-2">
            <SearchButton />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
