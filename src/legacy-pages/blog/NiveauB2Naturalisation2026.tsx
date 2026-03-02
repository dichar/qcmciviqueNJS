import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Languages, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const NiveauB2Naturalisation2026 = () => {
  return (
    <UnifiedLayout>
      <SEO
        title="Niveau B2 Naturalisation 2026 : Quels Tests Choisir ? (TCF, DELF, TEF)"
        description="Le niveau B2 devient obligatoire pour la naturalisation en 2026. Comparatif TCF IRN, DELF, TEF : avantages, inconvénients, dispenses et stratégies de préparation."
        canonical="/blog/niveau-b2-naturalisation-2026"
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Langue</span>
            <span className="text-muted-foreground text-sm">12 min de lecture</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Niveau B2 Naturalisation 2026 : Quels Tests de Langue Choisir ?
          </h1>
          <p className="text-lg text-muted-foreground">
            Le décret n° 2025-648 relève l'exigence de B1 à B2. Comprenez ce changement majeur et choisissez le test le plus adapté à votre profil.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Changement majeur en 2026</h3>
                <p className="text-muted-foreground">
                  Le décret n° 2025-648 modifie l'article 37 : la référence "B1" est remplacée par <strong>"B2"</strong> à compter du 1er janvier 2026. Ce n'est pas un détail administratif, c'est un <strong>filtre social</strong>.
                </p>
              </div>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <Languages className="w-6 h-6 text-primary" />
            Comprendre le saut du B1 au B2 (Cadre CECRL)
          </h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="p-6 border-2 border-yellow-400">
              <h3 className="font-bold text-lg mb-3 text-yellow-600">B1 (Seuil)</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Raconter un événement</li>
                <li>• Exprimer un souhait</li>
                <li>• Comprendre les points essentiels d'une discussion standard</li>
              </ul>
              <p className="text-xs mt-3 italic">"Débrouillardise" quotidienne</p>
            </Card>
            <Card className="p-6 border-2 border-primary">
              <h3 className="font-bold text-lg mb-3 text-primary">B2 (Avancé/Indépendant)</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Comprendre des conférences et discours longs</li>
                <li>• Écrire des textes clairs et détaillés</li>
                <li>• Défendre une opinion avec des arguments</li>
              </ul>
              <p className="text-xs mt-3 italic">Capacité à argumenter et nuancer</p>
            </Card>
          </div>

          <p className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            💡 <strong>Insight :</strong> Pour la naturalisation, cela signifie que lors de l'entretien, l'agent attendra des phrases complexes (subordonnées, hypothèses) et non plus des phrases simples.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Comparatif des Tests Acceptés en 2026</h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Test</th>
                  <th className="border border-border p-3 text-left">Organisme</th>
                  <th className="border border-border p-3 text-left">Validité</th>
                  <th className="border border-border p-3 text-left">Avantages</th>
                  <th className="border border-border p-3 text-left">Inconvénients</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 font-semibold">TCF IRN</td>
                  <td className="border border-border p-3">France Éducation International</td>
                  <td className="border border-border p-3">2 ans</td>
                  <td className="border border-border p-3 text-green-600">Format court (1h35), ciblé, résultats rapides</td>
                  <td className="border border-border p-3 text-red-600">Validité courte</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3 font-semibold">DELF B2</td>
                  <td className="border border-border p-3">Ministère Éducation</td>
                  <td className="border border-border p-3 text-green-600 font-bold">À vie</td>
                  <td className="border border-border p-3 text-green-600">Diplôme prestigieux, pas de péremption</td>
                  <td className="border border-border p-3 text-red-600">Plus académique, taux d'échec plus élevé</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-semibold">TEF IRN</td>
                  <td className="border border-border p-3">CCI Paris</td>
                  <td className="border border-border p-3">2 ans</td>
                  <td className="border border-border p-3 text-green-600">Flexibilité des dates, format numérique</td>
                  <td className="border border-border p-3 text-red-600">Validité courte</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Les Cas de Dispense</h2>

          <div className="space-y-4 my-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <strong>Diplômes Français :</strong>
                <p className="text-muted-foreground">Avoir obtenu un diplôme au moins de niveau 3 (CAP/BEP) en France dispense du test. <em>Nuance : Si le diplôme est ancien et que le niveau s'est dégradé, l'agent peut demander une vérification lors de l'entretien.</em></p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <strong>Études en Français à l'étranger :</strong>
                <p className="text-muted-foreground">Possible, mais nécessite une attestation de comparabilité (ENIC-NARIC) prouvant que le cursus était francophone.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <strong>Santé/Handicap :</strong>
                <p className="text-muted-foreground">Dispense pour état de santé déficient chronique rendant l'évaluation impossible, sur certificat médical type.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <strong>Âge :</strong>
                <p className="text-muted-foreground">La dispense automatique d'âge pour la langue a été fortement restreinte pour la naturalisation en 2026. Vérifiez la jurisprudence actuelle.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Stratégie : Comment valider son B2 rapidement ?</h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="p-4">
              <h4 className="font-bold mb-2">📚 Préparation spécifique</h4>
              <p className="text-sm text-muted-foreground">Ne pas y aller "au talent". Le format QCM du TCF ou les essais du DELF ont des codes précis à maîtriser.</p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold mb-2">🎤 L'Oral est clé</h4>
              <p className="text-sm text-muted-foreground">C'est souvent l'expression orale qui pêche. Écouter RFI, regarder les JT, pratiquer le débat.</p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold mb-2">📅 Anticipation</h4>
              <p className="text-sm text-muted-foreground">Les délais d'inscription explosent avec la réforme. S'inscrire 3 à 4 mois avant le dépôt du dossier.</p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold mb-2">🎯 Choix stratégique</h4>
              <p className="text-sm text-muted-foreground">DELF B2 si vous avez le temps (valide à vie). TCF/TEF si vous êtes pressé.</p>
            </Card>
          </div>

          <Card className="p-6 bg-primary/5 border-primary/20 my-8">
            <h3 className="font-bold text-lg mb-3">Niveaux de langue requis en 2026</h3>
            <div className="space-y-2">
              <p><strong>Carte pluriannuelle :</strong> Niveau A2</p>
              <p><strong>Carte de résident :</strong> Niveau B1</p>
              <p><strong>Naturalisation :</strong> Niveau <span className="text-primary font-bold">B2</span></p>
            </div>
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

export default NiveauB2Naturalisation2026;
