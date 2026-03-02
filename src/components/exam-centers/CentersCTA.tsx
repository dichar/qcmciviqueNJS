import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight } from "lucide-react";

/**
 * CTA Banner for Exam Centers page
 * Sticky banner to drive conversions to pricing page
 * Uses accent colors for high visibility
 */
const CentersCTA = () => {
  return (
    <div className="sticky top-16 z-40 bg-accent shadow-lg border-b border-accent-foreground/10">
      <div className="container max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-accent-foreground">
            <Trophy className="w-6 h-6 flex-shrink-0" />
            <p className="text-sm sm:text-base font-semibold text-center sm:text-left">
              <span className="hidden sm:inline">Vous avez trouvé votre centre ? </span>
              <span className="font-bold">Mettez toutes les chances de votre côté</span> avec le Pack Réussite.
            </p>
          </div>
          <Link to="/packs" className="flex-shrink-0">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 shadow-md"
            >
              Voir les offres
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CentersCTA;
