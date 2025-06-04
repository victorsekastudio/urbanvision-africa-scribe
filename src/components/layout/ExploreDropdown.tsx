
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  { name: "Urban Trends & Growth", path: "/category/urban-trends-growth" },
  { name: "Infrastructure Gaps & Investment", path: "/category/infrastructure-investment" },
  { name: "Climate Resilience & Sustainability", path: "/category/climate-sustainability" },
  { name: "Transport & Mobility", path: "/category/transport-mobility" },
  { name: "Smart Cities & Tech", path: "/category/smart-city-tech" },
  { name: "Voices from the Ground", path: "/category/voices-ground" },
];

export const ExploreDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light outline-none">
        <span>Explore</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 bg-white border border-gray-100 shadow-lg rounded-md mt-2"
        align="start"
        sideOffset={8}
      >
        {categories.map((category) => (
          <DropdownMenuItem key={category.path} asChild>
            <Link
              to={category.path}
              className="block w-full px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 font-light"
            >
              {category.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
