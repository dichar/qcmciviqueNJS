import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecentArticles } from "@/components/blog/RecentArticles";
import { LastUpdatedBadge } from "@/components/seo/LastUpdatedBadge";
import { ArrowRight, Heart, Scale, Users, Landmark, Shield, BookOpen } from "lucide-react";

// Date de dernière mise à jour de cette page pilier
const LAST_UPDATED = "2026-02-01";

const ValeursRepublique = () => {
  return (
    <UnifiedLayout>
      <SEO
        title="Valeurs de la République Française – Guide Naturalisation | QCM Civique"
        description="Liberté, Égalité, Fraternité, Laïcité : comprenez les valeurs de la République pour réussir l'examen civique 2026. Explications + essai gratuit."
        canonical="/valeurs-republique"
        keywords="valeurs république française, liberté égalité fraternité, laïcité france, examen civique valeurs, naturalisation valeurs"
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span className="mx-2">/</span>
          <span>Valeurs de la République</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-accent" />
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold">Page Pilier</span>
            </div>
            <LastUpdatedBadge date={LAST_UPDATED} />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Les Valeurs de la République Française : Guide Complet pour la Naturalisation
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Les valeurs républicaines sont au cœur de l'identité française. Elles représentent environ 30% des questions de l'examen civique. Maîtrisez-les pour réussir votre naturalisation.
          </p>
        </header>

        <Card className="p-6 mb-10 bg-secondary/50">
          <h2 className="font-bold text-lg mb-4">Sommaire</h2>
          <nav className="grid md:grid-cols-2 gap-2">
            <a href="#devise" className="text-primary hover:underline">1. La devise : Liberté, Égalité, Fraternité</a>
            <a href="#laicite" className="text-primary hover:underline">2. La laïcité</a>
            <a href="#democratie" className="text-primary hover:underline">3. La démocratie</a>
            <a href="#indivisibilite" className="text-primary hover:underline">4. L'indivisibilité de la République</a>
            <a href="#symboles" className="text-primary hover:underline">5. Les symboles de la République</a>
            <a href="#application" className="text-primary hover:underline">6. Application au quotidien</a>
          </nav>
        </Card>

        <section className="prose prose-lg max-w-none space-y-8">
          
          <section id="devise">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">1. La Devise : Liberté, Égalité, Fraternité</h2>
            </div>
            <p>
              Cette devise, née de la Révolution française, est inscrite dans la Constitution. Elle figure sur les bâtiments publics, les documents officiels et les pièces de monnaie.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 my-6">
              <Card className="p-5 border-t-4 border-t-blue-500">
                <h3 className="font-bold text-lg mb-2">LIBERTÉ</h3>
                <p className="text-sm text-muted-foreground">
                  "La liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui" (Art. 4, DDHC 1789).
                </p>
                <ul className="text-sm mt-3 space-y-1">
                  <li>• Liberté d'expression</li>
                  <li>• Liberté de conscience</li>
                  <li>• Liberté de circulation</li>
                  <li>• Liberté d'association</li>
                </ul>
              </Card>
              <Card className="p-5 border-t-4 border-t-white">
                <h3 className="font-bold text-lg mb-2">ÉGALITÉ</h3>
                <p className="text-sm text-muted-foreground">
                  "Les hommes naissent et demeurent libres et égaux en droits" (Art. 1, DDHC 1789).
                </p>
                <ul className="text-sm mt-3 space-y-1">
                  <li>• Égalité devant la loi</li>
                  <li>• Égalité d'accès aux emplois publics</li>
                  <li>• Égalité femmes-hommes</li>
                  <li>• Non-discrimination</li>
                </ul>
              </Card>
              <Card className="p-5 border-t-4 border-t-red-500">
                <h3 className="font-bold text-lg mb-2">FRATERNITÉ</h3>
                <p className="text-sm text-muted-foreground">
                  Solidarité entre les citoyens. Ajoutée officiellement à la devise en 1848.
                </p>
                <ul className="text-sm mt-3 space-y-1">
                  <li>• Solidarité nationale</li>
                  <li>• Protection sociale</li>
                  <li>• Entraide</li>
                  <li>• Cohésion sociale</li>
                </ul>
              </Card>
            </div>
          </section>

          <section id="laicite">
            <div className="flex items-center gap-3 mb-4">
              <Landmark className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">2. La Laïcité</h2>
            </div>
            <p>
              La laïcité est un principe fondamental de la République française depuis la <strong>loi du 9 décembre 1905</strong>. Elle garantit la liberté de conscience et la neutralité de l'État.
            </p>
            
            <Card className="p-6 my-6 bg-primary/5 border-primary/20">
              <h4 className="font-bold mb-3">Les 3 piliers de la laïcité :</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <strong>Liberté de conscience</strong>
                    <p className="text-sm text-muted-foreground">Chacun est libre de croire ou de ne pas croire.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <strong>Séparation des Églises et de l'État</strong>
                    <p className="text-sm text-muted-foreground">L'État ne finance ni ne reconnaît aucun culte.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <strong>Neutralité de l'État</strong>
                    <p className="text-sm text-muted-foreground">Les agents publics ne manifestent pas leurs convictions religieuses.</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <p>
              <strong>Attention</strong> : La laïcité ne signifie pas l'interdiction de la religion. Elle protège la liberté religieuse tout en garantissant que l'État reste neutre.
            </p>
          </section>

          <section id="democratie">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold m-0">3. La Démocratie</h2>
            </div>
            <p>
              La France est une <strong>démocratie représentative</strong>. Le pouvoir appartient au peuple qui l'exerce par ses représentants élus et par le référendum.
            </p>
            <Card className="p-4 my-4">
              <h4 className="font-bold mb-2">Article 2 de la Constitution :</h4>
              <p className="italic text-muted-foreground">
                "Son principe est : gouvernement du peuple, par le peuple et pour le peuple."
              </p>
            </Card>
            <ul className="space-y-2">
              <li><strong>Suffrage universel</strong> : tous les citoyens majeurs peuvent voter</li>
              <li><strong>Pluralisme politique</strong> : plusieurs partis peuvent exister</li>
              <li><strong>Alternance</strong> : les gouvernants changent selon le vote</li>
              <li><strong>Séparation des pouvoirs</strong> : exécutif, législatif, judiciaire</li>
            </ul>
          </section>

          <section id="indivisibilite">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">4. L'Indivisibilité de la République</h2>
            </div>
            <p>
              L'article 1er de la Constitution proclame que "la France est une République indivisible". Cela signifie :
            </p>
            <ul className="space-y-2 my-4">
              <li><strong>Unité du territoire</strong> : aucune région ne peut faire sécession</li>
              <li><strong>Égalité devant la loi</strong> : la même loi s'applique partout</li>
              <li><strong>Une seule langue officielle</strong> : le français</li>
              <li><strong>Une seule souveraineté</strong> : celle du peuple français</li>
            </ul>
            <p>
              Ce principe n'empêche pas la décentralisation. Les régions, départements et communes s'administrent librement dans le cadre fixé par la loi.
            </p>
          </section>

          <section id="symboles">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold m-0">5. Les Symboles de la République</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <Card className="p-4">
                <h4 className="font-bold mb-2">🇫🇷 Le drapeau tricolore</h4>
                <p className="text-sm text-muted-foreground">Bleu, blanc, rouge. Adopté en 1794. Les couleurs symbolisent Paris (bleu et rouge) et la monarchie (blanc).</p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">🎵 La Marseillaise</h4>
                <p className="text-sm text-muted-foreground">Hymne national depuis 1879. Composée en 1792 par Rouget de Lisle. Chant patriotique et révolutionnaire.</p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">👩 Marianne</h4>
                <p className="text-sm text-muted-foreground">Figure allégorique de la République. Porte le bonnet phrygien, symbole de liberté.</p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">📜 La devise</h4>
                <p className="text-sm text-muted-foreground">"Liberté, Égalité, Fraternité" inscrite sur les édifices publics depuis 1880.</p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">🐓 Le coq gaulois</h4>
                <p className="text-sm text-muted-foreground">Symbole de fierté nationale. Présent sur les grilles de l'Élysée.</p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">📅 Le 14 juillet</h4>
                <p className="text-sm text-muted-foreground">Fête nationale depuis 1880. Commémore la prise de la Bastille (1789).</p>
              </Card>
            </div>
          </section>

          <section id="application">
            <h2 className="text-2xl font-bold mb-4">6. Application au Quotidien</h2>
            <p>
              Les valeurs républicaines ne sont pas que théoriques. Elles se traduisent concrètement :
            </p>
            <ul className="space-y-2 my-4">
              <li>• <strong>École gratuite et obligatoire</strong> : égalité des chances</li>
              <li>• <strong>Protection sociale</strong> : fraternité et solidarité</li>
              <li>• <strong>Service public</strong> : égal accès pour tous</li>
              <li>• <strong>Vote</strong> : participation démocratique</li>
              <li>• <strong>Respect des lois</strong> : égalité devant la justice</li>
            </ul>
          </section>
        </section>

        {/* CTA */}
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Testez vos connaissances</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link to="/quiz-valeurs-republique">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="font-bold mb-2">Quiz Valeurs de la République</h3>
                <p className="text-sm text-muted-foreground mb-4">20 questions ciblées</p>
                <Button className="w-full">
                  Commencer <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Card>
            </Link>
            <Link to="/qcm-citoyennete-francaise">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="font-bold mb-2">QCM Complet</h3>
                <p className="text-sm text-muted-foreground mb-4">40 questions, conditions réelles</p>
                <Button variant="outline" className="w-full">
                  Lancer le QCM <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Card>
            </Link>
          </div>

          <h3 className="font-bold mb-4">Continuez votre préparation</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link to="/histoire-france" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Histoire de France
            </Link>
            <Link to="/droits-devoirs" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Droits et Devoirs
            </Link>
            <Link to="/institutions-francaises" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Institutions françaises
            </Link>
            <Link to="/blog/valeurs-republique-expliquees" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Article détaillé
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
                  "name": "Quelles sont les valeurs de la République française ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Les valeurs fondamentales de la République française sont : Liberté, Égalité, Fraternité (la devise nationale), la Laïcité (séparation des Églises et de l'État depuis 1905), la Démocratie (gouvernement du peuple) et l'Indivisibilité de la République."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Qu'est-ce que la laïcité en France ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La laïcité est un principe fondamental depuis la loi du 9 décembre 1905. Elle garantit la liberté de conscience, la séparation des Églises et de l'État, et la neutralité de l'État. Chacun est libre de croire ou de ne pas croire."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quels sont les symboles de la République française ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Les symboles de la République sont : le drapeau tricolore (bleu, blanc, rouge), La Marseillaise (hymne national), Marianne (figure allégorique), la devise 'Liberté, Égalité, Fraternité', le coq gaulois, et le 14 juillet (fête nationale)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Que signifie la devise 'Liberté, Égalité, Fraternité' ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La Liberté permet de faire tout ce qui ne nuit pas à autrui. L'Égalité signifie que tous les hommes naissent égaux en droits. La Fraternité est la solidarité entre citoyens, ajoutée officiellement en 1848."
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

export default ValeursRepublique;
