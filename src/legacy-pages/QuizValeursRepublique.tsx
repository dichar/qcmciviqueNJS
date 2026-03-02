import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { CheckCircle, BookOpen, Scale, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const QuizValeursRepublique = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <SEO 
        title="QCM Valeurs de la République – Liberté, égalité, fraternité"
        description="Testez vos connaissances sur les valeurs républicaines : liberté, égalité, fraternité et laïcité. Questions conformes à l'examen civique 2026."
        canonical="/quiz-valeurs-republique"
      />
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-8 md:mb-12">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Flag className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              QCM sur les Valeurs de la République Française
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Testez vos connaissances sur les principes fondamentaux qui régissent la République française : liberté, égalité, fraternité et laïcité.
            </p>
          </header>

          {/* Content Section */}
          <Card className="p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-primary" />
              Les Principes Fondamentaux
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Les valeurs de la République française constituent le socle de la citoyenneté française. 
                Pour réussir votre examen de naturalisation, vous devez maîtriser ces concepts essentiels.
              </p>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                <Card className="p-4 bg-primary/5">
                  <h3 className="font-semibold mb-2 text-foreground">🗽 Liberté</h3>
                  <p className="text-sm">
                    La liberté d'expression, de culte, de circulation et d'entreprendre. 
                    Comprendre les limites et les responsabilités qui accompagnent ces libertés.
                  </p>
                </Card>

                <Card className="p-4 bg-primary/5">
                  <h3 className="font-semibold mb-2 text-foreground">⚖️ Égalité</h3>
                  <p className="text-sm">
                    Tous les citoyens sont égaux devant la loi, sans distinction d'origine, 
                    de race, de religion ou de sexe.
                  </p>
                </Card>

                <Card className="p-4 bg-primary/5">
                  <h3 className="font-semibold mb-2 text-foreground">🤝 Fraternité</h3>
                  <p className="text-sm">
                    La solidarité nationale, l'entraide et le vivre-ensemble sont au cœur 
                    de la société française.
                  </p>
                </Card>

                <Card className="p-4 bg-primary/5">
                  <h3 className="font-semibold mb-2 text-foreground">🏛️ Laïcité</h3>
                  <p className="text-sm">
                    Séparation de l'État et des religions. Liberté de croire ou de ne pas croire, 
                    dans le respect de l'ordre public.
                  </p>
                </Card>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
                Ce que vous apprendrez dans ce QCM :
              </h3>
              
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Les symboles de la République française (drapeau, Marianne, devise)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Le principe de laïcité et son application au quotidien</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Les droits fondamentaux garantis par la Constitution</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>L'égalité entre les femmes et les hommes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>La liberté d'expression et ses limites légales</span>
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
            <h3 className="font-semibold mb-2 text-lg">💡 Conseil pour réussir</h3>
            <p className="text-sm text-muted-foreground">
              Les questions sur les valeurs de la République représentent environ 30% de l'examen officiel. 
              Assurez-vous de bien comprendre chaque principe et son application concrète dans la vie quotidienne en France.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default QuizValeursRepublique;
