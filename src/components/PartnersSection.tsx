import React from "react";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import xendwiseLogo from "@/assets/partners/xendwise-logo.png";

const PartnersSection = () => {
  const { toast } = useToast();

  const handlePlaceholderClick = () => {
    toast({
      title: "Devenez partenaire",
      description: (
        <div className="space-y-2">
          <p>
            Vous souhaitez devenir partenaire ? Contactez-nous pour figurer sur notre plateforme et aider la communauté.
          </p>
          <a href="/contact" className="inline-block text-primary underline hover:text-primary/80 font-medium">
            Nous contacter →
          </a>
        </div>
      ),
      duration: 8000,
    });
  };

  return (
    <section aria-label="Partenaires" className="container mx-auto px-4 py-12 md:py-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Ils nous font confiance</h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-12">
          Nos partenaires engagés pour accompagner votre intégration
        </p>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {/* Xendwise - Active Partner */}
          <a
            href="https://www.xendwise.com/?source=qcmcivique"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block"
          >
            <Card className="p-6 hover:shadow-strong transition-all duration-300 hover:scale-105 border-2 hover:border-primary h-full bg-card">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-full max-w-[180px] h-16 flex items-center justify-center">
                  <img
                    src={xendwiseLogo}
                    alt="Xendwise - Comparateur transferts d'argent"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Xendwise</span> : Le comparateur n°1 pour vos
                  transferts d'argent internationaux au meilleur prix.
                </p>
              </div>
            </Card>
          </a>

          {/* Placeholder Partner 1 - ShieldCheck */}
          <Card
            className="p-6 border-2 border-dashed border-muted-foreground/30 bg-muted/30 cursor-pointer hover:bg-muted/50 hover:border-muted-foreground/50 transition-all duration-300 h-full"
            onClick={handlePlaceholderClick}
          >
            <div className="flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[140px]">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-sm text-muted-foreground/70 font-medium">Votre entreprise ici ?</p>
            </div>
          </Card>

          {/* Placeholder Partner 2 - Globe */}
          <Card
            className="p-6 border-2 border-dashed border-muted-foreground/30 bg-muted/30 cursor-pointer hover:bg-muted/50 hover:border-muted-foreground/50 transition-all duration-300 h-full"
            onClick={handlePlaceholderClick}
          >
            <div className="flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[140px]">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Globe className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-sm text-muted-foreground/70 font-medium">Votre entreprise ici ?</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
