import { Search, X, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultsCount: number;
  totalCount: number;
  quickFilters?: string[];
  onQuickFilter?: (value: string) => void;
}

const SearchBar = ({ value, onChange, resultsCount, totalCount, quickFilters = [], onQuickFilter }: SearchBarProps) => {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Ville, code postal, département ou nom du centre..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-10 h-11 text-sm md:text-base"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9"
            onClick={() => onChange('')}
            aria-label="Effacer la recherche"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {quickFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3" />
            Suggestions:
          </div>
          {quickFilters.map((city) => (
            <Button
              key={city}
              variant={value.toLowerCase() === city.toLowerCase() ? "default" : "secondary"}
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={() => onQuickFilter?.(city)}
            >
              {city}
            </Button>
          ))}
          {value && (
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => onChange('')}>
              Réinitialiser
            </Button>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="secondary" className="text-xs">
          {resultsCount} / {totalCount}
        </Badge>
        {value ? (
          <span>centres trouvés</span>
        ) : (
          <span>centres agréés en France</span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
