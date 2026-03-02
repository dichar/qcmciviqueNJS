import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Users, BookOpen, Briefcase } from "lucide-react";

const ContratIntegrationRepublicaine = () => {
  return (
    <UnifiedLayout>
      <SEO title="Contrat d'Intégration Républicaine (CIR) : Obligations et Impact" description="Guide complet du CIR : formations civique et linguistique, obligations OFII, impact sur le titre de séjour et la naturalisation." canonical="/blog/contrat-integration-republicaine" />
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6"><ArrowLeft className="w-4 h-4" /> Retour au blog</Link>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Intégration</span>
            <span className="text-muted-foreground text-sm">8 min</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contrat d'Intégration Républicaine (CIR) : La Fondation</h1>
          <p className="text-lg text-muted-foreground">Le CIR est souvent négligé. C'est une erreur stratégique : le non-respect peut bloquer le renouvellement du titre et hanter le dossier de naturalisation.</p>
        </header>
        <section className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">Les 4 Composantes du CIR</h2>
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="p-4"><h4 className="font-bold flex items-center gap-2 mb-2"><BookOpen className="w-5 h-5 text-primary" />Formation Civique</h4><p className="text-sm text-muted-foreground">24h (4 journées) : institutions, santé, travail, histoire</p></Card>
            <Card className="p-4"><h4 className="font-bold flex items-center gap-2 mb-2"><FileText className="w-5 h-5 text-blue-500" />Formation Linguistique</h4><p className="text-sm text-muted-foreground">100 à 600 heures si niveau inférieur à A1</p></Card>
            <Card className="p-4"><h4 className="font-bold flex items-center gap-2 mb-2"><Users className="w-5 h-5 text-green-500" />Entretien de fin</h4><p className="text-sm text-muted-foreground">Bilan avec l'OFII</p></Card>
            <Card className="p-4"><h4 className="font-bold flex items-center gap-2 mb-2"><Briefcase className="w-5 h-5 text-yellow-500" />Accompagnement pro</h4><p className="text-sm text-muted-foreground">Passerelle vers France Travail</p></Card>
          </div>
          <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 my-6">
            <h3 className="font-bold mb-2 text-red-700">⚠️ Impact sur la Naturalisation</h3>
            <p className="text-sm text-muted-foreground">Lors de l'enquête de naturalisation, l'administration vérifie si vous avez respecté votre CIR. Un signalement pour absentéisme, même vieux de 5 ans, peut être un motif d'ajournement.</p>
          </Card>
        </section>
        <div className="flex gap-4 mt-12">
          <Button asChild size="lg" className="flex-1"><Link to="/quiz">S'entraîner au QCM</Link></Button>
        </div>
      </article>
    </UnifiedLayout>
  );
};
export default ContratIntegrationRepublicaine;