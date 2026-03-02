import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Flag, Award } from "lucide-react";

const ExamLevelsSection = () => {
  const levels = [
    {
      id: "csp",
      title: "Carte de Séjour Pluriannuelle (CSP)",
      badge: "Fondamental",
      badgeClass: "bg-primary text-primary-foreground",
      description: "193 questions officielles (Vie quotidienne, valeurs de base)",
      icon: Globe,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      buttonClass: "bg-primary hover:bg-primary/90 text-primary-foreground",
      buttonText: "S'entraîner au niveau CSP",
      href: "/entrainement-csp",
    },
    {
      id: "cr",
      title: "Carte de Résident (CR)",
      badge: "Intermédiaire",
      badgeClass: "bg-accent text-accent-foreground",
      description: "209 questions officielles (Histoire, institutions, politique)",
      icon: Flag,
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
      buttonClass: "bg-accent hover:bg-accent/90 text-accent-foreground",
      buttonText: "S'entraîner au niveau CR",
      href: "/entrainement-cr",
    },
    {
      id: "nat",
      title: "Naturalisation",
      badge: "Approfondi",
      badgeClass: "bg-destructive text-destructive-foreground",
      description: "240 questions (Culture générale, patrimoine, nuances républicaines)",
      icon: Award,
      iconBg: "bg-destructive/10",
      iconColor: "text-destructive",
      buttonClass: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
      buttonText: "S'entraîner pour Nationalité",
      href: "/entrainement-naturalisation",
    },
  ];

  return (
    <section aria-label="Niveaux d'examen" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {levels.map((level) => {
            const Icon = level.icon;
            return (
              <div
                key={level.id}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Badge */}
                <div className="flex justify-center mb-4">
                  <Badge className={`${level.badgeClass} px-3 py-1 text-xs font-medium`}>{level.badge}</Badge>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`w-14 h-14 rounded-full ${level.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${level.iconColor}`} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-center text-foreground mb-2">{level.title}</h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground text-center mb-6 flex-1">{level.description}</p>

                {/* Button */}
                <Link to={level.href} className="w-full">
                  <Button className={`w-full ${level.buttonClass}`}>{level.buttonText}</Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExamLevelsSection;
