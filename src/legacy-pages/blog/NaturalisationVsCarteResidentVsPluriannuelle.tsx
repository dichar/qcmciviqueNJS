import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, Clock, Euro, FileCheck } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";

const NaturalisationVsCarteResidentVsPluriannuelle = () => {
  return (
    <UnifiedLayout>
      <SEO 
        title="Naturalisation vs Carte de Résident vs Pluriannuelle : Comparatif 2026"
        description="Comparez les trois statuts pour s'installer en France : naturalisation, carte de résident 10 ans, carte pluriannuelle. Conditions, droits et exigences 2026."
        canonical="/blog/naturalisation-vs-carte-resident-vs-pluriannuelle"
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
              Comparatif
            </span>
            <span>•</span>
            <time dateTime="2025-12-18">18 décembre 2025</time>
            <span>•</span>
            <span>10 min de lecture</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Naturalisation vs. Carte de Résident vs. Carte Pluriannuelle : Quelle Différence en 2026 ?
          </h1>
          <p className="text-xl text-muted-foreground">
            Trois statuts permettent de s'installer durablement en France, mais avec des implications très différentes. Depuis 2026, l'examen civique devient obligatoire pour les trois.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Tableau Comparatif Complet</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-4 text-left font-bold">Critère</th>
                    <th className="border p-4 text-left font-bold">Pluriannuelle</th>
                    <th className="border p-4 text-left font-bold">Carte Résident</th>
                    <th className="border p-4 text-left font-bold">Naturalisation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-4 font-medium">Durée</td>
                    <td className="border p-4">2-4 ans</td>
                    <td className="border p-4">10 ans</td>
                    <td className="border p-4">Définitif</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border p-4 font-medium">Résidence requise</td>
                    <td className="border p-4">1 an</td>
                    <td className="border p-4">5 ans</td>
                    <td className="border p-4">5 ans (ou 4 si mariage)</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-medium">Examen civique</td>
                    <td className="border p-4"><CheckCircle className="w-5 h-5 text-green-600" /></td>
                    <td className="border p-4"><CheckCircle className="w-5 h-5 text-green-600" /></td>
                    <td className="border p-4"><CheckCircle className="w-5 h-5 text-green-600" /></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border p-4 font-medium">Entretien préfecture</td>
                    <td className="border p-4"><XCircle className="w-5 h-5 text-red-500" /></td>
                    <td className="border p-4"><XCircle className="w-5 h-5 text-red-500" /></td>
                    <td className="border p-4"><CheckCircle className="w-5 h-5 text-green-600" /></td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-medium">Niveau langue</td>
                    <td className="border p-4">A2</td>
                    <td className="border p-4">B1</td>
                    <td className="border p-4">B2</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border p-4 font-medium">Droit de vote</td>
                    <td className="border p-4"><XCircle className="w-5 h-5 text-red-500" /></td>
                    <td className="border p-4"><XCircle className="w-5 h-5 text-red-500" /></td>
                    <td className="border p-4"><CheckCircle className="w-5 h-5 text-green-600" /></td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-medium">Fonction publique</td>
                    <td className="border p-4"><XCircle className="w-5 h-5 text-red-500" /></td>
                    <td className="border p-4"><XCircle className="w-5 h-5 text-red-500" /></td>
                    <td className="border p-4"><CheckCircle className="w-5 h-5 text-green-600" /></td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border p-4 font-medium">Coût</td>
                    <td className="border p-4">75-225€</td>
                    <td className="border p-4">225€</td>
                    <td className="border p-4">~55€</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-medium">Renouvellement</td>
                    <td className="border p-4">Manuel</td>
                    <td className="border p-4">Automatique</td>
                    <td className="border p-4">N/A (définitif)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Comment Choisir ?</h2>
            
            <div className="space-y-6">
              <Card className="p-6 border-l-4 border-l-blue-500">
                <h3 className="font-bold text-lg mb-3">Choisissez la Carte Pluriannuelle si :</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Vous n'avez pas encore 5 ans de résidence en France</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Vous êtes salarié, étudiant, ou en situation de regroupement familial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Vous voulez une première expérience longue durée</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-l-4 border-l-green-500">
                <h3 className="font-bold text-lg mb-3">Choisissez la Carte de Résident si :</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Vous avez 5 ans de résidence régulière</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Vous envisagez de rester longtemps sans forcément devenir citoyen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Vous souhaitez une plus grande stabilité juridique</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-l-4 border-l-primary">
                <h3 className="font-bold text-lg mb-3">Choisissez la Naturalisation si :</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Vous voulez vraiment devenir citoyen français</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Vous envisagez une participation active à la vie politique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Vous voulez transmettre la nationalité à vos enfants</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          <section className="mb-12 bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Dois-je d'abord prendre la pluriannuelle avant la carte de résident ?</h3>
                <p className="text-muted-foreground">Non, vous pouvez sauter l'étape de la pluriannuelle si vous avez 5 ans de résidence.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Que se passe-t-il si j'échoue l'examen civique pour la naturalisation ?</h3>
                <p className="text-muted-foreground">Vous pouvez représenter l'examen autant de fois que nécessaire. L'échec n'entraîne pas un rejet automatique.</p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Puis-je garder ma première nationalité si je deviens français ?</h3>
                <p className="text-muted-foreground">La France reconnaît la double nationalité. Vérifiez auprès de votre pays d'origine.</p>
              </div>
            </div>
          </section>
        </div>

        <Card className="p-8 bg-primary/5 border-primary/20 mt-12">
          <h2 className="text-2xl font-bold mb-4">Préparez-vous à l'examen civique</h2>
          <p className="text-muted-foreground mb-6">
            Quel que soit votre choix, l'examen civique est obligatoire. Entraînez-vous dès maintenant.
          </p>
          <Button asChild size="lg">
            <Link to="/quiz">Commencer le QCM</Link>
          </Button>
        </Card>

        <div className="flex justify-center mt-8">
          <ShareButtons 
            title="Naturalisation vs Carte de Résident vs Pluriannuelle"
            description="Comparatif complet des trois statuts en France"
            compact={false}
          />
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default NaturalisationVsCarteResidentVsPluriannuelle;
