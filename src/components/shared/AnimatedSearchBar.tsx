
import { useState, useRef, useEffect } from "react";
import { Search, X, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface AnimatedSearchBarProps {
  className?: string;
}

export const AnimatedSearchBar = ({ className }: AnimatedSearchBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data: suggestions } = useQuery({
    queryKey: ['search-suggestions', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim() || searchTerm.length < 2) return [];
      
      const { data, error } = await supabase
        .from('articles')
        .select('title, slug')
        .eq('published', true)
        .ilike('title', `%${searchTerm}%`)
        .limit(5);

      if (error) throw error;
      return data;
    },
    enabled: searchTerm.length >= 2,
  });

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      handleCollapse();
    }
  };

  const handleSuggestionClick = (slug: string) => {
    navigate(`/article/${slug}`);
    handleCollapse();
  };

  useEffect(() => {
    setShowSuggestions(searchTerm.length >= 2 && suggestions && suggestions.length > 0);
  }, [searchTerm, suggestions]);

  return (
    <div className={`relative ${className}`}>
      <div className={`flex items-center transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-80' : 'w-10'
      }`}>
        {!isExpanded ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExpand}
            className="w-10 h-10 text-gray-700 hover:text-gray-900"
          >
            <Search className="w-5 h-5" />
          </Button>
        ) : (
          <form onSubmit={handleSearch} className="flex items-center w-full">
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-20 animate-fade-in"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  disabled={!searchTerm.trim()}
                >
                  <Search className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleCollapse}
                  className="w-8 h-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="p-2 border-b border-gray-100">
            <p className="text-xs text-gray-500 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              Recent searches
            </p>
          </div>
          {suggestions?.map((suggestion) => (
            <button
              key={suggestion.slug}
              onClick={() => handleSuggestionClick(suggestion.slug)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <p className="text-sm text-gray-900 truncate">{suggestion.title}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
