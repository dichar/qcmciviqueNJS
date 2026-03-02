import React from 'react';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Scale, Heart, Users, Building, FileText } from 'lucide-react';

const ValeursRepubliqueExpliquees = () => {
  const valeurs = [
    {
      icon: <span className="text-2xl">🇫🇷</span>,
      titre: "La Liberté",
      description: "La liberté permet à chacun de penser, s'exprimer et croire librement. Elle s'exerce dans le respect des lois et des autres."
    },
    {
      icon: <Scale className="w-6 h-6 text-primary" />,
      titre: "L'Égalité",
      description: "En France, toutes les personnes sont égales devant la loi. Aucune distinction ne peut être faite selon l'origine, le sexe, la religion ou la situation sociale."
    },
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      titre: "La Fraternité",
      description: "La fraternité repose sur la solidarité, l'entraide et le respect entre les personnes. Elle encourage le vivre-ensemble et la cohésion sociale."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      titre: "La Laïcité",
      description: "La laïcité garantit la liberté de conscience et la neutralité de l'État. Chacun est libre de croire ou de ne pas croire, dans le respect des règles communes."
    },
    {
      icon: <Building className="w-6 h-6 text-amber-600" />,
      titre: "Le Respect des Institutions",
      description: "Les institutions organisent la vie démocratique. Les connaître permet de comprendre comment les décisions sont prises et appliquées en France."
    },
    {
      icon: <FileText className="w-6 h-6 text-green-600" />,
      titre: "Droits et Devoirs",
      description: "Vivre en France donne accès à des droits, mais implique aussi des devoirs : respecter les lois, les autres, et participer à la vie collective."
    }
  ];

  return (
    <>
      <SEO
        title="Valeurs de la République Expliquées Simplement | Examen Civique 2026"
        description="Comprendre les valeurs de la République française : liberté, égalité, fraternité, laïcité. Guide complet pour réussir l'examen civique 2026."
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
              <BookOpen className="w-4 h-4" />
              <span>Les Fondamentaux</span>
              <span className="text-muted-foreground">• 6 min de lecture</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Examen Civique 2026 : Les Valeurs de la République Expliquées Simplement
            </h1>
            <p className="text-lg text-muted-foreground">
              L'examen civique vise à s'assurer que chaque personne comprend les fondements de la société française. Ces valeurs ne sont pas théoriques : elles s'appliquent au quotidien.
            </p>
          </header>

          <div className="grid gap-6 mb-12">
            {valeurs.map((valeur, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      {valeur.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">{valeur.titre}</h2>
                      <p className="text-muted-foreground">{valeur.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-red-50 dark:from-blue-950/20 dark:to-red-950/20 border-0 mb-12">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Comprendre ces valeurs est indispensable
              </h3>
              <p className="text-muted-foreground mb-6">
                Pour réussir l'examen civique 2026 et s'intégrer durablement dans la société française.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/quiz">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Tester mes connaissances
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/livret-citoyen">
                    Consulter le Livret du Citoyen
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button asChild variant="ghost">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Lire d'autres articles
              </Link>
            </Button>
          </div>
        </article>
      </main>
    </>
  );
};

export default ValeursRepubliqueExpliquees;
