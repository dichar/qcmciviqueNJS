import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Info, BookOpen, Home, RotateCcw, ShieldCheck, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { eligibilityResults, EligibilityResultType } from "@/data/eligibility-questions";

interface EligibilityResultProps {
  resultType: EligibilityResultType;
  onRestart?: () => void;
}

const EligibilityResult = ({ resultType, onRestart }: EligibilityResultProps) => {
  const result = eligibilityResults[resultType];

  const getIcon = () => {
    switch (result.icon) {
      case "check":
        return <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-500" />;
      case "x":
        return <XCircle className="w-16 h-16 text-muted-foreground" />;
      case "alert":
        return <AlertTriangle className="w-16 h-16 text-yellow-600 dark:text-yellow-500" />;
      case "info":
        return <Info className="w-16 h-16 text-blue-600 dark:text-blue-500" />;
    }
  };

  const getIconBg = () => {
    switch (result.icon) {
      case "check":
        return "bg-green-100 dark:bg-green-900/20";
      case "x":
        return "bg-muted/50";
      case "alert":
        return "bg-yellow-100 dark:bg-yellow-900/20";
      case "info":
        return "bg-blue-100 dark:bg-blue-900/20";
    }
  };

  const getBadgeClasses = () => {
    const badge = result.badgeText || "";
    if (badge.includes("CERTITUDE")) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700";
    if (badge.includes("PROBABLE")) return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-300 dark:border-amber-700";
    if (badge.includes("RECOMMANDÉ")) return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700";
    if (badge.includes("OBLIGATOIRE")) return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700";
    if (badge.includes("COMPLEXE")) return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300 dark:border-blue-700";
    return "bg-secondary text-secondary-foreground border-border";
  };

  const isExempted = !result.requiresExam;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="p-8 text-center shadow-strong">
          {/* Badge */}
          {result.badgeText && (
            <div className="mb-4">
              <Badge className={`text-sm px-4 py-1.5 font-bold ${getBadgeClasses()}`}>
                {result.badgeText}
              </Badge>
            </div>
          )}

          {/* Icon */}
          <div className={`w-24 h-24 rounded-full ${getIconBg()} flex items-center justify-center mx-auto mb-6`}>
            {getIcon()}
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {result.title}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            {result.description}
          </p>

          {/* Warning Block */}
          {result.warning && (
            <div className="bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-300 dark:border-amber-700 rounded-lg p-5 text-left mb-6">
              <p className="text-amber-900 dark:text-amber-200 text-base leading-relaxed font-medium">
                {result.warning}
              </p>
            </div>
          )}

          {/* Next Steps */}
          {result.nextSteps.length > 0 && (
            <div className="bg-secondary p-6 rounded-lg text-left mb-6">
              <h3 className="font-semibold text-lg mb-4">Prochaines étapes :</h3>
              <ul className="space-y-3">
                {result.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Expert Tip for Exempted Users */}
          {isExempted && (
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-5 text-left mb-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Le conseil de l'expert</p>
                  <p className="text-blue-800 dark:text-blue-300/80 text-sm leading-relaxed">
                    Même si vous pensez être exempté, réussir l'examen civique avec un score élevé (ex: 38/40) est une preuve irréfutable de votre attachement aux valeurs de la France. C'est souvent le « petit plus » qui facilite l'acceptation d'un dossier de naturalisation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {result.requiresExam && (
              <Link to="/quiz" className="w-full sm:w-auto">
                <Button size="lg" variant="default" className="w-full sm:w-auto text-base font-bold">
                  <BookOpen className="mr-2 flex-shrink-0" />
                  <span className="truncate">Commencer mon entraînement</span>
                </Button>
              </Link>
            )}
            {!result.requiresExam && (
              <Link to="/quiz" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <ShieldCheck className="mr-2 flex-shrink-0" />
                  <span className="truncate">S'entraîner quand même</span>
                </Button>
              </Link>
            )}
            {onRestart && (
              <Button size="lg" variant="secondary" onClick={onRestart} className="w-full sm:w-auto">
                <RotateCcw className="mr-2 flex-shrink-0" />
                <span className="truncate">Refaire le test</span>
              </Button>
            )}
            <Link to="/" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Home className="mr-2 flex-shrink-0" />
                <span className="truncate">Retour à l'accueil</span>
              </Button>
            </Link>
          </div>
        </Card>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            <strong>Note importante :</strong> Ce diagnostic est indicatif et basé sur la loi n° 2024-42 du 26 janvier 2024 et ses décrets d'application. 
            Seule votre préfecture peut confirmer votre situation officielle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EligibilityResult;
