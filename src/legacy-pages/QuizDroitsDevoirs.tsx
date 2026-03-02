import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { CheckCircle, BookOpen, Users, Vote } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const QuizDroitsDevoirs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <SEO 
        title="QCM Droits et Devoirs du Citoyen Français"
        description="Révisez les droits civiques et devoirs du citoyen français. Vote, impôts, participation démocratique. Préparation examen civique 2026."
        canonical="/quiz-droits-devoirs-citoyen"
      />
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-8 md:mb-12">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Vote className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              QCM Droits et Devoirs du Citoyen Français
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Maîtrisez vos droits et responsabilités en tant que citoyen français pour réussir votre examen de naturalisation.
            </p>
          </header>

          {/* Content Section */}
          <Card className="p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Droits et Responsabilités Citoyennes
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Devenir citoyen français implique de connaître et de comprendre les droits dont vous bénéficiez 
                ainsi que les devoirs qui vous incombent envers la République.
              </p>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                <Card className="p-4 bg-accent/5">
                  <h3 className="font-semibold mb-2 text-foreground">📜 Droits Civiques</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Droit de vote aux élections</li>
                    <li>• Éligibilité aux fonctions publiques</li>
                    <li>• Protection sociale</li>
                    <li>• Accès à l'éducation publique</li>
                  </ul>
                </Card>

                <Card className="p-4 bg-accent/5">
                  <h3 className="font-semibold mb-2 text-foreground">⚖️ Devoirs Civiques</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Respecter les lois</li>
                    <li>• Payer ses impôts</li>
                    <li>• Participer à la défense nationale</li>
                    <li>• Respecter les institutions</li>
                  </ul>
                </Card>

                <Card className="p-4 bg-accent/5">
                  <h3 className="font-semibold mb-2 text-foreground">🗳️ Participation Démocratique</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Élections présidentielles</li>
                    <li>• Élections législatives</li>
                    <li>• Élections municipales</li>
                    <li>• Référendums nationaux</li>
                  </ul>
                </Card>

                <Card className="p-4 bg-accent/5">
                  <h3 className="font-semibold mb-2 text-foreground">🛡️ Droits Fondamentaux</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Liberté d'expression</li>
                    <li>• Liberté de culte</li>
                    <li>• Droit à la sûreté</li>
                    <li>• Droit de propriété</li>
                  </ul>
                </Card>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
                Thèmes abordés dans ce QCM :
              </h3>
              
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Le droit de vote et les différentes élections en France</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Les obligations fiscales et la contribution à la solidarité nationale</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>La défense nationale et le service civique</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Le respect des lois et des institutions républicaines</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Les droits sociaux (santé, éducation, logement)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>La protection de l'environnement comme devoir citoyen</span>
                </li>
              </ul>
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
          <Card className="mt-8 p-6 bg-accent/5 border-accent/20">
            <h3 className="font-semibold mb-2 text-lg">💡 Conseil pratique</h3>
            <p className="text-sm text-muted-foreground">
              Les questions sur les droits et devoirs constituent environ 25% de l'examen civique. 
              Concentrez-vous particulièrement sur le droit de vote, les obligations fiscales et 
              la participation à la vie démocratique française.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default QuizDroitsDevoirs;
