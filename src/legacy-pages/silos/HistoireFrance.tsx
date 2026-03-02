import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecentArticles } from "@/components/blog/RecentArticles";
import { LastUpdatedBadge } from "@/components/seo/LastUpdatedBadge";
import { ArrowRight, BookOpen, Crown, Flag, Users, Scale, Calendar } from "lucide-react";

// Date de dernière mise à jour de cette page pilier
const LAST_UPDATED = "2026-02-01";

const HistoireFrance = () => {
  return (
    <UnifiedLayout>
      <SEO
        title="Histoire de France pour la Naturalisation – Tout Savoir | QCM Civique"
        description="Maîtrisez l'histoire de France pour l'examen civique 2026 : Révolution, Républiques, guerres mondiales, construction européenne. Guide complet + essai gratuit."
        canonical="/histoire-france"
        keywords="histoire france naturalisation, examen civique histoire, révolution française, républiques françaises, quiz histoire france"
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span className="mx-2">/</span>
          <span>Histoire de France</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Page Pilier</span>
            </div>
            <LastUpdatedBadge date={LAST_UPDATED} />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Tout Savoir sur l'Histoire de France pour la Naturalisation
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            L'histoire de France représente environ 25% des questions de l'examen civique. Cette page vous guide à travers les événements clés, de la monarchie à la Ve République, pour réussir votre QCM.
          </p>
        </header>

        {/* Table des matières */}
        <Card className="p-6 mb-10 bg-secondary/50">
          <h2 className="font-bold text-lg mb-4">Sommaire</h2>
          <nav className="grid md:grid-cols-2 gap-2">
            <a href="#ancien-regime" className="text-primary hover:underline">1. L'Ancien Régime et la monarchie</a>
            <a href="#revolution" className="text-primary hover:underline">2. La Révolution française (1789)</a>
            <a href="#republiques" className="text-primary hover:underline">3. Les cinq Républiques</a>
            <a href="#guerres" className="text-primary hover:underline">4. Les guerres mondiales</a>
            <a href="#europe" className="text-primary hover:underline">5. La construction européenne</a>
            <a href="#dates-cles" className="text-primary hover:underline">6. Les dates clés à retenir</a>
          </nav>
        </Card>

        <section className="prose prose-lg max-w-none space-y-8">
          
          {/* Section 1 */}
          <section id="ancien-regime">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">1. L'Ancien Régime et la Monarchie</h2>
            </div>
            <p>
              Avant 1789, la France était une <strong>monarchie absolue</strong>. Le roi détenait tous les pouvoirs : législatif, exécutif et judiciaire. La société était divisée en trois ordres : le clergé, la noblesse et le tiers état (97% de la population).
            </p>
            <Card className="p-4 my-4 bg-primary/5 border-primary/20">
              <h4 className="font-bold mb-2">Rois à connaître pour l'examen :</h4>
              <ul className="space-y-1 text-sm">
                <li><strong>Louis XIV (1643-1715)</strong> : Le "Roi Soleil", symbole de l'absolutisme</li>
                <li><strong>Louis XVI (1774-1792)</strong> : Dernier roi avant la Révolution, guillotiné en 1793</li>
              </ul>
            </Card>
            <p>
              Le <strong>Siècle des Lumières</strong> (XVIIIe siècle) voit naître les idées de liberté, d'égalité et de séparation des pouvoirs. Voltaire, Rousseau et Montesquieu préparent intellectuellement la Révolution.
            </p>
          </section>

          {/* Section 2 */}
          <section id="revolution">
            <div className="flex items-center gap-3 mb-4">
              <Flag className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold m-0">2. La Révolution Française (1789)</h2>
            </div>
            <p>
              La Révolution française est l'événement fondateur de la France moderne. Elle met fin à la monarchie absolue et établit les principes qui régissent encore la République aujourd'hui.
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Card className="p-4">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  14 juillet 1789
                </h4>
                <p className="text-sm text-muted-foreground">
                  Prise de la Bastille. Symbole de la chute de l'absolutisme. Cette date devient la fête nationale.
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  26 août 1789
                </h4>
                <p className="text-sm text-muted-foreground">
                  Déclaration des Droits de l'Homme et du Citoyen. Texte fondamental toujours en vigueur.
                </p>
              </Card>
            </div>
            <p>
              La <strong>Déclaration des Droits de l'Homme et du Citoyen</strong> (DDHC) proclame que "les hommes naissent et demeurent libres et égaux en droits". Ce texte est intégré au préambule de la Constitution de 1958.
            </p>
          </section>

          {/* Section 3 */}
          <section id="republiques">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">3. Les Cinq Républiques Françaises</h2>
            </div>
            <p>
              La France a connu cinq républiques, entrecoupées de monarchies et d'empires. Comprendre cette alternance est essentiel pour l'examen civique.
            </p>
            <div className="space-y-4 my-6">
              <Card className="p-4 border-l-4 border-l-blue-500">
                <h4 className="font-bold">Ire République (1792-1804)</h4>
                <p className="text-sm text-muted-foreground">Proclamée après l'abolition de la monarchie. Période de la Terreur puis du Directoire. Se termine avec le coup d'État de Napoléon Bonaparte.</p>
              </Card>
              <Card className="p-4 border-l-4 border-l-blue-600">
                <h4 className="font-bold">IIe République (1848-1852)</h4>
                <p className="text-sm text-muted-foreground">Instaure le suffrage universel masculin et abolit l'esclavage dans les colonies. Louis-Napoléon Bonaparte élu président, puis empereur.</p>
              </Card>
              <Card className="p-4 border-l-4 border-l-blue-700">
                <h4 className="font-bold">IIIe République (1870-1940)</h4>
                <p className="text-sm text-muted-foreground">La plus longue République. École gratuite et obligatoire (lois Ferry 1881-1882). Loi de séparation Églises-État (1905). Victoire en 1918.</p>
              </Card>
              <Card className="p-4 border-l-4 border-l-blue-800">
                <h4 className="font-bold">IVe République (1946-1958)</h4>
                <p className="text-sm text-muted-foreground">Reconstruction après-guerre. Instabilité gouvernementale. Droit de vote des femmes (1944). Débuts de l'Europe (CECA 1951).</p>
              </Card>
              <Card className="p-4 border-l-4 border-l-primary">
                <h4 className="font-bold">Ve République (depuis 1958)</h4>
                <p className="text-sm text-muted-foreground">Fondée par Charles de Gaulle. Régime actuel. Président élu au suffrage universel direct (depuis 1962). Quinquennat (depuis 2000).</p>
              </Card>
            </div>
          </section>

          {/* Section 4 */}
          <section id="guerres">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold m-0">4. Les Guerres Mondiales</h2>
            </div>
            <p>
              Les deux guerres mondiales ont profondément marqué la France et l'Europe. Elles sont au cœur de la construction européenne et des valeurs de paix.
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Card className="p-4">
                <h4 className="font-bold mb-2">Première Guerre mondiale (1914-1918)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 1,4 million de morts français</li>
                  <li>• Armistice : 11 novembre 1918</li>
                  <li>• Traité de Versailles (1919)</li>
                  <li>• Récupération Alsace-Lorraine</li>
                </ul>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">Seconde Guerre mondiale (1939-1945)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Occupation allemande (1940-1944)</li>
                  <li>• Appel du 18 juin 1940 (de Gaulle)</li>
                  <li>• Résistance française</li>
                  <li>• Libération : 1944</li>
                  <li>• Victoire : 8 mai 1945</li>
                </ul>
              </Card>
            </div>
            <p>
              Jean Moulin, chef de la Résistance, est un symbole du courage français. Il a unifié les mouvements de résistance avant d'être arrêté et tué par la Gestapo en 1943.
            </p>
          </section>

          {/* Section 5 */}
          <section id="europe">
            <h2 className="text-2xl font-bold mb-4">5. La Construction Européenne</h2>
            <p>
              Après 1945, la France joue un rôle moteur dans la construction européenne, avec l'objectif de garantir une paix durable.
            </p>
            <ul className="space-y-2 my-4">
              <li><strong>1951</strong> : Communauté Européenne du Charbon et de l'Acier (CECA)</li>
              <li><strong>1957</strong> : Traité de Rome – création de la CEE (6 pays fondateurs)</li>
              <li><strong>1992</strong> : Traité de Maastricht – création de l'Union européenne</li>
              <li><strong>2002</strong> : Mise en circulation de l'Euro</li>
              <li><strong>Aujourd'hui</strong> : 27 États membres</li>
            </ul>
            <p>
              Les <strong>pères fondateurs</strong> à connaître : Robert Schuman, Jean Monnet (France), Konrad Adenauer (Allemagne).
            </p>
          </section>

          {/* Section 6 */}
          <section id="dates-cles">
            <h2 className="text-2xl font-bold mb-4">6. Les Dates Clés à Retenir</h2>
            <Card className="p-6 my-4">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div><strong>1789</strong> : Révolution française, DDHC</div>
                <div><strong>1792</strong> : Ire République</div>
                <div><strong>1848</strong> : Suffrage universel masculin</div>
                <div><strong>1870</strong> : IIIe République</div>
                <div><strong>1881-82</strong> : Lois Ferry (école)</div>
                <div><strong>1905</strong> : Laïcité</div>
                <div><strong>1914-18</strong> : 1re Guerre mondiale</div>
                <div><strong>1939-45</strong> : 2e Guerre mondiale</div>
                <div><strong>1944</strong> : Droit de vote des femmes</div>
                <div><strong>1958</strong> : Ve République</div>
                <div><strong>1962</strong> : Élection présidentielle directe</div>
                <div><strong>2000</strong> : Quinquennat</div>
              </div>
            </Card>
          </section>
        </section>

        {/* CTA et liens internes */}
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Testez vos connaissances</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link to="/quiz-histoire-geographie-france">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="font-bold mb-2">Quiz Histoire & Géographie</h3>
                <p className="text-sm text-muted-foreground mb-4">20 questions sur l'histoire de France</p>
                <Button className="w-full">
                  Commencer le quiz <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Card>
            </Link>
            <Link to="/qcm-citoyennete-francaise">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="font-bold mb-2">QCM Complet (40 questions)</h3>
                <p className="text-sm text-muted-foreground mb-4">Entraînement conditions réelles</p>
                <Button variant="outline" className="w-full">
                  Lancer le QCM <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Card>
            </Link>
          </div>

          <h3 className="font-bold mb-4">Continuez votre préparation</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link to="/valeurs-republique" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Valeurs de la République
            </Link>
            <Link to="/droits-devoirs" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Droits et Devoirs
            </Link>
            <Link to="/institutions-francaises" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Institutions françaises
            </Link>
            <Link to="/blog/examen-civique-guide-complet-2026" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Guide examen 2026
            </Link>
            <Link to="/livret-citoyen" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Livret du Citoyen
            </Link>
          </div>

          {/* Recent Articles for SEO */}
          <RecentArticles limit={4} title="Articles récents sur la naturalisation" />
        </section>

        {/* FAQ Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Quelle est la date de la Révolution française ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La Révolution française a commencé en 1789 avec la prise de la Bastille le 14 juillet 1789 et la Déclaration des Droits de l'Homme et du Citoyen le 26 août 1789."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Combien de Républiques la France a-t-elle connues ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La France a connu 5 Républiques : Ire République (1792-1804), IIe République (1848-1852), IIIe République (1870-1940), IVe République (1946-1958), et Ve République (depuis 1958)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quand a été instauré le suffrage universel en France ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Le suffrage universel masculin a été instauré en 1848 sous la IIe République. Le droit de vote des femmes a été accordé en 1944, avec leur première participation aux élections en 1945."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Qui a fondé la Ve République ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La Ve République a été fondée par Charles de Gaulle en 1958. Elle instaure un régime semi-présidentiel avec un président élu au suffrage universel direct depuis 1962."
                  }
                }
              ]
            })
          }}
        />
      </article>
    </UnifiedLayout>
  );
};

export default HistoireFrance;
