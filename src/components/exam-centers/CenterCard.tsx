import { MapPin, Phone, ClipboardList } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExamCenter } from './types';

interface CenterCardProps {
  center: ExamCenter;
  onSelect: (center: ExamCenter) => void;
  distanceKm?: number | null;
}

const CenterCard = ({ center, onSelect, distanceKm }: CenterCardProps) => {
  // Extract city from address (last part before postal code usually)
  const getCity = (address: string) => {
    const parts = address.split(',');
    if (parts.length >= 2) {
      return parts[parts.length - 1].trim();
    }
    return address;
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow border-border hover:border-primary/30 group">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {center.nom}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 flex items-start gap-1">
            <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-primary" />
            <span>{center.adresse}</span>
          </p>
        </div>

        {/* City badge */}
        <div className="mb-3 flex items-center gap-2 flex-wrap">
          <span className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">
            {getCity(center.adresse)}
          </span>
          {distanceKm !== null && distanceKm !== undefined && (
            <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
              ~{distanceKm.toFixed(1)} km
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={() => onSelect(center)}
          >
            <MapPin className="w-3 h-3 mr-1" />
            Voir sur la carte
          </Button>
          <div className="flex gap-2">
            <a
              href={center.url_contact}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full text-xs">
                <Phone className="w-3 h-3 mr-1" />
                Contacter
              </Button>
            </a>
            <a
              href={center.url_inscription}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button size="sm" className="w-full text-xs bg-primary hover:bg-primary/90">
                <ClipboardList className="w-3 h-3 mr-1" />
                S'inscrire
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CenterCard;
