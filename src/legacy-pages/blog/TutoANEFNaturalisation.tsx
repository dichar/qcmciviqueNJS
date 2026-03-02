import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Monitor, AlertTriangle, CheckCircle } from "lucide-react";

const TutoANEFNaturalisation = () => {
  return (
    <UnifiedLayout>
      <SEO
        title="Tuto ANEF Naturalisation : Étapes, Bugs et Solutions"
        description="Guide complet de la procédure ANEF pour la naturalisation. Dépôt en ligne, statuts du dossier, bugs fréquents et solutions pour 2026."
        canonical="/blog/tuto-anef-naturalisation"
        type="article"
        keywords="ANEF naturalisation, procédure ANEF, dépôt dossier naturalisation en ligne, bugs ANEF"
      />
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Retour au blog
        </Link>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Tutoriel</span>
            <span className="text-muted-foreground text-sm">10 min</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Tuto ANEF Naturalisation : Guide de Survie</h1>
          <p className="text-lg text-muted-foreground">La dématérialisation via l'ANEF a supprimé les files d'attente physiques mais créé des blocages techniques. Comprendre l'interface est vital.</p>
        </header>
        <section className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2"><Monitor className="w-6 h-6 text-primary" />Étapes du Parcours</h2>
          <div className="space-y-3 my-6">
            <Card className="p-4"><strong>1.</strong> Création de compte via le Numéro Étranger (10 chiffres)</Card>
            <Card className="p-4"><strong>2.</strong> Remplissage : État civil, Parcours résidentiel, Professionnel, Ressources</Card>
            <Card className="p-4"><strong>3.</strong> Pièces Justificatives : Format PDF, nommage clair, taille max 5-10 Mo</Card>
            <Card className="p-4"><strong>4.</strong> Paiement : Timbre fiscal numérique de 55€</Card>
          </div>
          <h2 className="text-2xl font-bold mt-8 mb-4">Décrypter les Statuts</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 mt-1" /><div><strong>"Dépôt confirmé"</strong> : Dossier reçu. Attente.</div></div>
            <div className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" /><div><strong>"Demande de complément"</strong> : CRITIQUE. Délai de 30 jours pour répondre.</div></div>
            <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-blue-500 mt-1" /><div><strong>"Entretien d'assimilation"</strong> : Bonne nouvelle ! Convocation à télécharger.</div></div>
          </div>
          <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 my-6">
            <h3 className="font-bold mb-2">💡 Bugs Fréquents</h3>
            <ul className="text-sm space-y-2">
              <li>• Erreur technique → Changer navigateur, vider cache</li>
              <li>• Blocage État Civil → Utiliser "Je signale une erreur"</li>
              <li>• Contact CCC : 0 806 001 620</li>
            </ul>
          </Card>
        </section>
        <div className="flex gap-4 mt-12">
          <Button asChild size="lg" className="flex-1"><Link to="/quiz">S'entraîner</Link></Button>
        </div>
      </article>
    </UnifiedLayout>
  );
};
export default TutoANEFNaturalisation;