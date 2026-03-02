import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Flag, Music, User, Star } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";

const SymbolesFranceDrapeauMarseillaise = () => {
  return (
    <UnifiedLayout>
      <SEO 
        title="Symboles de la France : Drapeau, Marseillaise, Marianne et Devises"
        description="Découvrez les symboles officiels de la République française : drapeau tricolore, Marseillaise, Marianne, devise et 14 juillet. Essentiels pour l'examen civique."
        canonical="/blog/symboles-france-drapeau-marseillaise"
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
              Culture
            </span>
            <span>•</span>
            <time dateTime="2025-12-18">18 décembre 2025</time>
            <span>•</span>
            <span>8 min de lecture</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Les Symboles de la France : Drapeau, Marseillaise, Marianne et Devises Républicaines
          </h1>
          <p className="text-xl text-muted-foreground">
            Connaître les symboles de la République française est essentiel pour l'examen civique 2026. Ce guide vous présente chaque symbole et son histoire.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <Card className="p-8">
              <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
                <Flag className="w-8 h-8 text-blue-600" />
                Le Drapeau Tricolore
              </h2>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-24 w-36 rounded overflow-hidden shadow-lg">
                  <div className="w-1/3 bg-blue-600"></div>
                  <div className="w-1/3 bg-white"></div>
                  <div className="w-1/3 bg-red-600"></div>
                </div>
                <div>
                  <p className="font-bold">Bleu, Blanc, Rouge</p>
                  <p className="text-muted-foreground text-sm">Symbole de la nation française</p>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-3">Origine et Signification</h3>
              <p className="text-muted-foreground mb-4">
                Le drapeau tricolore est né pendant la Révolution française. Il combine les couleurs de Paris (bleu et rouge) avec le blanc de la monarchie, symbolisant la réconciliation entre le roi et le peuple.
              </p>

              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-medium mb-2">À retenir pour l'examen :</p>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Bleu et Rouge : couleurs de Paris</li>
                  <li>• Blanc : couleur traditionnelle du Roi</li>
                  <li>• Symbolise l'unité nationale et la réconciliation</li>
                </ul>
              </div>
            </Card>
          </section>

          <section className="mb-12">
            <Card className="p-8">
              <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
                <Music className="w-8 h-8 text-red-600" />
                La Marseillaise
              </h2>
              
              <h3 className="font-bold text-lg mb-3">Histoire</h3>
              <p className="text-muted-foreground mb-4">
                Composée en 1792 par Claude Joseph Rouget de Lisle à Strasbourg, la Marseillaise est un chant révolutionnaire écrit pour l'Armée du Rhin. Elle doit son nom aux fédérés marseillais qui l'ont popularisée en entrant à Paris.
              </p>

              <h3 className="font-bold text-lg mb-3">Statut</h3>
              <p className="text-muted-foreground mb-4">
                Hymne national depuis 1879, elle est jouée lors des cérémonies officielles, événements sportifs internationaux et commémorations nationales.
              </p>

              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-medium mb-2">À retenir pour l'examen :</p>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Composée en 1792 par Rouget de Lisle</li>
                  <li>• Hymne national officiel depuis 1879</li>
                  <li>• Chant révolutionnaire de l'Armée du Rhin</li>
                </ul>
              </div>
            </Card>
          </section>

          <section className="mb-12">
            <Card className="p-8">
              <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
                <User className="w-8 h-8 text-primary" />
                Marianne
              </h2>
              
              <h3 className="font-bold text-lg mb-3">Symbole de la République</h3>
              <p className="text-muted-foreground mb-4">
                Marianne est la figure allégorique de la République française. Elle incarne les valeurs de Liberté et de Raison. Son buste est présent dans toutes les mairies de France et sur les timbres-poste.
              </p>

              <h3 className="font-bold text-lg mb-3">Représentation</h3>
              <p className="text-muted-foreground mb-4">
                Marianne est représentée comme une femme coiffée d'un bonnet phrygien, symbole de liberté hérité de l'Antiquité romaine. Elle porte parfois les couleurs nationales.
              </p>

              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-medium mb-2">À retenir pour l'examen :</p>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Figure allégorique de la République</li>
                  <li>• Coiffée du bonnet phrygien (symbole de liberté)</li>
                  <li>• Présente dans toutes les mairies et sur les timbres</li>
                </ul>
              </div>
            </Card>
          </section>

          <section className="mb-12">
            <Card className="p-8">
              <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
                <Star className="w-8 h-8 text-yellow-500" />
                La Devise : Liberté, Égalité, Fraternité
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold text-xl mb-2 text-blue-700">Liberté</h3>
                  <p className="text-sm text-muted-foreground">
                    Le droit d'agir, penser et s'exprimer sans contrainte (dans le respect de la loi)
                  </p>
                </div>
                <div className="text-center p-4 bg-white border rounded-lg">
                  <h3 className="font-bold text-xl mb-2">Égalité</h3>
                  <p className="text-sm text-muted-foreground">
                    Tous les citoyens sont égaux devant la loi, sans distinction
                  </p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <h3 className="font-bold text-xl mb-2 text-red-700">Fraternité</h3>
                  <p className="text-sm text-muted-foreground">
                    Le sentiment de solidarité entre les citoyens
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground">
                Cette devise est inscrite sur les frontons des bâtiments publics et figure sur les documents officiels. Elle résume les valeurs fondamentales de la République française.
              </p>
            </Card>
          </section>

          <section className="mb-12">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Le 14 Juillet : Fête Nationale</h2>
              
              <h3 className="font-bold text-lg mb-3">Pourquoi le 14 Juillet ?</h3>
              <p className="text-muted-foreground mb-4">
                Le 14 juillet commémore deux événements : la Prise de la Bastille (1789), symbole de la fin de l'absolutisme, et la Fête de la Fédération (1790), célébrant l'unité de la nation.
              </p>

              <h3 className="font-bold text-lg mb-3">Célébrations</h3>
              <p className="text-muted-foreground mb-4">
                Le défilé militaire sur les Champs-Élysées, les bals populaires, et les feux d'artifice dans toute la France marquent cette journée nationale.
              </p>

              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-medium mb-2">À retenir pour l'examen :</p>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• 14 juillet 1789 : Prise de la Bastille</li>
                  <li>• 14 juillet 1790 : Fête de la Fédération</li>
                  <li>• Fête nationale depuis 1880</li>
                </ul>
              </div>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Autres Symboles Importants</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">Le Coq Gaulois</h3>
                <p className="text-muted-foreground text-sm">
                  Symbole de vigilance et de fierté, le coq est associé à la France depuis l'Antiquité. Il figure sur les maillots des équipes de France.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">Le Sceau de la République</h3>
                <p className="text-muted-foreground text-sm">
                  Le Grand Sceau de France représente la Liberté assise tenant un faisceau de licteur, symbole de l'autorité et de l'unité.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">Le Faisceau de Licteur</h3>
                <p className="text-muted-foreground text-sm">
                  Hérité de Rome antique, il symbolise l'unité et la force collective. On le retrouve sur de nombreux documents officiels.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">Le Bonnet Phrygien</h3>
                <p className="text-muted-foreground text-sm">
                  Symbole de liberté depuis la Rome antique, il coiffe Marianne et représente l'émancipation du peuple.
                </p>
              </Card>
            </div>
          </section>
        </div>

        <Card className="p-8 bg-primary/5 border-primary/20 mt-12">
          <h2 className="text-2xl font-bold mb-4">Testez vos connaissances</h2>
          <p className="text-muted-foreground mb-6">
            Ces symboles font partie des questions de l'examen civique. Entraînez-vous maintenant.
          </p>
          <Button asChild size="lg">
            <Link to="/quiz">Lancer un essai gratuit</Link>
          </Button>
        </Card>

        <div className="flex justify-center mt-8">
          <ShareButtons 
            title="Symboles de la France"
            description="Drapeau, Marseillaise, Marianne et devises républicaines"
            compact={false}
          />
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default SymbolesFranceDrapeauMarseillaise;
