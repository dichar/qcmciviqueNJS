import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/i18n/translations';

type Language = 'fr' | 'en' | 'ar' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Get initial language for SSR/SSG (no localStorage access)
const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('language');
    if (saved && ['fr', 'en', 'ar', 'es'].includes(saved)) {
      return saved as Language;
    }
  }
  return 'fr';
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [isClient, setIsClient] = useState(false);

  // Hydration fix - sync with localStorage after mount
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('language');
    if (saved && ['fr', 'en', 'ar', 'es'].includes(saved)) {
      setLanguageState(saved as Language);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language, isClient]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  };

  // Translation function with fallback to French, then key
  const t = (key: string): string => {
    const currentTranslations = translations[language] || translations.fr;
    const frTranslations = translations.fr;
    
    // Try current language first
    if (currentTranslations[key]) {
      return currentTranslations[key];
    }
    
    // Fallback to French
    if (frTranslations[key]) {
      return frTranslations[key];
    }
    
    // Return key without prefix if it looks like a translation key
    // This prevents showing raw keys to users
    if (key.includes('.')) {
      const parts = key.split('.');
      return parts[parts.length - 1].replace(/_/g, ' ');
    }
    
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
