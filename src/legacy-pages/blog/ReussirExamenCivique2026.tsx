import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, BookOpen, Target, Clock, TrendingUp } from "lucide-react";

const ReussirExamenCivique2026 = () => {
  return (
    <UnifiedLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                Guide Pratique
              </span>
              <span className="text-sm text-muted-foreground">
                18 novembre 2025 • 8 min de lecture
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Comment Réussir l'Examen Civique 2026 : Guide Complet
            </h1>
            <p className="text-xl text-muted-foreground">
              Découvrez les stratégies éprouvées pour réussir votre test de naturalisation française dès la première tentative.
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-6">
            <Card className="p-6 bg-blue-500/5 border-blue-500/20">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                L'Objectif : 80% Minimum
              </h2>
              <p className="text-muted-foreground">
                Pour réussir l'examen civique français, vous devez obtenir au minimum <strong>32 bonnes réponses sur 40 questions</strong> (80%). 
                Vous disposez de 45 minutes pour compléter le test. C'est un défi accessible si vous vous préparez correctement.
              </p>
            </Card>

            <section>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-7 h-7 text-primary" />
                1. Comprendre la Structure de l'Examen
              </h2>
              <p>L'examen civique français est divisé en quatre thèmes principaux :</p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span><strong>Les Valeurs de la République</strong> : Liberté, Égalité, Fraternité, Laïcité</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span><strong>Les Droits et Devoirs du Citoyen</strong> : Voter, respecter la loi, payer ses impôts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span><strong>L'Histoire de France</strong> : Événements majeurs, symboles nationaux, grandes figures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span><strong>La Géographie et les Institutions</strong> : Régions, organisation politique, institutions européennes</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-7 h-7 text-primary" />
                2. Stratégie de Préparation en 4 Semaines
              </h2>
              
              <Card className="p-6 mb-4">
                <h3 className="text-xl font-bold mb-3">Semaine 1 : Familiarisation</h3>
                <ul className="space-y-2">
                  <li>✓ Passez 2-3 tests complets pour identifier vos points faibles</li>
                  <li>✓ Lisez attentivement toutes les explications, même pour les bonnes réponses</li>
                  <li>✓ Créez un compte sur QCM Civique pour suivre votre progression</li>
                </ul>
              </Card>

              <Card className="p-6 mb-4">
                <h3 className="text-xl font-bold mb-3">Semaine 2 : Révision Ciblée</h3>
                <ul className="space-y-2">
                  <li>✓ Utilisez le mode révision intelligent pour travailler vos thèmes faibles</li>
                  <li>✓ Prenez des notes personnelles sur chaque session</li>
                  <li>✓ Visez un score minimum de 70% sur chaque thème</li>
                </ul>
              </Card>

              <Card className="p-6 mb-4">
                <h3 className="text-xl font-bold mb-3">Semaine 3 : Consolidation</h3>
                <ul className="space-y-2">
                  <li>✓ Faites un test complet chaque jour</li>
                  <li>✓ Consultez la page "Erreurs Fréquentes" pour éviter les pièges courants</li>
                  <li>✓ Objectif : atteindre 85% de réussite régulièrement</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-3">Semaine 4 : Simulation et Confiance</h3>
                <ul className="space-y-2">
                  <li>✓ Passez 3-4 tests dans les conditions réelles (45 minutes, aucune aide)</li>
                  <li>✓ Révisez uniquement vos dernières erreurs</li>
                  <li>✓ Reposez-vous bien la veille de l'examen</li>
                </ul>
              </Card>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-7 h-7 text-primary" />
                3. Conseils pour le Jour J
              </h2>
              <Card className="p-6 bg-green-500/5 border-green-500/20">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">1.</span>
                    <span><strong>Gérez votre temps</strong> : 45 minutes pour 40 questions = environ 1 minute par question</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">2.</span>
                    <span><strong>Lisez attentivement</strong> : Les questions peuvent contenir des pièges subtils</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">3.</span>
                    <span><strong>Éliminez d'abord</strong> : Si vous hésitez, éliminez les réponses clairement fausses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">4.</span>
                    <span><strong>Ne bloquez pas</strong> : Passez les questions difficiles et revenez-y à la fin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">5.</span>
                    <span><strong>Relisez si possible</strong> : Gardez 5 minutes pour vérifier vos réponses</span>
                  </li>
                </ul>
              </Card>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">4. Utilisez Tous les Outils à Votre Disposition</h2>
              <p className="mb-4">Notre plateforme vous offre plusieurs fonctionnalités pour maximiser vos chances :</p>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="font-bold mb-2">📊 Historique Interactif</h3>
                  <p className="text-sm text-muted-foreground">
                    Suivez votre progression avec un graphique d'évolution et identifiez vos tendances
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-bold mb-2">🎯 Analyse par Thème</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualisez votre performance sur chaque catégorie pour cibler vos révisions
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-bold mb-2">🧠 Mode Révision Intelligent</h3>
                  <p className="text-sm text-muted-foreground">
                    Révisez automatiquement les thèmes où vous avez les scores les plus faibles
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-bold mb-2">⚠️ Erreurs Fréquentes</h3>
                  <p className="text-sm text-muted-foreground">
                    Apprenez des erreurs des autres candidats pour éviter les pièges courants
                  </p>
                </Card>
              </div>
            </section>

            <Card className="p-8 bg-primary text-primary-foreground text-center">
              <h2 className="text-2xl font-bold mb-4">Prêt à Commencer Votre Préparation ?</h2>
              <p className="mb-6">
				  Rejoignez des centaines de candidats qui se préparent efficacement à la naturalisation grâce à notre plateforme. Testez le site gratuitement !
			  </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/qcm-citoyennete-francaise">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Commencer l'essai gratuit
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Créer un Compte
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </article>
      </div>
    </UnifiedLayout>
  );
};

export default ReussirExamenCivique2026;
