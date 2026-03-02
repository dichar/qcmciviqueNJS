import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const COOKIE_CONSENT_KEY = "cookie_consent";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent === null) {
      // Small delay to avoid flash on page load
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setShowBanner(false);
  };

  const handleRefuse = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "false");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Nous utilisons des cookies pour assurer le bon fonctionnement du site et mesurer l'audience.{" "}
            <Link to="/confidentialite" className="text-primary hover:underline">
              En savoir plus
            </Link>
          </p>
          <div className="flex gap-3 shrink-0">
            <Button variant="outline" size="sm" onClick={handleRefuse}>
              Continuer sans accepter
            </Button>
            <Button size="sm" onClick={handleAccept}>
              Accepter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
