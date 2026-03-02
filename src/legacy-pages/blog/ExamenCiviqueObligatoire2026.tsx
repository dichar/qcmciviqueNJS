import React from 'react';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, FileCheck, Clock, Target, AlertCircle } from 'lucide-react';

const ExamenCiviqueObligatoire2026 = () => {
  return (
    <>
      <SEO
        title="Examen Civique 2026 : Le Sésame Obligatoire pour Titres de Séjour et Naturalisation"
        description="À partir du 1er janvier 2026, l'examen civique devient obligatoire pour la carte de résident et la naturalisation française. Tout savoir sur cette réforme."
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
              <Calendar className="w-4 h-4" />
              <span>Actualité 2026</span>
              <span className="text-muted-foreground">• 7 min de lecture</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🇫🇷 Examen Civique 2026 : Le Sésame Obligatoire pour Titres de Séjour et Naturalisation
            </h1>
            <p className="text-lg text-muted-foreground">
              La nouvelle donne est claire : à partir du 1er janvier 2026, la réussite à un examen civique deviendra une condition sine qua non pour l'obtention de certains titres de séjour et la naturalisation française.
            </p>
          </header>

          <div className="prose prose-lg max-w-none mb-12">
            <Card className="mb-8 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  Ce qui change en 2026
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Carte de séjour pluriannuelle</strong> : examen civique obligatoire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Carte de résident 10 ans</strong> : examen civique obligatoire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Naturalisation française</strong> : renforcement des exigences</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Format de l'examen
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">40</div>
                    <div className="text-sm text-muted-foreground">questions QCM</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">45</div>
                    <div className="text-sm text-muted-foreground">minutes</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">80%</div>
                    <div className="text-sm text-muted-foreground">seuil de réussite</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Thèmes évalués
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Principes et Valeurs de la République",
                    "Droits et Devoirs en France",
                    "Système Institutionnel et Politique",
                    "Histoire et Géographie française",
                    "Vivre dans la Société Française"
                  ].map((theme, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {index + 1}
                      </div>
                      <span className="text-foreground">{theme}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  Bon à savoir
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Pour les candidats à la naturalisation, cet examen s'ajoute à l'exigence d'un niveau de langue B1</li>
                  <li>• Les demandes déposées avant le 1er janvier 2026 ne sont pas concernées</li>
                  <li>• Les avocats spécialisés recommandent d'anticiper la préparation</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/quiz">
                <BookOpen className="w-5 h-5 mr-2" />
                Commencer la préparation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/eligibility">
                Vérifier mon éligibilité
              </Link>
            </Button>
          </div>
        </article>
      </main>
    </>
  );
};

export default ExamenCiviqueObligatoire2026;
