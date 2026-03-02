import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Clock, FileText, ArrowRight } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";

const CarteSejourPluriannuelleConditions2026 = () => {
  return (
    <UnifiedLayout>
      <SEO 
        title="Carte de Séjour Pluriannuelle 2026 : Conditions et Passage à la Carte de Résident"
        description="Guide complet sur la carte de séjour pluriannuelle en France. Conditions d'accès, niveau A2, examen civique et stratégie pour passer à la carte de résident."
        canonical="/blog/carte-sejour-pluriannuelle-conditions-2026"
        type="article"
      />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
              Titre de Séjour
            </span>
            <span>•</span>
            <time dateTime="2025-12-18">18 décembre 2025</time>
            <span>•</span>
            <span>9 min de lecture</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Carte de Séjour Pluriannuelle : Conditions, Durée et Passage à la Carte de Résident
          </h1>
          <p className="text-xl text-muted-foreground">
            La carte de séjour pluriannuelle est un titre temporaire renouvelable, d'une durée de 2 à 4 ans. Depuis 2026, son obtention demande de réussir l'examen civique et de justifier d'un niveau A2.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Qui Peut Demander la Carte Pluriannuelle ?</h2>
            
            <Card className="p-6 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Les étrangers ayant terminé leur première année de séjour régulier en France</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Les salariés, entrepreneurs, étudiants, conjoints de Français</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Les personnes en situation de regroupement familial</span>
                </li>
              </ul>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">2-4 ans</div>
                <div className="text-muted-foreground">Durée de validité</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">A2</div>
                <div className="text-muted-foreground">Niveau de langue requis</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">75-225€</div>
                <div className="text-muted-foreground">Coût selon le motif</div>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Conditions Depuis Janvier 2026</h2>
            
            <div className="space-y-4">
              <Card className="p-6 border-l-4 border-l-primary">
                <h3 className="font-bold text-lg mb-2">Examen Civique Obligatoire</h3>
                <p className="text-muted-foreground">
                  40 questions en 45 minutes avec un seuil de réussite de 80%. Vous pouvez le repasser autant de fois que nécessaire.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-blue-500">
                <h3 className="font-bold text-lg mb-2">Niveau de Langue A2</h3>
                <p className="text-muted-foreground">
                  Niveau élémentaire de français à justifier par un certificat (TEF, DELF, ou diplôme français). C'est le niveau "utilisateur élémentaire".
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-green-500">
                <h3 className="font-bold text-lg mb-2">Preuve d'Intégration</h3>
                <p className="text-muted-foreground">
                  Justificatifs de résidence, emploi ou études, et respect du Contrat d'Intégration Républicaine (CIR) si applicable.
                </p>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Droits Conférés par la Carte Pluriannuelle</h2>
            
            <Card className="p-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Droit de séjourner en France pendant la durée de validité</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Droit de travailler librement (selon le motif de séjour)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Droit d'accéder aux services publics</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <p className="text-muted-foreground">
                  <strong>Limitations :</strong> Pas de droit de vote, pas de nationalité française, et renouvellement non automatique.
                </p>
              </div>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
              <ArrowRight className="w-6 h-6 text-primary" />
              Stratégie : Passage à la Carte de Résident
            </h2>
            
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-bold text-lg mb-4">Évolution du Parcours</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <p className="font-medium">Carte 1 an (visa long séjour)</p>
                    <p className="text-sm text-muted-foreground">Première année en France</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <p className="font-medium">Carte Pluriannuelle (2-4 ans)</p>
                    <p className="text-sm text-muted-foreground">Niveau A2 + Examen civique</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <p className="font-medium">Carte de Résident (10 ans)</p>
                    <p className="text-sm text-muted-foreground">5 ans de résidence + Niveau B1 + Examen civique</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-muted-foreground">
                  <strong>Conseil :</strong> Si vous avez un niveau de français correct, visez directement la Carte de Résident (B1) après 5 ans. L'effort est similaire mais la récompense (10 ans de tranquillité) est incomparable.
                </p>
              </div>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Procédure de Demande</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold mb-1">Vérifiez votre éligibilité</h3>
                  <p className="text-muted-foreground">Au moins 1 an de séjour régulier en France avec un titre valide.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold mb-1">Passez l'examen civique</h3>
                  <p className="text-muted-foreground">40 questions, 45 minutes, 80% de réussite requis.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold mb-1">Obtenez le certificat de langue A2</h3>
                  <p className="text-muted-foreground">Test TEF, DELF A2, ou diplôme français équivalent.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold mb-1">Déposez votre dossier</h3>
                  <p className="text-muted-foreground">À la préfecture de votre lieu de résidence. Délai : 2 à 4 mois.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Le renouvellement est-il automatique ?</h3>
                <p className="text-muted-foreground">Non, vous devez en refaire la demande à l'expiration et continuer à remplir les conditions.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Puis-je passer directement à la carte de résident ?</h3>
                <p className="text-muted-foreground">Oui, si vous avez 5 ans de résidence, vous pouvez sauter l'étape de la pluriannuelle.</p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Que se passe-t-il si j'échoue à l'examen civique ?</h3>
                <p className="text-muted-foreground">Vous pouvez le repasser autant de fois que nécessaire. L'échec n'entraîne pas un refus de la carte, mais vous devez réussir pour l'obtenir.</p>
              </div>
            </div>
          </section>
        </div>

        <Card className="p-8 bg-primary/5 border-primary/20 mt-12">
          <h2 className="text-2xl font-bold mb-4">Préparez l'examen civique</h2>
          <p className="text-muted-foreground mb-6">
            Entraînez-vous avec notre QCM de 40 questions en conditions réelles.
          </p>
          <Button asChild size="lg">
            <Link to="/quiz">Lancer le QCM gratuit</Link>
          </Button>
        </Card>

        <div className="flex justify-center mt-8">
          <ShareButtons 
            title="Carte de Séjour Pluriannuelle 2026"
            description="Conditions et passage à la carte de résident"
            compact={false}
          />
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default CarteSejourPluriannuelleConditions2026;
