import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle, FileText, Target } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";

const ComprenderLivretCitoyen2026 = () => {
  return (
    <UnifiedLayout>
      <SEO 
        title="Comprendre le Livret du Citoyen 2026 : Guide Officiel de Révision"
        description="Le Livret du Citoyen est le document de référence pour l'examen civique 2026. Découvrez les 5 grands thèmes et comment l'étudier efficacement."
        canonical="/blog/comprendre-livret-citoyen-2026"
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
              Référentiel
            </span>
            <span>•</span>
            <time dateTime="2025-12-18">18 décembre 2025</time>
            <span>•</span>
            <span>12 min de lecture</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Comprendre le Livret du Citoyen 2025-2026 : Votre Guide Officiel de Révision
          </h1>
          <p className="text-xl text-muted-foreground">
            Le Livret du Citoyen est le document de référence officiel du ministère de l'Intérieur. Tous les candidats doivent en maîtriser le contenu pour réussir l'examen civique.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <Card className="p-6 bg-primary/5 border-primary/20 mb-8">
            <p className="flex items-start gap-3 m-0">
              <Target className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <span>
                <strong>Important :</strong> Depuis 2025, ce livret alimente directement l'examen civique avec un seuil de réussite de 80%.
              </span>
            </p>
          </Card>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Structure du Livret : Les 5 Grands Thèmes</h2>
            
            <div className="space-y-8">
              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-xl mb-4">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Principes et Valeurs de la République
                </h3>
                <p className="text-muted-foreground mb-4">
                  Ce thème couvre la devise française, la laïcité, et les fondamentaux de l'ordre républicain.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>La Constitution de 1958 : "France indivisible, laïque, démocratique et sociale"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>La laïcité garantit la neutralité de l'État vis-à-vis des religions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Tous les citoyens ont des droits égaux</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-xl mb-4">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Droits et Devoirs de la Vie en France
                </h3>
                <p className="text-muted-foreground mb-4">
                  Détaille les droits sociaux, professionnels et politiques des résidents et citoyens français.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>30 jours de congés payés par an</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Le SMIC est garanti par la loi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>L'école est obligatoire jusqu'à 16 ans</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-xl mb-4">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Système Institutionnel et Politique
                </h3>
                <p className="text-muted-foreground mb-4">
                  Explique le fonctionnement des trois pouvoirs : exécutif, législatif et judiciaire.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Ve République instaurée en 1958</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Président élu pour 5 ans au suffrage universel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Parlement bicaméral : 577 députés + 348 sénateurs</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-xl mb-4">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Histoire, Géographie et Culture
                </h3>
                <p className="text-muted-foreground mb-4">
                  Couvre les dates clés de l'histoire française et les symboles nationaux.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>1789 : Révolution française et Prise de la Bastille</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>1944 : Droit de vote accordé aux femmes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Symboles : drapeau tricolore, Marseillaise, Marianne</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-xl mb-4">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  Vie de la Société Française
                </h3>
                <p className="text-muted-foreground mb-4">
                  Traite de sujets pratiques : accès aux soins, droit du travail, système éducatif.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>L'accès à la santé est garanti par la Sécurité sociale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>L'école publique est gratuite et laïque</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Le droit du travail protège les salariés</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Comment Utiliser le Livret pour Vos Révisions</h2>
            
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-bold mb-2">Étape 1 : Téléchargement et Lecture Active</h3>
                <p className="text-muted-foreground">
                  Téléchargez le Livret gratuitement sur le site du ministère de l'Intérieur. Lisez-le complètement en surlignant les points clés.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-2">Étape 2 : Créez une Synthèse Personnelle</h3>
                <p className="text-muted-foreground">
                  Résumez chaque thème en 10-15 lignes pour réviser rapidement et identifier les lacunes.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-2">Étape 3 : Testez Vos Connaissances</h3>
                <p className="text-muted-foreground">
                  Utilisez les quiz en ligne basés sur le Livret du Citoyen. Sur QCM Civique, nos questions reprennent directement le contenu officiel.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-2">Étape 4 : Revisitez Régulièrement</h3>
                <p className="text-muted-foreground">
                  Revisitez le livret chaque semaine en ciblant les thèmes où vous vous sentez faible.
                </p>
              </Card>
            </div>
          </section>

          <section className="mb-12 bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Le Livret suffit-il pour réussir l'examen civique 2026 ?</h3>
                <p className="text-muted-foreground">Le Livret couvre le contenu de l'examen, mais vous devez le compléter avec des entraînements pratiques.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Quels thèmes sont les plus importants ?</h3>
                <p className="text-muted-foreground">Tous les thèmes sont importants, mais mettez l'accent sur : les valeurs républicaines, les institutions françaises, et les dates clés de l'histoire.</p>
              </div>
            </div>
          </section>
        </div>

        <Card className="p-8 bg-primary/5 border-primary/20 mt-12">
          <h2 className="text-2xl font-bold mb-4">Accédez au Livret Interactif</h2>
          <p className="text-muted-foreground mb-6">
            Découvrez notre version interactive du Livret du Citoyen avec quiz intégrés.
          </p>
          <Button asChild size="lg">
            <Link to="/livret-citoyen">Accéder au Livret Interactif</Link>
          </Button>
        </Card>

        <div className="flex justify-center mt-8">
          <ShareButtons 
            title="Comprendre le Livret du Citoyen 2026"
            description="Guide officiel de révision pour l'examen civique"
            compact={false}
          />
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default ComprenderLivretCitoyen2026;
