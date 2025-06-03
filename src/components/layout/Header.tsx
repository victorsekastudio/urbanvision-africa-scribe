
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="text-2xl font-light tracking-wide text-gray-900">
            UrbanVision
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/urban-trends" className="text-gray-700 hover:text-gray-900 transition-colors font-light">
              Urban Trends
            </Link>
            <Link to="/infrastructure" className="text-gray-700 hover:text-gray-900 transition-colors font-light">
              Infrastructure
            </Link>
            <Link to="/climate" className="text-gray-700 hover:text-gray-900 transition-colors font-light">
              Climate
            </Link>
            <Link to="/mobility" className="text-gray-700 hover:text-gray-900 transition-colors font-light">
              Mobility
            </Link>
            <Link to="/smart-cities" className="text-gray-700 hover:text-gray-900 transition-colors font-light">
              Smart Cities
            </Link>
            <Link to="/voices" className="text-gray-700 hover:text-gray-900 transition-colors font-light">
              Voices
            </Link>
            <Link to="/admin" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
