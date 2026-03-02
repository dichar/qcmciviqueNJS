import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe, CheckCircle, AlertTriangle } from "lucide-react";

const CarteResidentLongueDureeUE = () => {
  return (
    <UnifiedLayout>
      <SEO title="Carte de Résident Longue Durée-UE : Conditions et Mobilité Europe" description="Guide de la carte RLD-UE : conditions d'obtention, avantages de mobilité européenne, différences avec la carte de résident classique." canonical="/blog/carte-resident-longue-duree-ue" />
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6"><ArrowLeft className="w-4 h-4" /> Retour au blog</Link>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Mobilité UE</span>
            <span className="text-muted-foreground text-sm">10 min</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Carte de Résident Longue Durée-UE : Le Sésame pour l'Europe</h1>
          <p className="text-lg text-muted-foreground">Le titre de séjour le plus puissant pour ceux qui visent une carrière européenne.</p>
        </header>
        <section className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-primary" />Conditions d'Obtention</h2>
          <div className="space-y-3 my-6">
            <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 mt-1" /><div><strong>5 ans de résidence</strong> : Légale et ininterrompue (max 10 mois d'absence)</div></div>
            <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 mt-1" /><div><strong>Ressources</strong> : SMIC + Assurance maladie obligatoire</div></div>
            <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 mt-1" /><div><strong>Intégration</strong> : Langue et principes républicains vérifiés</div></div>
          </div>
          <h2 className="text-2xl font-bold mt-8 mb-4">Mobilité Intra-UE : Réalité vs Fantasme</h2>
          <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 my-6">
            <p className="text-muted-foreground mb-3">Ce n'est pas une liberté de circulation totale comme pour un citoyen européen.</p>
            <ul className="text-sm space-y-2">
              <li>✅ Plus besoin de visa de long séjour au départ de France</li>
              <li>⚠️ Vous devez demander un titre local une fois sur place (3 mois)</li>
              <li>✅ L'autre pays ne peut pas vous opposer la situation de l'emploi</li>
            </ul>
            <p className="mt-3 text-sm font-semibold">C'est un "accélérateur" de procédure, pas une suppression de procédure.</p>
          </Card>
          <Card className="p-6 bg-red-50 dark:bg-red-900/20 my-6">
            <h3 className="font-bold mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-500" />Perte du Statut</h3>
            <p className="text-sm text-muted-foreground">Vous perdez ce statut si vous quittez l'UE pendant plus de 12 mois consécutifs.</p>
          </Card>
        </section>
        <div className="flex gap-4 mt-12">
          <Button asChild size="lg" className="flex-1"><Link to="/quiz">S'entraîner au QCM</Link></Button>
          <Button asChild variant="outline" size="lg" className="flex-1"><Link to="/eligibility">Vérifier éligibilité</Link></Button>
        </div>
      </article>
    </UnifiedLayout>
  );
};
export default CarteResidentLongueDureeUE;