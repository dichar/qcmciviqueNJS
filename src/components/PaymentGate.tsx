import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, CheckCircle, Star, X, Crown, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const STRIPE_LINKS = {
  essentiel: 'https://buy.stripe.com/eVq4gz8y40mm9Yu21If7i01',
  reussite: 'https://buy.stripe.com/3cI8wP9C8fhgdaGbCif7i02',
  premium: 'https://buy.stripe.com/5kQ9ATeWs1qqc6C8q6f7i03',
};

interface PaymentGateProps {
  onClose?: () => void;
  isClosable?: boolean;
  redirectOnClose?: string;
}

export const PaymentGate: React.FC<PaymentGateProps> = ({ 
  onClose, 
  isClosable = true,
  redirectOnClose = '/'
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

  const handlePayment = (pack: 'essentiel' | 'reussite' | 'premium') => {
    const baseUrl = STRIPE_LINKS[pack];
    // Ajouter le client_reference_id pour identifier l'utilisateur côté webhook
    const url = userId 
      ? `${baseUrl}?client_reference_id=${userId}`
      : baseUrl;
    window.location.href = url;
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    navigate(redirectOnClose);
  };

  const packs = [
    {
      id: 'essentiel' as const,
      name: 'Pack Essentiel',
      price: '12,99 €',
      duration: 'Accès 1 mois',
      icon: Zap,
      popular: false,
      features: [
        '3 QCM par niveau : CSP, CR, Naturalisation',
        'QCM de 40 questions en conditions réelles',
        'Historique des résultats + suivi de progression',
        'Accès aux Centres d\'Examen (liste et carte)',
      ],
    },
    {
      id: 'reussite' as const,
      name: 'Pack Réussite',
      price: '19,99 €',
      duration: 'Accès 3 mois',
      icon: Star,
      popular: true,
      features: [
        'Tout le Pack Essentiel',
        '3 QCM par niveau : CSP, CR, Naturalisation',
        'Badges de Progression + Courbe d\'évolution',
        'Livret du Citoyen Interactif',
        'Quiz Livret + correction en temps réel',
      ],
    },
    {
      id: 'premium' as const,
      name: 'Pack Premium Plus',
      price: '29,99 €',
      duration: 'Accès à vie',
      icon: Crown,
      popular: false,
      features: [
        'Tout le Pack Réussite',
        '3 QCM par niveau : CSP, CR, Naturalisation',
        'Questions d\'entretien (Livret du Citoyen)',
        'Quiz intelligent d\'éligibilité',
        'Mises à jour permanentes',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start md:items-center justify-center p-2 md:p-4 overflow-y-auto">
      <div className="w-full max-w-5xl animate-in fade-in-0 zoom-in-95 relative my-4 md:my-8">
        {isClosable && (
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 md:-top-2 md:-right-2 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors z-10"
            aria-label="Fermer"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        )}
        
        <div className="text-center mb-4 md:mb-8 pt-8 md:pt-0">
          <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-primary/10 rounded-full w-fit">
            <Lock className="h-6 w-6 md:h-8 md:w-8 text-primary" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">Essai gratuit terminé</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto px-2">
            Vous avez utilisé vos 2 quiz gratuits. Choisissez votre pack pour continuer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 px-1">
          {packs.map((pack) => {
            const Icon = pack.icon;
            return (
              <Card 
                key={pack.id}
                className={`relative flex flex-col shadow-elegant transition-transform hover:scale-[1.02] ${
                  pack.popular 
                    ? 'border-primary border-2 ring-2 ring-primary/20' 
                    : 'border-border/50'
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-0.5 md:px-4 md:py-1 rounded-full text-xs md:text-sm font-semibold flex items-center gap-1 whitespace-nowrap">
                    <Star className="h-3 w-3 md:h-4 md:w-4 fill-current" />
                    Le plus choisi
                  </div>
                )}
                
                <CardHeader className="text-center pb-2 pt-5 md:pt-6 px-3 md:px-6">
                  <div className={`mx-auto mb-2 md:mb-3 p-2 md:p-3 rounded-full w-fit ${
                    pack.popular ? 'bg-primary/20' : 'bg-secondary'
                  }`}>
                    <Icon className={`h-5 w-5 md:h-6 md:w-6 ${pack.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <CardTitle className="text-lg md:text-xl">{pack.name}</CardTitle>
                  <CardDescription className="text-xs md:text-sm">{pack.duration}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col px-3 md:px-6 pb-4 md:pb-6">
                  <div className="text-center mb-3 md:mb-4">
                    <p className={`text-2xl md:text-3xl font-bold ${pack.popular ? 'text-primary' : ''}`}>
                      {pack.price}
                    </p>
                  </div>
                  
                  <ul className="space-y-1.5 md:space-y-2 flex-1 mb-4 md:mb-6">
                    {pack.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-1.5 md:gap-2 text-xs md:text-sm">
                        <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handlePayment(pack.id)}
                    size="default"
                    className={`w-full text-sm md:text-base ${pack.popular ? '' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                    variant={pack.popular ? 'default' : 'secondary'}
                  >
                    Débloquer
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {isClosable && (
          <div className="text-center mt-4 md:mt-6">
            <Button 
              onClick={handleClose}
              variant="ghost"
              size="sm"
            >
              Plus tard
            </Button>
          </div>
        )}

        <p className="text-xs text-center text-muted-foreground mt-4 md:mt-6 pb-4">
          Paiement sécurisé par Stripe. Vous payez une seule fois, vous préparez votre examen sereinement, sans prélèvement récurrent.
        </p>
      </div>
    </div>
  );
};

export default PaymentGate;
