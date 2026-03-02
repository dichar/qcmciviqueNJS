import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, AlertTriangle, BookOpen, FileText, Target } from "lucide-react";
import { TextToSpeech } from "@/components/TextToSpeech";

const ExamenCiviqueGuideComplet2026 = () => {
  return (
    <UnifiedLayout>
      <SEO
        title="Examen Civique 2026 : Réussir le QCM Obligatoire (Guide Complet)"
        description="Guide complet du nouvel examen civique 2026 : format QCM, 40 questions, seuil 80%, décret 2025-647. Tout savoir pour réussir la carte de résident et naturalisation."
        canonical="/blog/examen-civique-guide-complet-2026"
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Guide Officiel</span>
              <span className="text-muted-foreground text-sm">15 min de lecture</span>
            </div>
            <TextToSpeech 
              text="Examen Civique 2026 : Réussir le QCM Obligatoire pour la Carte de Résident et la Naturalisation. Le décret n° 2025-647 révolutionne l'accès aux titres de séjour. Découvrez tout ce qu'il faut savoir sur ce nouvel examen civique obligatoire dès le 1er janvier 2026."
              variant="outline"
              size="sm"
              showLabel
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Examen Civique 2026 : Réussir le QCM Obligatoire pour la Carte de Résident et la Naturalisation
          </h1>
          <p className="text-lg text-muted-foreground">
            Le décret n° 2025-647 révolutionne l'accès aux titres de séjour. Découvrez tout ce qu'il faut savoir sur ce nouvel examen civique obligatoire dès le 1er janvier 2026.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <Card className="p-6 bg-primary/5 border-primary/20 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Changement de paradigme en 2026</h3>
                <p className="text-muted-foreground">
                  Jusqu'en 2025, la formation civique du CIR était validée par simple présence. Dès le 1er janvier 2026, l'État impose une <strong>obligation de résultat</strong>. L'article L. 413-7 du CESEDA conditionne désormais la délivrance des titres à la réussite de cet examen.
                </p>
              </div>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4">Qu'est-ce que l'examen civique selon le décret n° 2025-647 ?</h2>
          
          <p>L'examen prend la forme d'un <strong>Questionnaire à Choix Multiples (QCM)</strong>. Contrairement à l'entretien de naturalisation qui est une discussion ouverte, le QCM est binaire : juste ou faux.</p>

          <Card className="p-6 my-6">
            <h3 className="font-bold text-lg mb-4">La Double Mention (Subtilité Juridique)</h3>
            <p className="text-muted-foreground mb-4">L'article R. 413-12-1 introduit deux niveaux distincts :</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <strong>Mention "Carte de séjour pluriannuelle" (CSP)</strong>
                  <p className="text-sm text-muted-foreground">Niveau de difficulté 1. Requis pour le passage d'un titre annuel à un titre de 4 ans.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <strong>Mention "Carte de résident" (CR)</strong>
                  <p className="text-sm text-muted-foreground">Niveau de difficulté 2. Requis pour la carte de 10 ans et la naturalisation.</p>
                </div>
              </div>
            </div>
            <p className="text-sm mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              💡 <strong>Stratégie :</strong> La réussite au niveau "Carte de résident" valide automatiquement le prérequis pour la carte pluriannuelle.
            </p>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4">Structure de l'Épreuve : 40 Questions pour Convaincre</h2>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="p-4">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Questions de Connaissance (28)
              </h4>
              <p className="text-sm text-muted-foreground">
                Faits objectifs sur l'Histoire, la Géographie et les Institutions. Exemple : "En quelle année a été abolie la peine de mort ?"
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Mises en Situation (12)
              </h4>
              <p className="text-sm text-muted-foreground">
                Évaluation de l'appropriation des valeurs (laïcité, égalité). Exemple : scénarios du quotidien.
              </p>
            </Card>
          </div>

          <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 my-6">
            <h3 className="font-bold text-lg mb-2 text-red-700 dark:text-red-400">⚠️ Seuil Éliminatoire : 80%</h3>
            <p className="text-muted-foreground">
              L'article D. 413-12-2 fixe la barre très haut : <strong>32 bonnes réponses sur 40 exigées</strong>. 
              Cela ne laisse qu'une marge d'erreur de 8 questions. C'est un niveau d'exigence supérieur à celui de l'examen du code de la route (5 fautes sur 40).
            </p>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4">Les 5 Piliers Thématiques du Programme</h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Thématique</th>
                  <th className="border border-border p-3 text-left">Contenus Clés</th>
                  <th className="border border-border p-3 text-left">Importance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 font-semibold">Principes et Valeurs</td>
                  <td className="border border-border p-3 text-sm">Laïcité (loi 1905), Liberté-Égalité-Fraternité, Refus des discriminations</td>
                  <td className="border border-border p-3"><span className="text-red-600 font-semibold">Critique</span></td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3 font-semibold">Institutions</td>
                  <td className="border border-border p-3 text-sm">Rôle du Président, Parlement (bicamérisme), Commune, Départements</td>
                  <td className="border border-border p-3"><span className="text-yellow-600 font-semibold">Moyenne</span></td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-semibold">Histoire & Géographie</td>
                  <td className="border border-border p-3 text-sm">1789, 14-18, 39-45, Vème République, Fleuves, DROM-COM</td>
                  <td className="border border-border p-3"><span className="text-yellow-600 font-semibold">Moyenne</span></td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3 font-semibold">Droits et Devoirs</td>
                  <td className="border border-border p-3 text-sm">Vote, Impôts, Respect des lois, Instruction obligatoire</td>
                  <td className="border border-border p-3"><span className="text-primary font-semibold">Haute</span></td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-semibold">Vivre en Société</td>
                  <td className="border border-border p-3 text-sm">Accès aux soins, Logement, Emploi, Savoir-vivre</td>
                  <td className="border border-border p-3"><span className="text-primary font-semibold">Haute</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Dispenses et Cas Particuliers</h2>
          
          <div className="space-y-4 my-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <strong>Barrière d'Âge :</strong>
                <p className="text-muted-foreground">Les étrangers âgés de plus de 65 ans sont dispensés de cet examen pour la carte de résident.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <strong>Santé et Handicap :</strong>
                <p className="text-muted-foreground">Dispense possible sur présentation d'un certificat médical conforme au modèle fixé par arrêté.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
              <div>
                <strong>Renouvellement :</strong>
                <p className="text-muted-foreground">L'examen n'est pas requis pour le simple renouvellement d'une carte de même nature, mais il l'est pour le changement de catégorie.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Comment se préparer efficacement ?</h2>
          
          <Card className="p-6 my-6">
            <h3 className="font-bold mb-4">Ressources recommandées</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>Plateforme officielle formation-civique.interieur.gouv.fr</span>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>Livret du Citoyen téléchargeable</span>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>QCM Civique pour s'entraîner en conditions réelles</span>
              </li>
            </ul>
            <p className="text-sm mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              ⚠️ <strong>Conseil expert :</strong> Ne pas se fier aux quiz obsolètes d'avant 2024. La réforme a introduit des questions spécifiques sur la "culture de la société française" qui n'existaient pas auparavant.
            </p>
          </Card>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <Button asChild size="lg" className="flex-1">
            <Link to="/quiz">Commencer l'entraînement</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link to="/livret-citoyen">Consulter le Livret du Citoyen</Link>
          </Button>
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default ExamenCiviqueGuideComplet2026;
