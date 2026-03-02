import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { CheckCircle, BookOpen, Map, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const QuizHistoireGeographie = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <SEO 
        title="QCM Histoire et Géographie de France"
        description="Révisez l'histoire, la géographie et les institutions françaises. Dates clés, régions, symboles nationaux. Préparation examen civique 2026."
        canonical="/quiz-histoire-geographie-france"
      />
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-8 md:mb-12">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Map className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              QCM Histoire et Géographie de France
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez l'histoire, la géographie et les institutions françaises pour réussir votre test de naturalisation.
            </p>
          </header>

          {/* Content Section */}
          <Card className="p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Landmark className="w-6 h-6 text-primary" />
              Culture et Patrimoine Français
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                La connaissance de l'histoire et de la géographie françaises est essentielle pour votre naturalisation. 
                Ces questions représentent une part importante de l'examen civique officiel.
              </p>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                <Card className="p-4 bg-primary/5">
                  <h3 className="font-semibold mb-2 text-foreground">📚 Histoire de France</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Révolution française (1789)</li>
                    <li>• Guerres mondiales</li>
                    <li>• Ve République (1958)</li>
                    <li>• Grands personnages historiques</li>
                  </ul>
                </Card>

                <Card className="p-4 bg-primary/5">
                  <h3 className="font-semibold mb-2 text-foreground">🗺️ Géographie</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 13 régions métropolitaines</li>
                    <li>• Départements et territoires</li>
                    <li>• Villes principales</li>
                    <li>• Fleuves et montagnes</li>
                  </ul>
                </Card>

                <Card className="p-4 bg-primary/5">
                  <h3 className="font-semibold mb-2 text-foreground">🏛️ Institutions</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Président de la République</li>
                    <li>• Assemblée nationale et Sénat</li>
                    <li>• Gouvernement et Ministres</li>
                    <li>• Conseil constitutionnel</li>
                  </ul>
                </Card>

                <Card className="p-4 bg-primary/5">
                  <h3 className="font-semibold mb-2 text-foreground">🎭 Culture</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Patrimoine UNESCO</li>
                    <li>• Symboles nationaux</li>
                    <li>• Fêtes nationales</li>
                    <li>• Langue française</li>
                  </ul>
                </Card>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
                Points clés à maîtriser :
              </h3>
              
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Les grandes dates de l'histoire française (1789, 1914-1918, 1939-1945)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>La Constitution de la Ve République et ses institutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Les symboles de la République (drapeau, hymne, devise)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>La division administrative : régions, départements, communes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Le rôle de la France dans l'Union européenne</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Les fêtes nationales : 14 juillet (Fête nationale), 8 mai, 11 novembre</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Grands personnages : Napoléon, De Gaulle, Jeanne d'Arc, Victor Hugo</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Timeline Section */}
          <Card className="p-6 md:p-8 mb-8 bg-accent/5 border-accent/20">
            <h3 className="text-xl font-semibold mb-4 text-foreground">📅 Dates importantes à retenir</h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-4">
                <span className="font-bold text-primary min-w-[80px]">1789</span>
                <span>Révolution française et Déclaration des droits de l'homme</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-primary min-w-[80px]">1848</span>
                <span>Abolition de l'esclavage en France</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-primary min-w-[80px]">1905</span>
                <span>Loi de séparation des Églises et de l'État (laïcité)</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-primary min-w-[80px]">1944</span>
                <span>Droit de vote des femmes</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-primary min-w-[80px]">1958</span>
                <span>Fondation de la Ve République</span>
              </div>
            </div>
          </Card>

          {/* CTA Section */}
          <div className="text-center space-y-4">
            <Link to="/qcm-citoyennete-francaise">
              <Button size="lg" className="w-full sm:w-auto">
                <BookOpen className="mr-2 w-5 h-5" />
                Commencer le QCM Complet
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              40 questions • 45 minutes • Conditions réelles d'examen
            </p>
          </div>

          {/* Additional Info */}
          <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
            <h3 className="font-semibold mb-2 text-lg">💡 Astuce de révision</h3>
            <p className="text-sm text-muted-foreground">
              L'histoire et la géographie représentent environ 35% des questions de l'examen. 
              Concentrez-vous sur les dates clés, les institutions actuelles et la géographie administrative. 
              Visualisez une carte de France avec les régions pour mieux mémoriser.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default QuizHistoireGeographie;
