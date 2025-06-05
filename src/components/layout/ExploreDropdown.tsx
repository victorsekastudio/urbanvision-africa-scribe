
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

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

export const ExploreDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light outline-none">
        <span>{t.explore}</span>
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
              {t[category.nameKey]}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
