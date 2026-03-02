import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, ArrowRight, Shield, Users } from "lucide-react";
import { usePurchaseStatus } from "@/hooks/usePurchaseStatus";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

// Avatar stack images (diverse avatars)
const AVATAR_IMAGES = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=5",
  "https://i.pravatar.cc/40?img=8",
  "https://i.pravatar.cc/40?img=12",
  "https://i.pravatar.cc/40?img=16",
];

/**
 * Enhanced CTA Banner for Exam Centers page with Social Proof
 * - Stacked avatars visual
 * - Dynamic CTA based on auth/purchase status
 * - Urgency messaging with decree reference
 */
const CentersCTASocialProof = () => {
  const { hasFullAccess, loading } = usePurchaseStatus();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCTAClick = () => {
    if (!isAuthenticated) {
      // Not logged in → go to packs page
      navigate("/packs");
    } else if (!hasFullAccess) {
      // Logged in but no purchase → direct checkout for Pack Réussite
      navigate("/packs#reussite");
    } else {
      // Has access → go to quiz
      navigate("/qcm-citoyennete-francaise");
    }
  };

  const getButtonText = () => {
    if (loading) return "Chargement...";
    if (!isAuthenticated) return "Découvrir nos offres";
    if (!hasFullAccess) return "Obtenir le Pack Réussite";
    return "Commencer le QCM";
  };

  return (
    <div className="sticky top-16 z-40 bg-gradient-to-r from-primary to-primary/90 shadow-lg border-b border-primary-foreground/10">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left: Social Proof with Avatars */}
          <div className="flex items-center gap-4">
            {/* Stacked Avatars */}
            <div className="flex -space-x-3">
              {AVATAR_IMAGES.map((src, index) => (
                <Avatar key={index} className="w-9 h-9 border-2 border-primary-foreground ring-2 ring-primary">
                  <AvatarImage src={src} alt={`Utilisateur ${index + 1}`} />
                  <AvatarFallback className="bg-primary-foreground text-primary text-xs font-bold">
                    {String.fromCharCode(65 + index)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {/* +More indicator */}
              <div className="w-9 h-9 rounded-full bg-primary-foreground text-primary flex items-center justify-center text-xs font-bold border-2 border-primary-foreground ring-2 ring-primary">
                +15K
              </div>
            </div>

            {/* Text Content */}
            <div className="text-primary-foreground">
              <p className="text-xs sm:text-sm md:text-base font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 hidden sm:block" />
                <span className="hidden md:inline">Centre trouvé ?</span>
                <span>
                  Rejoignez <strong>20 000+</strong> utilisateurs
                </span>
              </p>
              <p className="text-[11px] md:text-sm text-primary-foreground/80 flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span className="hidden sm:inline">40 000+ quiz réalisés • Ne laissez pas votre naturalisation au hasard !</span>
                <span className="sm:hidden">40 000+ quiz réalisés</span>
              </p>
            </div>
          </div>

          {/* Right: CTA Button + Micro-copy */}
          <div className="flex flex-col items-center lg:items-end gap-1">
            <Button
              size="lg"
              onClick={handleCTAClick}
              disabled={loading}
              className="bg-accent hover:bg-accent-hover text-accent-foreground font-bold gap-2 shadow-strong px-6"
            >
              {getButtonText()}
              <ArrowRight className="w-4 h-4" />
            </Button>
            {/* Reassurance Micro-copy */}
            <p className="text-xs text-primary-foreground/70 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Conforme au décret 2025-1345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentersCTASocialProof;
