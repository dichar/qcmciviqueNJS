import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Flag, Scale, MapPin, Users } from "lucide-react";

const ResumeLivretCitoyen2026 = () => {
  return (
    <UnifiedLayout>
      <SEO title="Résumé Livret du Citoyen 2026 : L'Essentiel pour l'Examen" description="Résumé complet du Livret du Citoyen 2026. Dates clés, symboles, valeurs républicaines. Fiche de révision pour l'examen civique et l'entretien." canonical="/blog/resume-livret-citoyen-2026" type="article" keywords="livret citoyen 2026, résumé livret citoyen, révision examen civique, dates clés naturalisation" />
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6"><ArrowLeft className="w-4 h-4" /> Retour au blog</Link>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Fiche Révision</span>
            <span className="text-muted-foreground text-sm">8 min</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Livret du Citoyen 2026 : La "Bible" de votre Naturalisation</h1>
          <p className="text-lg text-muted-foreground">Le Livret du Citoyen est le programme officiel de l'examen civique. Toutes les questions sont tirées de ce document.</p>
        </header>
        <section className="prose prose-lg max-w-none">
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="p-4"><h3 className="font-bold flex items-center gap-2 mb-2"><BookOpen className="w-5 h-5 text-primary" />Axe 1 : Histoire</h3><p className="text-sm text-muted-foreground">Construction de la France, Révolution 1789, Guerres mondiales, Vème République</p></Card>
            <Card className="p-4"><h3 className="font-bold flex items-center gap-2 mb-2"><Flag className="w-5 h-5 text-blue-500" />Axe 2 : Symboles</h3><p className="text-sm text-muted-foreground">Drapeau tricolore, Marseillaise, 14 Juillet, Marianne</p></Card>
            <Card className="p-4"><h3 className="font-bold flex items-center gap-2 mb-2"><Scale className="w-5 h-5 text-yellow-500" />Axe 3 : Laïcité</h3><p className="text-sm text-muted-foreground">Loi 1905, Séparation Église/État, Liberté de croire</p></Card>
            <Card className="p-4"><h3 className="font-bold flex items-center gap-2 mb-2"><MapPin className="w-5 h-5 text-green-500" />Axe 4 : Europe/Monde</h3><p className="text-sm text-muted-foreground">UE, Francophonie, Conseil de Sécurité ONU</p></Card>
          </div>
          <Card className="p-6 bg-primary/5 my-6">
            <h3 className="font-bold mb-3">Dates clés à retenir</h3>
            <ul className="text-sm space-y-1">
              <li>• 1789 : Révolution française</li>
              <li>• 1848 : Abolition esclavage</li>
              <li>• 1905 : Loi de séparation</li>
              <li>• 1944 : Vote des femmes</li>
              <li>• 1958 : Vème République</li>
              <li>• 1981 : Abolition peine de mort</li>
            </ul>
          </Card>
        </section>
        <div className="flex gap-4 mt-12">
          <Button asChild size="lg" className="flex-1"><Link to="/livret-citoyen">Consulter le Livret complet</Link></Button>
          <Button asChild variant="outline" size="lg" className="flex-1"><Link to="/quiz">S'entraîner au QCM</Link></Button>
        </div>
      </article>
    </UnifiedLayout>
  );
};
export default ResumeLivretCitoyen2026;