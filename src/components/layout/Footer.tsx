
import { Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-light text-gray-900 mb-2">UrbanVision</h3>
            <p className="text-gray-600 font-serif">
              Insights on African Urban Development
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://instagram.com/urbanvision" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>Follow us on Instagram</span>
            </a>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>&copy; 2024 UrbanVision. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
