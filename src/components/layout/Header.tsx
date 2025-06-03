
import { Link } from "react-router-dom";
import { ExploreDropdown } from "./ExploreDropdown";
import { SearchButton } from "./SearchButton";

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
          
          <nav className="hidden md:flex items-center space-x-8">
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
            
            <SearchButton />
          </nav>

          {/* Mobile menu button - simplified for now */}
          <div className="md:hidden">
            <SearchButton />
          </div>
        </div>
      </div>
    </header>
  );
};
