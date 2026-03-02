import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Scale, Vote, Briefcase, Heart, Shield, BookOpen } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";

const DroitsDevoirsCitoyensFrancais = () => {
  return (
    <UnifiedLayout>
      <SEO 
        title="Droits et Devoirs des Citoyens Français : Guide pour l'Examen Civique"
        description="Découvrez les droits et devoirs des citoyens français : droit de vote, égalité, éducation, impôts, défense. Essentiels pour réussir l'examen civique 2026."
        canonical="/blog/droits-devoirs-citoyens-francais"
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
              Citoyenneté
            </span>
            <span>•</span>
            <time dateTime="2025-12-18">18 décembre 2025</time>
            <span>•</span>
            <span>10 min de lecture</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Droits et Devoirs des Citoyens Français : À Connaître Avant l'Examen Civique
          </h1>
          <p className="text-xl text-muted-foreground">
            La citoyenneté française s'accompagne de droits fondamentaux et de devoirs envers la société. Ces connaissances sont essentielles pour l'examen civique 2026.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
              Les Droits Fondamentaux
            </h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <Vote className="w-6 h-6 text-blue-600" />
                  Droits Civiques et Politiques
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Droit de vote :</strong> Participer aux élections (présidentielles, législatives, municipales, européennes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Éligibilité :</strong> Se présenter à des élections et exercer des fonctions politiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Accès à la fonction publique :</strong> Postuler aux emplois de l'État</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <Scale className="w-6 h-6 text-purple-600" />
                  Droits et Libertés Individuels
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Liberté d'expression :</strong> S'exprimer librement dans le respect de la loi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Liberté de conscience :</strong> Croire ou ne pas croire, choisir sa religion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Liberté d'association :</strong> Créer ou rejoindre des associations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Liberté de circulation :</strong> Se déplacer librement sur le territoire</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <Heart className="w-6 h-6 text-red-600" />
                  Droits Sociaux
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Droit à l'éducation :</strong> Accès gratuit à l'école publique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Droit à la santé :</strong> Accès aux soins via la Sécurité sociale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Protection sociale :</strong> Allocations, retraites, assurance chômage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Droit au travail :</strong> 30 jours de congés payés, SMIC garanti</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
              <Shield className="w-8 h-8 text-primary" />
              Les Devoirs du Citoyen
            </h2>
            
            <div className="space-y-6">
              <Card className="p-6 border-l-4 border-l-primary">
                <h3 className="font-bold text-lg mb-3">Respecter les Lois</h3>
                <p className="text-muted-foreground">
                  Tout citoyen doit respecter les lois de la République. La loi est la même pour tous et s'applique à tous sans distinction.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-blue-500">
                <h3 className="font-bold text-lg mb-3">Payer ses Impôts</h3>
                <p className="text-muted-foreground">
                  Contribuer aux dépenses publiques en fonction de ses moyens. L'impôt finance les services publics : écoles, hôpitaux, routes, sécurité.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-green-500">
                <h3 className="font-bold text-lg mb-3">Participer à la Défense Nationale</h3>
                <p className="text-muted-foreground">
                  Depuis 1997, le service militaire n'est plus obligatoire, mais la Journée Défense et Citoyenneté (JDC) est obligatoire pour tous les jeunes de 16 à 25 ans.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-orange-500">
                <h3 className="font-bold text-lg mb-3">Voter (Devoir Civique)</h3>
                <p className="text-muted-foreground">
                  Bien que non obligatoire légalement, le vote est considéré comme un devoir civique essentiel. C'est le moyen d'exprimer sa voix et de participer à la démocratie.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-purple-500">
                <h3 className="font-bold text-lg mb-3">Scolariser ses Enfants</h3>
                <p className="text-muted-foreground">
                  L'instruction est obligatoire pour tous les enfants de 3 à 16 ans. Les parents doivent s'assurer que leurs enfants reçoivent une éducation.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-red-500">
                <h3 className="font-bold text-lg mb-3">Respecter les Valeurs Républicaines</h3>
                <p className="text-muted-foreground">
                  Adhérer aux principes de Liberté, Égalité, Fraternité et Laïcité. Respecter l'égalité homme-femme et refuser toute discrimination.
                </p>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Chiffres Clés à Retenir</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">30 jours</div>
                <div className="text-muted-foreground">Congés payés par an</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">16 ans</div>
                <div className="text-muted-foreground">Âge fin de scolarité obligatoire</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">18 ans</div>
                <div className="text-muted-foreground">Âge du droit de vote</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">3 ans</div>
                <div className="text-muted-foreground">Début de la scolarité obligatoire</div>
              </Card>
            </div>
          </section>

          <section className="mb-12 bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Le vote est-il obligatoire en France ?</h3>
                <p className="text-muted-foreground">Non, le vote n'est pas obligatoire légalement, mais c'est un devoir civique fortement encouragé.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">À quel âge peut-on voter ?</h3>
                <p className="text-muted-foreground">À partir de 18 ans, à condition d'être inscrit sur les listes électorales.</p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Le service militaire existe-t-il encore ?</h3>
                <p className="text-muted-foreground">Non, le service militaire obligatoire a été suspendu en 1997. Cependant, la Journée Défense et Citoyenneté (JDC) reste obligatoire.</p>
              </div>
            </div>
          </section>
        </div>

        <Card className="p-8 bg-primary/5 border-primary/20 mt-12">
          <h2 className="text-2xl font-bold mb-4">Testez vos connaissances</h2>
          <p className="text-muted-foreground mb-6">
            Ces droits et devoirs sont au programme de l'examen civique. Entraînez-vous maintenant.
          </p>
          <Button asChild size="lg">
            <Link to="/quiz">Lancer un essai gratuit</Link>
          </Button>
        </Card>

        <div className="flex justify-center mt-8">
          <ShareButtons 
            title="Droits et Devoirs des Citoyens Français"
            description="Guide pour l'examen civique 2026"
            compact={false}
          />
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default DroitsDevoirsCitoyensFrancais;
