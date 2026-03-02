import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, XCircle, AlertTriangle, FileText, Scale, Lightbulb } from "lucide-react";

const MotifsRefusAjournement = () => {
  return (
    <UnifiedLayout>
      <SEO
        title="Refus ou Ajournement de Naturalisation : Motifs et Recours"
        description="Les motifs fréquents de refus et ajournement de naturalisation : ressources insuffisantes, casier judiciaire, insertion professionnelle. Guide des recours."
        canonical="/blog/motifs-refus-ajournement-naturalisation"
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Refus & Recours</span>
            <span className="text-muted-foreground text-sm">15 min de lecture</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Refus ou Ajournement de Naturalisation : Comprendre et Contester
          </h1>
          <p className="text-lg text-muted-foreground">
            Recevoir une décision défavorable n'est pas une fin. Environ 20 à 30% des recours aboutissent si l'argumentation est juridique et factuelle.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Ajournement vs Rejet</h3>
                <p className="text-muted-foreground">
                  <strong>Ajournement</strong> = pause temporaire (souvent 2 ans). Vous pouvez redéposer après amélioration.<br/>
                  <strong>Rejet</strong> = refus définitif. Plus difficile à contester.
                </p>
              </div>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <XCircle className="w-6 h-6 text-red-500" />
            Top 3 des Motifs d'Ajournement en 2025-2026
          </h2>

          <div className="space-y-4 my-6">
            <Card className="p-6 border-l-4 border-red-500">
              <h3 className="font-bold text-lg mb-2">1. "Ressources insuffisantes ou instables"</h3>
              <p className="text-muted-foreground mb-3">
                Le motif roi. L'administration exige une autonomie financière.
              </p>
              <div className="bg-muted p-3 rounded-lg text-sm">
                <p><strong>Le critère SMIC :</strong> Bien qu'aucun texte ne fixe de seuil, la pratique administrative impose souvent le SMIC comme minimum vital.</p>
                <p className="mt-2"><strong>La nature du contrat :</strong> Un CDI est le Graal. L'intérim et les CDD, même bien rémunérés, sont souvent sanctionnés pour "précarité".</p>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-yellow-500">
              <h3 className="font-bold text-lg mb-2">2. "Insertion professionnelle incomplète"</h3>
              <p className="text-muted-foreground">
                Opposé aux jeunes diplômés ou aux travailleurs récents. L'administration dit : "C'est trop tôt, revenez quand vous aurez plus d'ancienneté".
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-orange-500">
              <h3 className="font-bold text-lg mb-2">3. "Comportement fiscal"</h3>
              <p className="text-muted-foreground">
                La moindre dette (P237 non vierge), le moindre retard de déclaration ou majoration (10%) est un motif légitime d'ajournement pour "manque de civisme fiscal".
              </p>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Les Motifs de Rejet (Plus graves)</h2>

          <div className="space-y-4 my-6">
            <Card className="p-4 bg-red-50 dark:bg-red-900/20">
              <h4 className="font-bold mb-2 text-red-700 dark:text-red-400">Défaut d'assimilation</h4>
              <p className="text-sm text-muted-foreground">
                Polygamie, radicalisation, non-respect des principes d'égalité (refus de serrer la main), méconnaissance flagrante de l'histoire/culture lors de l'entretien.
              </p>
            </Card>
            <Card className="p-4 bg-red-50 dark:bg-red-900/20">
              <h4 className="font-bold mb-2 text-red-700 dark:text-red-400">Ordre Public (Casier Judiciaire)</h4>
              <p className="text-sm text-muted-foreground">
                Toute condamnation pénale, même avec sursis, bloque la naturalisation. Même des faits sans condamnation mais inscrits au TAJ peuvent justifier un refus.
              </p>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <Scale className="w-6 h-6 text-primary" />
            La Stratégie du Recours
          </h2>

          <div className="space-y-4 my-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-3">Étape 1 : Le Délai</h3>
              <p className="text-red-600 font-semibold">⏰ 2 mois impératifs à compter de la notification</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-3">Étape 2 : Le Recours Hiérarchique (RAPO)</h3>
              <p className="text-muted-foreground mb-3">
                <strong>Obligatoire.</strong> On écrit au Ministre (Sous-direction de l'accès à la nationalité française - Rezé) pour contester la décision du Préfet.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Comment argumenter ?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Ne pas dire "C'est injuste". <strong>Apporter des faits nouveaux</strong> survenus après la décision ou prouver une erreur d'appréciation.
                </p>
                <p className="text-sm mt-2">
                  <em>Exemple :</em> Refus pour ressources le 1er mars. Vous signez un CDI le 15 mars. Vous faites un recours en joignant le CDI. Le Ministre peut réévaluer.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-3">Étape 3 : Le Recours Contentieux</h3>
              <p className="text-muted-foreground">
                Devant le Tribunal Administratif de Nantes. Complexe, long (18-24 mois), nécessite souvent un avocat.
              </p>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Quand faut-il accepter l'ajournement ?</h2>

          <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 my-6">
            <p className="text-muted-foreground">
              Parfois, le recours est une perte de temps. Si l'ajournement est de 2 ans pour "insertion professionnelle" et que vous êtes effectivement au chômage ou en CDD court, le Ministre confirmera le Préfet.
            </p>
            <p className="mt-3 font-semibold">
              👉 Mieux vaut utiliser ces 2 ans pour stabiliser sa situation et redéposer un dossier inattaquable.
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

export default MotifsRefusAjournement;
