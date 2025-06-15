
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, UserPlus } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

interface ExclusiveContentGateProps {
  className?: string;
}

export const ExclusiveContentGate = ({ className = "" }: ExclusiveContentGateProps) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  return (
    <div className={`relative ${className}`}>
      {/* Content gate */}
      <div className="relative bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-gray-600" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {t.articles.exclusiveContent}
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {t.articles.signInToRead}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/auth">
            <Button className="w-full sm:w-auto">
              {t.articles.signIn}
            </Button>
          </Link>
          
          <Link to="/auth">
            <Button variant="outline" className="w-full sm:w-auto">
              <UserPlus className="w-4 h-4 mr-2" />
              {t.articles.createAccount}
            </Button>
          </Link>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          {t.articles.freeAndQuick}
        </p>
      </div>
    </div>
  );
};
