import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Scale, CheckCircle, Clock, Globe, AlertTriangle } from "lucide-react";

const CartePluriannuelleVsResident = () => {
  return (
    <UnifiedLayout>
      <SEO
        title="Carte Pluriannuelle ou Carte de Résident 10 ans : Quelle Stratégie en 2026 ?"
        description="Comparatif complet carte de séjour pluriannuelle vs carte de résident 10 ans. Niveau A2 vs B1, examen civique, avantages et stratégies pour 2026."
        canonical="/blog/carte-pluriannuelle-vs-resident"
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Comparatif</span>
            <span className="text-muted-foreground text-sm">10 min de lecture</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Pluriannuelle (4 ans) ou Résident (10 ans) : Que Choisir en 2026 ?
          </h1>
          <p className="text-lg text-muted-foreground">
            Le renouvellement de titre de séjour n'est plus une formalité automatique. Découvrez la meilleure stratégie selon votre profil.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Nouveau en 2026</h3>
                <p className="text-muted-foreground">
                  Avec l'introduction des exigences de langue (A2 pour la CSP, B1 pour la CR) et l'examen civique obligatoire, chaque renouvellement devient un <strong>examen de passage</strong>.
                </p>
              </div>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <Scale className="w-6 h-6 text-primary" />
            Tableau Comparatif : CSP vs Carte de Résident
          </h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Critère</th>
                  <th className="border border-border p-3 text-left">Carte Pluriannuelle (CSP)</th>
                  <th className="border border-border p-3 text-left">Carte de Résident (CR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 font-semibold">Durée</td>
                  <td className="border border-border p-3">4 ans (parfois 2 ans)</td>
                  <td className="border border-border p-3 text-green-600 font-bold">10 ans (renouvelable)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3 font-semibold">Niveau Langue 2026</td>
                  <td className="border border-border p-3">A2</td>
                  <td className="border border-border p-3">B1</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-semibold">Examen Civique</td>
                  <td className="border border-border p-3">Obligatoire (Mention CSP)</td>
                  <td className="border border-border p-3">Obligatoire (Mention CR - 80%)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3 font-semibold">Stabilité du droit</td>
                  <td className="border border-border p-3 text-yellow-600">Moyenne - liée au motif</td>
                  <td className="border border-border p-3 text-green-600">Haute - quasi-permanent</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-semibold">Mobilité UE</td>
                  <td className="border border-border p-3">Limitée à la France</td>
                  <td className="border border-border p-3">RLD-UE : installation possible en UE</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3 font-semibold">Absence tolérée</td>
                  <td className="border border-border p-3">Selon validité</td>
                  <td className="border border-border p-3">Jusqu'à 3 ans (CR) ou 6 ans (RLD-UE)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" />
            La Carte de Résident Longue Durée-UE : Le Sésame méconnu
          </h2>

          <Card className="p-6 my-6 border-2 border-primary">
            <h3 className="font-bold text-lg mb-3">Avantages de la RLD-UE</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <strong>Mobilité intra-européenne</strong>
                  <p className="text-sm text-muted-foreground">Permet de s'installer dans un autre pays de l'UE sans visa long séjour depuis le pays d'origine.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <strong>Condition des 5 ans</strong>
                  <p className="text-sm text-muted-foreground">Accessible après 5 ans de résidence légale et ininterrompue.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
                <div>
                  <strong>Piège des ressources</strong>
                  <p className="text-sm text-muted-foreground">Contrairement à la CR "attaches familiales", la RLD-UE exige des ressources propres (SMIC) et une assurance maladie.</p>
                </div>
              </div>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4">L'impact du Niveau A2 pour la CSP</h2>

          <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 my-6">
            <h3 className="font-bold text-lg mb-3 text-red-700 dark:text-red-400">⚠️ Risque de précarisation</h3>
            <p className="text-muted-foreground">
              Jusqu'à présent, le passage d'une carte 1 an à une pluriannuelle était fluide. Désormais, <strong>l'échec au test A2 bloquera l'accès à la pluriannuelle</strong>. L'étranger restera bloqué sur des cartes temporaires d'un an, ce qui précarise son statut vis-à-vis des employeurs et des propriétaires.
            </p>
            <p className="mt-3 text-sm font-semibold">
              👉 Il est donc urgent de valider ce A2 dès la première année de séjour.
            </p>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4">Conseils Stratégiques pour 2026</h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="p-4 border-2 border-green-500">
              <h4 className="font-bold mb-2 text-green-600">✅ Le pari du B1</h4>
              <p className="text-sm text-muted-foreground">
                Si vous avez un niveau de français correct, <strong>visez directement la Carte de Résident (B1)</strong>. L'effort administratif est similaire, mais la récompense (10 ans de tranquillité) est sans commune mesure.
              </p>
            </Card>
            <Card className="p-4 border-2 border-yellow-500">
              <h4 className="font-bold mb-2 text-yellow-600">💰 Anticipez les timbres</h4>
              <p className="text-sm text-muted-foreground">
                Le coût est élevé : <strong>225€</strong> de timbres fiscaux à prévoir dans votre budget.
              </p>
            </Card>
          </div>

          <Card className="p-6 bg-primary/5 border-primary/20 my-8">
            <h3 className="font-bold text-lg mb-3">Notre recommandation</h3>
            <p className="text-muted-foreground">
              Si vous résidez en France depuis plus de 5 ans et que votre niveau de français est correct (B1), privilégiez la <strong>Carte de Résident</strong> ou la <strong>RLD-UE</strong>. La sécurité juridique sur 10 ans et la possibilité de mobilité européenne valent l'effort supplémentaire de préparation.
            </p>
          </Card>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <Button asChild size="lg" className="flex-1">
            <Link to="/quiz">S'entraîner au QCM Civique</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link to="/eligibility">Vérifier mon éligibilité</Link>
          </Button>
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default CartePluriannuelleVsResident;
