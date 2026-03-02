import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QUIZ_DISPLAY } from '@/constants/quiz';

const BANNER_STORAGE_KEY = 'announcement_banner_dismissed';
const BANNER_EXPIRY_DATE = new Date('2025-12-14T23:59:59Z'); // 48h from Dec 12, 2025

export const AnnouncementBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const now = new Date();
    const dismissed = localStorage.getItem(BANNER_STORAGE_KEY);
    
    // Show banner if not dismissed and not expired
    if (!dismissed && now < BANNER_EXPIRY_DATE) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(BANNER_STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground py-3 px-4 relative animate-pulse">
      <div className="container mx-auto flex items-center justify-center gap-3 text-center">
        <Sparkles className="w-5 h-5 flex-shrink-0 animate-bounce" />
        <p className="text-sm md:text-base font-medium">
          🎉 <strong>Nouveau !</strong> {QUIZ_DISPLAY.TOTAL_QUESTIONS_TEXT} disponibles pour une préparation optimale à l'examen civique 2026 !
        </p>
        <Sparkles className="w-5 h-5 flex-shrink-0 animate-bounce hidden sm:block" />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/20 p-1 h-auto"
          aria-label="Fermer l'annonce"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
