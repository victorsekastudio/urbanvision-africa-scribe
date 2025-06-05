
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LanguageToggleProps {
  currentLanguage: 'EN' | 'FR';
  onLanguageChange: (language: 'EN' | 'FR') => void;
}

export const LanguageToggle = ({ currentLanguage, onLanguageChange }: LanguageToggleProps) => {
  return (
    <div className="flex items-center space-x-4 pb-4 border-b">
      <Label className="text-sm font-medium">Editing Language:</Label>
      <div className="flex space-x-2">
        <Button
          type="button"
          variant={currentLanguage === 'EN' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onLanguageChange('EN')}
        >
          English
        </Button>
        <Button
          type="button"
          variant={currentLanguage === 'FR' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onLanguageChange('FR')}
        >
          Français
        </Button>
      </div>
    </div>
  );
};
