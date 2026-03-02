import React from 'react';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, AlertTriangle, FileText, Users, HelpCircle } from 'lucide-react';

const AlgeriensFranceExamenCivique = () => {
  return (
    <>
      <SEO
        title="Algériens en France : Ce Qui Change avec l'Examen Civique 2026"
        description="Examen civique et accord bilatéral franco-algérien : ce qui change pour les titres de séjour pluriannuels et la carte de résident. Guide complet."
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
              <FileText className="w-4 h-4" />
              <span>Cas Particuliers</span>
              <span className="text-muted-foreground">• 6 min de lecture</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🇩🇿 Algériens en France et Nouvel Examen Civique : Ce Qui Change pour les Demandes de Titre de Séjour
            </h1>
            <p className="text-lg text-muted-foreground">
              Si le nouvel examen civique obligatoire impacte tous les ressortissants étrangers non européens, les personnes d'origine algérienne se posent légitimement des questions sur leur situation particulière.
            </p>
          </header>

          <div className="space-y-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  L'accord bilatéral franco-algérien de 1968
                </h2>
                <p className="text-muted-foreground mb-4">
                  Actuellement, l'accord prévoit des régimes spécifiques pour les titres de séjour. Cependant, les textes récents confirment que <strong className="text-foreground">l'examen civique s'appliquera bien</strong> aux ressortissants algériens pour :
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>L'accès à la carte de séjour pluriannuelle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>L'accès à la carte de résident de 10 ans (potentiellement)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Attention : Distinction importante
                </h2>
                <p className="text-muted-foreground mb-4">
                  Une distinction doit être faite entre :
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Le nouveau QCM civique</h3>
                    <p className="text-sm text-muted-foreground">40 questions sur les valeurs de la République, format écrit</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">L'entretien d'assimilation</h3>
                    <p className="text-sm text-muted-foreground">Entretien oral obligatoire pour la naturalisation (inchangé)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Les 5 thèmes de l'examen
                </h2>
                <p className="text-muted-foreground mb-4">
                  Les questions de l'examen se concentrent sur cinq thématiques précises :
                </p>
                <div className="space-y-2">
                  {[
                    "Les symboles de la République (drapeau, hymne, devise)",
                    "Les principes républicains (liberté, égalité, fraternité, laïcité)",
                    "Les droits et devoirs du citoyen",
                    "L'organisation des institutions françaises",
                    "La vie en société française"
                  ].map((theme, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                      <span className="text-foreground">{theme}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  Où s'informer ?
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Les organismes agréés pour l'examen civique sont déjà en place</li>
                  <li>• Consultez le site officiel du Ministère de l'Intérieur pour le référentiel des connaissances</li>
                  <li>• QCM Civique propose des entraînements basés sur le programme officiel</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/quiz">
                <BookOpen className="w-5 h-5 mr-2" />
                S'entraîner maintenant
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/centres">
                Trouver un centre d'examen
              </Link>
            </Button>
          </div>
        </article>
      </main>
    </>
  );
};

export default AlgeriensFranceExamenCivique;
