import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react";

const NaturalisationMariageVsDecret = () => {
  return (
    <UnifiedLayout>
      <SEO
        title="Naturalisation par Mariage ou par Décret : Quelle Procédure Choisir en 2026 ?"
        description="Comparatif naturalisation par mariage vs décret. Conditions, délais, risques de la communauté de vie et stratégies pour 2026 avec niveau B2 obligatoire."
        canonical="/blog/naturalisation-mariage-vs-decret"
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Comparatif</span>
            <span className="text-muted-foreground text-sm">12 min de lecture</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Naturalisation par Mariage ou par Décret : Quelle Procédure en 2026 ?
          </h1>
          <p className="text-lg text-muted-foreground">
            Les conjoints de Français pensent souvent que le mariage est la voie royale. Avec l'alignement des exigences (B2 pour tous), cette idée mérite d'être nuancée.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 mb-8">
            <div className="flex items-start gap-3">
              <Scale className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Deux voies distinctes</h3>
                <p className="text-muted-foreground">
                  <strong>Déclaration par mariage</strong> = un droit, si les conditions sont remplies.<br/>
                  <strong>Naturalisation par décret</strong> = une faveur de l'État.<br/>
                  En 2026, avec le niveau B2 exigé pour les deux, l'avantage de "facilité" du mariage s'estompe.
                </p>
              </div>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4">Tableau Comparatif Détaillé</h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Critère</th>
                  <th className="border border-border p-3 text-left">Par Mariage (Art 21-2)</th>
                  <th className="border border-border p-3 text-left">Par Décret (Art 21-17)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 font-semibold">Résidence</td>
                  <td className="border border-border p-3 text-green-600">Aucune durée préalable</td>
                  <td className="border border-border p-3">5 ans (réductible à 2 ans)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3 font-semibold">Durée mariage</td>
                  <td className="border border-border p-3">4 ans minimum (5 ans si résidence interrompue)</td>
                  <td className="border border-border p-3">Non requis</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-semibold">Communauté de vie</td>
                  <td className="border border-border p-3 text-red-600">Obligatoire jusqu'à l'enregistrement</td>
                  <td className="border border-border p-3 text-green-600">Non requise</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3 font-semibold">Insertion professionnelle</td>
                  <td className="border border-border p-3">Moins stricte (solidarité conjugale)</td>
                  <td className="border border-border p-3 text-red-600">Cruciale (CDI, SMIC)</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-semibold">Langue 2026</td>
                  <td className="border border-border p-3">Niveau B2</td>
                  <td className="border border-border p-3">Niveau B2</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            Le Risque Majeur du Mariage : La "Cessation de Communauté de Vie"
          </h2>

          <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 my-6">
            <p className="text-muted-foreground mb-4">
              C'est le piège principal. Si une séparation, une crise conjugale ou un divorce survient pendant l'instruction du dossier (12 à 18 mois), <strong>la déclaration devient caduque</strong>.
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">⚠️ Article 26-4 : Présomption de fraude</h4>
              <p className="text-sm text-muted-foreground">
                Si la communauté de vie cesse dans les <strong>12 mois</strong> suivant l'enregistrement, le procureur peut contester la nationalité pour fraude (mariage gris).
              </p>
            </div>
            <p className="mt-4 text-sm font-semibold text-green-700 dark:text-green-400">
              ✅ La procédure par décret, elle, est acquise définitivement (sauf mensonge avéré), indépendamment de l'avenir du couple.
            </p>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            L'Insertion Professionnelle : Quand choisir le Décret ?
          </h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="p-4 border-2 border-green-500">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Profil "Autonome" → Décret
              </h4>
              <p className="text-sm text-muted-foreground">
                Si vous travaillez depuis 5 ans, avez un CDI, payez vos impôts et êtes parfaitement intégré professionnellement, la procédure par décret est souvent plus "solide". Elle ne dépend que de vous.
              </p>
            </Card>
            <Card className="p-4 border-2 border-blue-500">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-500" />
                Profil "Dépendant" → Mariage
              </h4>
              <p className="text-sm text-muted-foreground">
                Si vous êtes au foyer, en recherche d'emploi ou avec de faibles revenus, la procédure par mariage est impérative. Le préfet ne pourra pas vous opposer le motif de "ressources insuffisantes" si le foyer fiscal global est viable.
              </p>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Procédure Administrative : Papier ou Numérique ?</h2>

          <div className="space-y-4 my-6">
            <Card className="p-4">
              <h4 className="font-bold mb-2">📱 Par Décret</h4>
              <p className="text-sm text-muted-foreground">
                100% dématérialisée via la plateforme <strong>ANEF</strong>. Suivi en temps réel (théorique).
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold mb-2">📄 Par Mariage</h4>
              <p className="text-sm text-muted-foreground">
                La procédure reste souvent "hybride" ou papier (envoi recommandé avec AR) selon les préfectures. Cela peut parfois être plus rapide dans les petites préfectures moins saturées.
              </p>
            </Card>
          </div>

          <Card className="p-6 bg-primary/5 border-primary/20 my-8">
            <h3 className="font-bold text-lg mb-3">Notre analyse</h3>
            <p className="text-muted-foreground">
              Le choix doit se faire sur des critères de <strong>sécurité juridique</strong> et de <strong>rapidité</strong>. Si votre couple est solide et stable depuis plus de 4 ans, le mariage reste une option valable. Mais si vous avez le moindre doute sur la stabilité de votre union ou si vous êtes professionnellement autonome, le décret offre une sécurité incomparable.
            </p>
          </Card>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <Button asChild size="lg" className="flex-1">
            <Link to="/quiz">S'entraîner au QCM</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link to="/eligibility">Vérifier mon éligibilité</Link>
          </Button>
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default NaturalisationMariageVsDecret;
