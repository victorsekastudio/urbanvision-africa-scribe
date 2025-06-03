
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const LanguageToggle = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  const languages = [
    { code: "EN" as const, name: "English" },
    { code: "FR" as const, name: "Français" },
  ];

  const handleLanguageChange = (languageCode: "EN" | "FR") => {
    setLanguage(languageCode);
    console.log("Switching to language:", languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light outline-none">
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage}</span>
        <ChevronDown className="w-3 h-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-32 bg-white border border-gray-100 shadow-lg rounded-md mt-2"
        align="end"
        sideOffset={8}
      >
        {languages.map((language) => (
          <DropdownMenuItem 
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 font-light cursor-pointer"
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
