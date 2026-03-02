import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecentArticles } from "@/components/blog/RecentArticles";
import { LastUpdatedBadge } from "@/components/seo/LastUpdatedBadge";
import { ArrowRight, Shield, Gavel, Vote, Coins, Users, FileCheck } from "lucide-react";

// Date de dernière mise à jour de cette page pilier
const LAST_UPDATED = "2026-02-01";

const DroitsDevoirs = () => {
  return (
    <UnifiedLayout>
      <SEO
        title="Droits et Devoirs du Citoyen Français – Guide Naturalisation | QCM Civique"
        description="Droits fondamentaux et devoirs civiques du citoyen français : vote, impôts, service national, libertés. Tout pour réussir l'examen civique 2026."
        canonical="/droits-devoirs"
        keywords="droits citoyen français, devoirs citoyen, vote france, impôts citoyen, naturalisation droits devoirs"
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span className="mx-2">/</span>
          <span>Droits et Devoirs</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Page Pilier</span>
            </div>
            <LastUpdatedBadge date={LAST_UPDATED} />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Droits et Devoirs du Citoyen Français : Guide Complet pour la Naturalisation
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Être citoyen français, c'est bénéficier de droits fondamentaux mais aussi assumer des responsabilités. Ce thème représente environ 20% de l'examen civique.
          </p>
        </header>

        <Card className="p-6 mb-10 bg-secondary/50">
          <h2 className="font-bold text-lg mb-4">Sommaire</h2>
          <nav className="grid md:grid-cols-2 gap-2">
            <a href="#droits-fondamentaux" className="text-primary hover:underline">1. Les droits fondamentaux</a>
            <a href="#droits-politiques" className="text-primary hover:underline">2. Les droits politiques</a>
            <a href="#droits-sociaux" className="text-primary hover:underline">3. Les droits sociaux</a>
            <a href="#devoirs-civiques" className="text-primary hover:underline">4. Les devoirs civiques</a>
            <a href="#devoirs-fiscaux" className="text-primary hover:underline">5. Les devoirs fiscaux</a>
            <a href="#defense-nationale" className="text-primary hover:underline">6. La défense nationale</a>
          </nav>
        </Card>

        <section className="prose prose-lg max-w-none space-y-8">
          
          <section id="droits-fondamentaux">
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">1. Les Droits Fondamentaux</h2>
            </div>
            <p>
              Les droits fondamentaux sont garantis par la <strong>Déclaration des Droits de l'Homme et du Citoyen de 1789</strong>, intégrée au préambule de la Constitution.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Card className="p-4">
                <h4 className="font-bold mb-2">Libertés individuelles</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Liberté d'aller et venir</li>
                  <li>• Sûreté (protection contre l'arbitraire)</li>
                  <li>• Présomption d'innocence</li>
                  <li>• Respect de la vie privée</li>
                  <li>• Inviolabilité du domicile</li>
                </ul>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">Libertés d'expression</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Liberté d'opinion</li>
                  <li>• Liberté de la presse</li>
                  <li>• Liberté de réunion</li>
                  <li>• Liberté d'association</li>
                  <li>• Liberté de manifestation</li>
                </ul>
              </Card>
            </div>

            <Card className="p-4 my-4 bg-accent/10 border-accent/30">
              <h4 className="font-bold mb-2">⚠️ Limites aux libertés</h4>
              <p className="text-sm text-muted-foreground">
                Ces libertés ne sont pas absolues. Elles sont encadrées par la loi pour protéger l'ordre public et les droits d'autrui. Par exemple, la liberté d'expression ne permet pas la diffamation ou l'incitation à la haine.
              </p>
            </Card>
          </section>

          <section id="droits-politiques">
            <div className="flex items-center gap-3 mb-4">
              <Vote className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold m-0">2. Les Droits Politiques</h2>
            </div>
            <p>
              Les droits politiques sont réservés aux citoyens français. C'est une des principales différences avec les résidents étrangers.
            </p>
            
            <div className="space-y-4 my-6">
              <Card className="p-4 border-l-4 border-l-primary">
                <h4 className="font-bold">Le droit de vote</h4>
                <p className="text-sm text-muted-foreground">
                  Tout citoyen français majeur (18 ans) peut voter aux élections nationales (présidentielles, législatives, référendums), locales (municipales, départementales, régionales) et européennes.
                </p>
              </Card>
              <Card className="p-4 border-l-4 border-l-primary">
                <h4 className="font-bold">Le droit d'éligibilité</h4>
                <p className="text-sm text-muted-foreground">
                  Tout citoyen peut se présenter comme candidat à une élection. L'âge minimum varie : 18 ans pour conseiller municipal, 24 ans pour député, 35 ans pour sénateur.
                </p>
              </Card>
              <Card className="p-4 border-l-4 border-l-primary">
                <h4 className="font-bold">L'accès aux emplois publics</h4>
                <p className="text-sm text-muted-foreground">
                  La nationalité française est requise pour certains postes de la fonction publique, notamment ceux touchant à la souveraineté (police, armée, magistrature).
                </p>
              </Card>
            </div>
          </section>

          <section id="droits-sociaux">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">3. Les Droits Sociaux</h2>
            </div>
            <p>
              La France dispose d'un système de <strong>protection sociale</strong> parmi les plus complets au monde, fondé sur le principe de solidarité.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <Card className="p-4">
                <h4 className="font-bold mb-2">🏥 Assurance maladie</h4>
                <p className="text-sm text-muted-foreground">Remboursement des soins médicaux, médicaments, hospitalisations.</p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">👴 Retraite</h4>
                <p className="text-sm text-muted-foreground">Pension versée après la vie active, financée par les cotisations.</p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">👨‍👩‍👧 Allocations familiales</h4>
                <p className="text-sm text-muted-foreground">Aides pour les familles avec enfants (CAF).</p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">🏠 Aide au logement</h4>
                <p className="text-sm text-muted-foreground">APL, ALS pour réduire le coût du logement.</p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">💼 Assurance chômage</h4>
                <p className="text-sm text-muted-foreground">Indemnisation en cas de perte d'emploi.</p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">📚 Droit à l'éducation</h4>
                <p className="text-sm text-muted-foreground">École gratuite et obligatoire de 3 à 16 ans.</p>
              </Card>
            </div>
          </section>

          <section id="devoirs-civiques">
            <div className="flex items-center gap-3 mb-4">
              <FileCheck className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold m-0">4. Les Devoirs Civiques</h2>
            </div>
            <p>
              En contrepartie des droits, le citoyen a des obligations envers la collectivité nationale.
            </p>
            
            <Card className="p-6 my-6 bg-primary/5 border-primary/20">
              <h4 className="font-bold mb-4">Les devoirs essentiels :</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <div>
                    <strong>Respecter les lois</strong>
                    <p className="text-sm text-muted-foreground">Nul n'est censé ignorer la loi. Le non-respect expose à des sanctions.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <div>
                    <strong>Participer à la vie démocratique</strong>
                    <p className="text-sm text-muted-foreground">Le vote est un devoir moral, même s'il n'est pas obligatoire en France.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <div>
                    <strong>Contribuer aux charges publiques</strong>
                    <p className="text-sm text-muted-foreground">Payer ses impôts est une obligation légale.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <div>
                    <strong>Participer à la justice</strong>
                    <p className="text-sm text-muted-foreground">Répondre aux convocations de juré d'assises est obligatoire.</p>
                  </div>
                </li>
              </ul>
            </Card>
          </section>

          <section id="devoirs-fiscaux">
            <div className="flex items-center gap-3 mb-4">
              <Coins className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">5. Les Devoirs Fiscaux</h2>
            </div>
            <p>
              L'article 13 de la DDHC établit que "pour l'entretien de la force publique et pour les dépenses d'administration, une contribution commune est indispensable".
            </p>
            <Card className="p-4 my-4">
              <h4 className="font-bold mb-2">Principaux impôts :</h4>
              <ul className="text-sm space-y-1">
                <li><strong>Impôt sur le revenu (IR)</strong> : progressif selon les revenus</li>
                <li><strong>TVA</strong> : taxe sur la consommation (20% taux normal)</li>
                <li><strong>Taxe foncière</strong> : propriétaires immobiliers</li>
                <li><strong>CSG/CRDS</strong> : contribution sociale sur les revenus</li>
              </ul>
            </Card>
            <p>
              Ces impôts financent les services publics : éducation, santé, sécurité, infrastructures, protection sociale.
            </p>
          </section>

          <section id="defense-nationale">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold m-0">6. La Défense Nationale</h2>
            </div>
            <p>
              Depuis la suspension du service militaire en 1997, le lien entre la nation et son armée est maintenu par la <strong>Journée Défense et Citoyenneté (JDC)</strong>.
            </p>
            <Card className="p-4 my-4 border-l-4 border-l-accent">
              <h4 className="font-bold">La JDC (ex-JAPD)</h4>
              <p className="text-sm text-muted-foreground">
                Obligatoire pour tous les jeunes Français de 16 à 25 ans. Nécessaire pour passer le permis de conduire, le bac ou des concours administratifs.
              </p>
            </Card>
            <p>
              En cas de menace grave, l'article L111-2 du Code du service national prévoit que tout citoyen peut être appelé à contribuer à la défense du pays.
            </p>
          </section>
        </section>

        {/* CTA */}
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Testez vos connaissances</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link to="/quiz-droits-devoirs-citoyen">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="font-bold mb-2">Quiz Droits & Devoirs</h3>
                <p className="text-sm text-muted-foreground mb-4">20 questions sur vos droits et obligations</p>
                <Button className="w-full">
                  Commencer <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Card>
            </Link>
            <Link to="/qcm-citoyennete-francaise">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="font-bold mb-2">QCM Complet</h3>
                <p className="text-sm text-muted-foreground mb-4">40 questions, tous thèmes</p>
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
            <Link to="/valeurs-republique" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Valeurs de la République
            </Link>
            <Link to="/institutions-francaises" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Institutions françaises
            </Link>
            <Link to="/blog/droits-devoirs-citoyens-francais" className="text-primary hover:underline flex items-center gap-2">
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
                  "name": "Quels sont les droits fondamentaux du citoyen français ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Les droits fondamentaux incluent : les libertés individuelles (aller et venir, présomption d'innocence, vie privée), les libertés d'expression (opinion, presse, réunion, association), et les droits politiques (vote, éligibilité, accès aux emplois publics)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quels sont les devoirs du citoyen français ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Les devoirs essentiels sont : respecter les lois, participer à la vie démocratique (vote), contribuer aux charges publiques (impôts), participer à la justice (juré d'assises), et la défense nationale via la JDC."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Le vote est-il obligatoire en France ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Non, le vote n'est pas obligatoire en France. C'est un devoir moral mais pas une obligation légale. Tous les citoyens français majeurs (18 ans) peuvent voter aux élections nationales, locales et européennes."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Qu'est-ce que la Journée Défense et Citoyenneté (JDC) ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La JDC (ex-JAPD) est obligatoire pour tous les jeunes Français de 16 à 25 ans. Elle est nécessaire pour passer le permis de conduire, le bac ou des concours administratifs."
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

export default DroitsDevoirs;
