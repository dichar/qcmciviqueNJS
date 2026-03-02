import React from 'react';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle, BookOpen } from 'lucide-react';

const DixErreursAEviter = () => {
  const erreurs = [
    {
      numero: 1,
      titre: "Penser que l'examen est facile",
      description: "L'examen ne se limite pas à du bon sens. Il évalue des connaissances précises sur les valeurs, les institutions et la vie en société en France."
    },
    {
      numero: 2,
      titre: "Ne pas se préparer à l'avance",
      description: "Attendre la dernière minute est une erreur courante. Une préparation progressive permet de mieux comprendre les notions et d'éviter le stress."
    },
    {
      numero: 3,
      titre: "Négliger le format QCM",
      description: "L'examen se présente sous forme de questions à choix multiples. Il faut apprendre à bien lire les questions et éviter les réponses pièges."
    },
    {
      numero: 4,
      titre: "Sous-estimer les mises en situation",
      description: "Certaines questions décrivent des situations concrètes de la vie quotidienne. Il ne suffit pas de connaître les règles, il faut savoir les appliquer."
    },
    {
      numero: 5,
      titre: "Avoir un niveau de français insuffisant",
      description: "Tout l'examen se déroule en français. Une mauvaise compréhension peut entraîner des erreurs, même si les connaissances sont là."
    },
    {
      numero: 6,
      titre: "Ignorer les valeurs de la République",
      description: "Liberté, égalité, fraternité et laïcité sont au cœur de l'examen. Ne pas les maîtriser est un risque majeur d'échec."
    },
    {
      numero: 7,
      titre: "Confondre droits et devoirs",
      description: "Beaucoup connaissent leurs droits, mais oublient leurs obligations. L'examen insiste sur l'équilibre entre les deux."
    },
    {
      numero: 8,
      titre: "Ne pas connaître les institutions françaises",
      description: "Le rôle du Président, du Gouvernement, du Parlement ou des mairies est souvent mal compris, alors que ces notions sont essentielles."
    },
    {
      numero: 9,
      titre: "Apprendre sans comprendre",
      description: "Mémoriser sans comprendre le sens des règles et des valeurs est insuffisant. L'examen évalue la compréhension réelle."
    },
    {
      numero: 10,
      titre: "Se présenter stressé ou mal organisé",
      description: "Arriver sans s'être entraîné, mal reposé ou sans méthode peut faire perdre de précieux points."
    }
  ];

  return (
    <>
      <SEO
        title="Examen Civique 2026 : 10 Erreurs à Éviter Absolument | QCM Civique"
        description="Découvrez les 10 erreurs les plus fréquentes qui font échouer les candidats à l'examen civique 2026. Conseils pratiques pour réussir du premier coup."
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
              <AlertTriangle className="w-4 h-4" />
              <span>Guide Pratique</span>
              <span className="text-muted-foreground">• 8 min de lecture</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Examen Civique 2026 : 10 Erreurs à Éviter Absolument
            </h1>
            <p className="text-lg text-muted-foreground">
              À partir de 2026, l'examen civique devient une étape incontournable pour obtenir certains titres de séjour ou accéder à la nationalité française. Beaucoup de candidats échouent non pas par manque de volonté, mais à cause d'erreurs évitables.
            </p>
          </header>

          <div className="space-y-6 mb-12">
            {erreurs.map((erreur) => (
              <Card key={erreur.numero} className="border-l-4 border-l-destructive">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <span className="font-bold text-destructive">{erreur.numero}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">{erreur.titre}</h2>
                      <p className="text-muted-foreground">{erreur.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20 mb-12">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Notre conseil</h3>
                  <p className="text-muted-foreground">
                    Éviter ces erreurs augmente considérablement les chances de réussite à l'examen civique 2026. Commencez votre préparation dès maintenant avec nos QCM d'entraînement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/quiz">
                <BookOpen className="w-5 h-5 mr-2" />
                Commencer l'entraînement
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/blog">
                Lire d'autres articles
              </Link>
            </Button>
          </div>
        </article>
      </main>
    </>
  );
};

export default DixErreursAEviter;
