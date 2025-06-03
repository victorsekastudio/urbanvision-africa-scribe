
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export const SearchButton = () => {
  return (
    <Link 
      to="/search"
      className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors font-light"
    >
      <Search className="w-5 h-5" />
      <span className="hidden sm:inline">Search</span>
    </Link>
  );
};
