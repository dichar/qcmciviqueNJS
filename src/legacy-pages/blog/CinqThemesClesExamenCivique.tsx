import React from 'react';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Target, CheckCircle, FileQuestion, Lightbulb } from 'lucide-react';

const CinqThemesClesExamenCivique = () => {
  const themes = [
    {
      numero: 1,
      titre: "Principes et Valeurs de la République",
      description: "Incluant notamment la Laïcité, la Devise nationale et les Symboles de la République française.",
      exemples: ["Liberté, Égalité, Fraternité", "La Marseillaise", "Le drapeau tricolore", "Marianne"]
    },
    {
      numero: 2,
      titre: "Droits et Devoirs",
      description: "Les droits et obligations des personnes résidant en France.",
      exemples: ["Droit de vote", "Accès à l'éducation", "Obligation fiscale", "Respect des lois"]
    },
    {
      numero: 3,
      titre: "Système Institutionnel et Politique",
      description: "Organisation du Gouvernement, rôle du Parlement et fonctionnement de la démocratie.",
      exemples: ["Le Président de la République", "L'Assemblée nationale", "Le Sénat", "Les collectivités locales"]
    },
    {
      numero: 4,
      titre: "Histoire, Géographie et Culture",
      description: "Grandes dates historiques, patrimoine culturel et connaissance des territoires.",
      exemples: ["La Révolution française", "Les régions de France", "Le patrimoine UNESCO", "Les personnalités historiques"]
    },
    {
      numero: 5,
      titre: "Vivre dans la Société Française",
      description: "Système éducatif, autorité parentale, accès aux soins et vie quotidienne.",
      exemples: ["L'école obligatoire", "La Sécurité sociale", "Les services publics", "Le Code civil"]
    }
  ];

  return (
    <>
      <SEO
        title="Réussir l'Examen Civique : Les 5 Thèmes Clés du Référentiel 2026"
        description="Focus sur les 5 thèmes essentiels de l'examen civique 2026 : principes républicains, droits et devoirs, institutions, histoire et vie en société."
      />
      <Navigation />
      <main className="min-h-screen bg-background">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-2 text-sm text-primary mb-4">
              <Target className="w-4 h-4" />
              <span>Référentiel Officiel</span>
              <span className="text-muted-foreground">• 10 min de lecture</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              📚 Réussir l'Examen Civique : Focus sur les 5 Thèmes Clés et le Référentiel de Connaissances
            </h1>
            <p className="text-lg text-muted-foreground">
              La réussite de l'examen civique exige d'obtenir au minimum 80% de bonnes réponses (soit 32 sur 40). La préparation doit être ciblée sur les cinq grands domaines définis par le référentiel officiel.
            </p>
          </header>

          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">28</div>
                  <div className="text-sm text-muted-foreground">questions de connaissance</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">mises en situation</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">80%</div>
                  <div className="text-sm text-muted-foreground">seuil de réussite</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 mb-12">
            {themes.map((theme) => (
              <Card key={theme.numero} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xl font-bold text-primary-foreground">{theme.numero}</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-foreground mb-2">{theme.titre}</h2>
                      <p className="text-muted-foreground mb-4">{theme.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {theme.exemples.map((exemple, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                          >
                            {exemple}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-8 border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileQuestion className="w-5 h-5 text-amber-500" />
                Format des questions
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Questions de connaissance (28)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Questions directes testant vos connaissances sur les faits, dates, institutions et valeurs.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    Mises en situation (12)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Scénarios concrets demandant d'appliquer les principes dans un contexte réel.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                📋 Ressources officielles
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Un site internet officiel a été mis en place par le Ministère de l'Intérieur</li>
                <li>• Fiches thématiques disponibles pour chaque domaine</li>
                <li>• Liste des questions de connaissance pour faciliter la préparation</li>
                <li>• QCM Civique propose des entraînements basés sur ce référentiel officiel</li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/quiz">
                <BookOpen className="w-5 h-5 mr-2" />
                S'entraîner sur les 5 thèmes
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/livret-citoyen">
                Consulter le Livret du Citoyen
              </Link>
            </Button>
          </div>
        </article>
      </main>
    </>
  );
};

export default CinqThemesClesExamenCivique;
