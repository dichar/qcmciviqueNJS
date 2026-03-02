import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Clock, CheckCircle, BookOpen, Brain } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";

const ExamenCivique40Questions80Pourcent = () => {
  return (
    <UnifiedLayout>
      <SEO 
        title="Examen Civique 2026 : 40 Questions, 80% de Réussite - Comment Réussir"
        description="Structure complète de l'examen civique 2026 : 40 questions en 45 minutes, 80% requis. Découvrez les 5 thématiques et nos conseils pour réussir du premier coup."
        canonical="/blog/examen-civique-40-questions-80-pourcent"
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
              Guide Examen
            </span>
            <span>•</span>
            <time dateTime="2025-12-18">18 décembre 2025</time>
            <span>•</span>
            <span>12 min de lecture</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Examen Civique 2026 : 40 Questions, 80% de Réussite, Comment Réussir
          </h1>
          <p className="text-xl text-muted-foreground">
            À partir du 1er janvier 2026, l'examen civique est obligatoire pour toutes les demandes de naturalisation, carte de résident, ou carte pluriannuelle. Voici comment le réussir.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Structure de l'Examen</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">40</div>
                <div className="text-muted-foreground">Questions QCM</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">45</div>
                <div className="text-muted-foreground">Minutes</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">80%</div>
                <div className="text-muted-foreground">Seuil de réussite</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">32</div>
                <div className="text-muted-foreground">Bonnes réponses minimum</div>
              </Card>
            </div>

            <Card className="p-6 bg-muted/30">
              <h3 className="font-bold mb-4">Informations pratiques</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Support :</strong> Informatisé (sur ordinateur, dans un centre agréé)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Langue :</strong> Français exclusivement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Tentatives :</strong> Illimitées (environ 50-100€ par tentative)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Adaptations :</strong> Possibles pour les personnes en situation de handicap</span>
                </li>
              </ul>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Les 5 Thématiques (8 questions chacune)</h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Principes et Valeurs de la République
                </h3>
                <p className="text-muted-foreground mb-3">Devise française, laïcité, Constitution de 1958, égalité homme-femme, non-discrimination.</p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Questions types :</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• "Qu'est-ce que la laïcité ?"</li>
                    <li>• "Nommez les trois principes de la République"</li>
                    <li>• "Qui est Marianne ?"</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Droits et Devoirs de la Vie en France
                </h3>
                <p className="text-muted-foreground mb-3">Droits des travailleurs, éducation, santé, protection sociale, obligations fiscales.</p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Questions types :</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• "Combien de jours de congés payés par an ?"</li>
                    <li>• "Jusqu'à quel âge la scolarité est-elle obligatoire ?"</li>
                    <li>• "Quel est le rôle de la Sécurité sociale ?"</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Système Institutionnel et Politique
                </h3>
                <p className="text-muted-foreground mb-3">Constitution, rôle du Président, Parlement, processus de vote des lois.</p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Questions types :</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• "Combien de députés à l'Assemblée nationale ?"</li>
                    <li>• "Pour combien d'années le Président est-il élu ?"</li>
                    <li>• "Comment une loi est-elle votée ?"</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Histoire, Géographie et Culture
                </h3>
                <p className="text-muted-foreground mb-3">Dates clés, géographie, symboles nationaux, personnages historiques.</p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Questions types :</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• "En quelle année a eu lieu la Prise de la Bastille ?"</li>
                    <li>• "Quels sont les cinq fleuves principaux ?"</li>
                    <li>• "Quand les femmes ont obtenu le droit de vote ?"</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  Vie de la Société Française
                </h3>
                <p className="text-muted-foreground mb-3">Système éducatif, accès aux soins, droit du travail, services publics.</p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Questions types :</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• "L'école maternelle est-elle obligatoire ?"</li>
                    <li>• "Comment fonctionne le système de santé ?"</li>
                    <li>• "Quels droits un salarié a-t-il en cas de licenciement ?"</li>
                  </ul>
                </div>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Comment S'Entraîner Efficacement</h2>
            
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold mb-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Étape 1 : Maîtriser le Livret du Citoyen
                </h3>
                <p className="text-muted-foreground">
                  Téléchargez-le gratuitement sur le site du ministère. Lisez-le complètement et surlignez les points clés.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold mb-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Étape 2 : Faire des QCM Simulés
                </h3>
                <p className="text-muted-foreground">
                  Faites au moins 5-10 tests complets avant de passer l'examen réel. Conditions : 40 questions, 45 minutes.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold mb-2">
                  <Target className="w-5 h-5 text-primary" />
                  Étape 3 : Identifier Vos Faiblesses
                </h3>
                <p className="text-muted-foreground">
                  Après chaque test, analysez vos erreurs. Quel thème vous pose problème ? Faites une fiche spéciale.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Objectif : Atteindre 85-90% avant l'examen réel
                </h3>
                <p className="text-muted-foreground">
                  Visez 34-36 bonnes réponses en entraînement pour être serein le jour J.
                </p>
              </Card>
            </div>
          </section>

          <section className="mb-12 bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Les questions changent-elles chaque fois ?</h3>
                <p className="text-muted-foreground">Oui, les 40 questions varient selon les sessions. Cependant, elles couvrent toujours les 5 mêmes thématiques.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Puis-je utiliser un dictionnaire ?</h3>
                <p className="text-muted-foreground">Non, aucune aide extérieure n'est autorisée.</p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Si j'échoue plusieurs fois, cela compte contre moi ?</h3>
                <p className="text-muted-foreground">Non, l'administration ne compte que votre meilleure note.</p>
              </div>
            </div>
          </section>
        </div>

        <Card className="p-8 bg-primary/5 border-primary/20 mt-12">
          <h2 className="text-2xl font-bold mb-4">Prêt pour l'examen ?</h2>
          <p className="text-muted-foreground mb-6">
            Testez vos connaissances avec notre QCM de 40 questions en conditions réelles.
          </p>
          <Button asChild size="lg">
            <Link to="/quiz">Lancer un essai gratuit</Link>
          </Button>
        </Card>

        <div className="flex justify-center mt-8">
          <ShareButtons 
            title="Examen Civique 2026 : Guide Complet"
            description="40 questions, 80% de réussite - Comment réussir"
            compact={false}
          />
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default ExamenCivique40Questions80Pourcent;
