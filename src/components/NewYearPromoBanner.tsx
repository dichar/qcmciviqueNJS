import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, X } from "lucide-react";

// Promo active for 24 hours from this timestamp
const PROMO_START = new Date("2025-12-31T00:00:00");
const PROMO_END = new Date(PROMO_START.getTime() + 24 * 60 * 60 * 1000); // 24 hours later

export const NewYearPromoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const now = new Date();
    const dismissed = sessionStorage.getItem("promo-dismissed-2026");
    
    if (now >= PROMO_START && now <= PROMO_END && !dismissed) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("promo-dismissed-2026", "true");
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="relative z-40 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-2.5 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-center gap-2 text-center">
        <Sparkles className="w-4 h-4 flex-shrink-0 animate-pulse" aria-hidden="true" />
        <p className="text-sm md:text-base font-medium">
          <span className="hidden sm:inline">🎉 </span>
          <strong>Spécial Nouvelle Année :</strong>{" "}
          <span className="font-bold">-50%</span> sur tout le site pendant 24h !
          <Link 
            to="/packs" 
            className="ml-2 underline underline-offset-2 hover:no-underline font-semibold"
          >
            En profiter →
          </Link>
        </p>
        <Sparkles className="w-4 h-4 flex-shrink-0 animate-pulse hidden sm:block" aria-hidden="true" />
        
        <button
          onClick={handleDismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Fermer la bannière"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
