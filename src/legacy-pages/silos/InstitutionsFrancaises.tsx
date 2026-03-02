import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecentArticles } from "@/components/blog/RecentArticles";
import { LastUpdatedBadge } from "@/components/seo/LastUpdatedBadge";
import { ArrowRight, Landmark, Users, Gavel, MapPin, Building2, Globe } from "lucide-react";

// Date de dernière mise à jour de cette page pilier
const LAST_UPDATED = "2026-02-01";

const InstitutionsFrancaises = () => {
  return (
    <UnifiedLayout>
      <SEO
        title="Institutions Françaises – Guide Naturalisation | QCM Civique"
        description="Président, gouvernement, Parlement, collectivités : maîtrisez les institutions de la Ve République pour l'examen civique 2026. Guide complet + essai gratuit."
        canonical="/institutions-francaises"
        keywords="institutions françaises, président république, parlement france, gouvernement français, examen civique institutions"
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span className="mx-2">/</span>
          <span>Institutions françaises</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Landmark className="w-8 h-8 text-primary" />
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Page Pilier</span>
            </div>
            <LastUpdatedBadge date={LAST_UPDATED} />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Les Institutions de la Ve République : Guide Complet pour la Naturalisation
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Comprendre le fonctionnement des institutions françaises est essentiel pour l'examen civique. Ce thème représente environ 25% des questions.
          </p>
        </header>

        <Card className="p-6 mb-10 bg-secondary/50">
          <h2 className="font-bold text-lg mb-4">Sommaire</h2>
          <nav className="grid md:grid-cols-2 gap-2">
            <a href="#president" className="text-primary hover:underline">1. Le Président de la République</a>
            <a href="#gouvernement" className="text-primary hover:underline">2. Le Gouvernement</a>
            <a href="#parlement" className="text-primary hover:underline">3. Le Parlement</a>
            <a href="#justice" className="text-primary hover:underline">4. Le pouvoir judiciaire</a>
            <a href="#collectivites" className="text-primary hover:underline">5. Les collectivités territoriales</a>
            <a href="#europe" className="text-primary hover:underline">6. La France et l'Europe</a>
          </nav>
        </Card>

        {/* Schéma des pouvoirs */}
        <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
          <h3 className="font-bold text-lg mb-4 text-center">La séparation des pouvoirs (Montesquieu)</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg">
              <div className="text-2xl mb-2">⚖️</div>
              <h4 className="font-bold">Exécutif</h4>
              <p className="text-sm text-muted-foreground">Applique les lois</p>
              <p className="text-xs mt-2">Président + Gouvernement</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <div className="text-2xl mb-2">📜</div>
              <h4 className="font-bold">Législatif</h4>
              <p className="text-sm text-muted-foreground">Vote les lois</p>
              <p className="text-xs mt-2">Assemblée + Sénat</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <div className="text-2xl mb-2">🔨</div>
              <h4 className="font-bold">Judiciaire</h4>
              <p className="text-sm text-muted-foreground">Juge et sanctionne</p>
              <p className="text-xs mt-2">Tribunaux et Cours</p>
            </div>
          </div>
        </Card>

        <section className="prose prose-lg max-w-none space-y-8">
          
          <section id="president">
            <div className="flex items-center gap-3 mb-4">
              <Landmark className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">1. Le Président de la République</h2>
            </div>
            <p>
              Chef de l'État et clé de voûte des institutions de la Ve République, le Président dispose de pouvoirs considérables.
            </p>
            
            <Card className="p-4 my-4">
              <h4 className="font-bold mb-2">Caractéristiques :</h4>
              <ul className="text-sm space-y-1">
                <li>• Élu au <strong>suffrage universel direct</strong> (depuis 1962)</li>
                <li>• Mandat de <strong>5 ans</strong> (quinquennat depuis 2000)</li>
                <li>• Maximum <strong>2 mandats consécutifs</strong></li>
                <li>• Réside au <strong>Palais de l'Élysée</strong></li>
              </ul>
            </Card>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Card className="p-4">
                <h4 className="font-bold mb-2">Pouvoirs propres</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Nommer le Premier ministre</li>
                  <li>• Dissoudre l'Assemblée nationale</li>
                  <li>• Organiser un référendum</li>
                  <li>• Activer l'article 16 (pouvoirs exceptionnels)</li>
                  <li>• Saisir le Conseil constitutionnel</li>
                </ul>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">Pouvoirs partagés</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Promulguer les lois</li>
                  <li>• Signer les décrets</li>
                  <li>• Nommer les ministres</li>
                  <li>• Négocier les traités</li>
                  <li>• Chef des armées</li>
                </ul>
              </Card>
            </div>
          </section>

          <section id="gouvernement">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold m-0">2. Le Gouvernement</h2>
            </div>
            <p>
              Le Gouvernement détermine et conduit la politique de la nation sous l'autorité du Premier ministre.
            </p>
            
            <div className="space-y-4 my-6">
              <Card className="p-4 border-l-4 border-l-primary">
                <h4 className="font-bold">Le Premier ministre</h4>
                <p className="text-sm text-muted-foreground">
                  Chef du Gouvernement, nommé par le Président. Dirige l'action du Gouvernement, assure l'exécution des lois. Réside à l'<strong>Hôtel Matignon</strong>.
                </p>
              </Card>
              <Card className="p-4 border-l-4 border-l-accent">
                <h4 className="font-bold">Les ministres</h4>
                <p className="text-sm text-muted-foreground">
                  Nommés par le Président sur proposition du PM. Chacun dirige un ministère (Intérieur, Justice, Éducation, Finances, etc.). Réunis en <strong>Conseil des ministres</strong> chaque mercredi.
                </p>
              </Card>
            </div>

            <Card className="p-4 my-4 bg-accent/10 border-accent/30">
              <h4 className="font-bold mb-2">Ministères clés à connaître :</h4>
              <ul className="text-sm grid sm:grid-cols-2 gap-1">
                <li>• <strong>Garde des Sceaux</strong> : Ministre de la Justice</li>
                <li>• <strong>Quai d'Orsay</strong> : Affaires étrangères</li>
                <li>• <strong>Place Beauvau</strong> : Intérieur</li>
                <li>• <strong>Bercy</strong> : Économie et Finances</li>
              </ul>
            </Card>
          </section>

          <section id="parlement">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">3. Le Parlement</h2>
            </div>
            <p>
              Le Parlement vote les lois et contrôle l'action du Gouvernement. Il est <strong>bicaméral</strong> (deux chambres).
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Card className="p-5 border-t-4 border-t-primary">
                <h4 className="font-bold text-lg mb-2">Assemblée nationale</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Siège au <strong>Palais Bourbon</strong>
                </p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>577 députés</strong></li>
                  <li>• Élus au suffrage direct pour 5 ans</li>
                  <li>• Peut renverser le Gouvernement (motion de censure)</li>
                  <li>• A le dernier mot en cas de désaccord avec le Sénat</li>
                </ul>
              </Card>
              <Card className="p-5 border-t-4 border-t-accent">
                <h4 className="font-bold text-lg mb-2">Sénat</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Siège au <strong>Palais du Luxembourg</strong>
                </p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>348 sénateurs</strong></li>
                  <li>• Élus au suffrage indirect pour 6 ans</li>
                  <li>• Représente les collectivités territoriales</li>
                  <li>• Ne peut pas être dissous</li>
                </ul>
              </Card>
            </div>

            <h4 className="font-bold mb-2">Le parcours d'une loi :</h4>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Projet (gouvernement) ou proposition (parlementaires) de loi</li>
              <li>Examen en commission</li>
              <li>Vote en séance à l'Assemblée puis au Sénat</li>
              <li>Navette parlementaire jusqu'à accord</li>
              <li>Promulgation par le Président</li>
              <li>Publication au Journal Officiel</li>
            </ol>
          </section>

          <section id="justice">
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold m-0">4. Le Pouvoir Judiciaire</h2>
            </div>
            <p>
              La justice est rendue au nom du peuple français. Elle est indépendante des pouvoirs exécutif et législatif.
            </p>
            
            <div className="space-y-4 my-6">
              <Card className="p-4">
                <h4 className="font-bold">Juridictions judiciaires</h4>
                <p className="text-sm text-muted-foreground">
                  Tribunal judiciaire (civil), Tribunal correctionnel (délits), Cour d'assises (crimes), Cour de cassation (plus haute juridiction).
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold">Juridictions administratives</h4>
                <p className="text-sm text-muted-foreground">
                  Tribunal administratif, Cour administrative d'appel, Conseil d'État (plus haute juridiction administrative).
                </p>
              </Card>
              <Card className="p-4 bg-primary/5 border-primary/20">
                <h4 className="font-bold">Conseil constitutionnel</h4>
                <p className="text-sm text-muted-foreground">
                  9 membres nommés pour 9 ans. Vérifie la conformité des lois à la Constitution. Valide les élections.
                </p>
              </Card>
            </div>
          </section>

          <section id="collectivites">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">5. Les Collectivités Territoriales</h2>
            </div>
            <p>
              La France est organisée en <strong>communes, départements et régions</strong>. Ces collectivités s'administrent librement (décentralisation).
            </p>
            
            <div className="space-y-3 my-6">
              <Card className="p-4 border-l-4 border-l-green-500">
                <h4 className="font-bold">La commune (~35 000)</h4>
                <p className="text-sm text-muted-foreground">
                  Échelon de base. Le <strong>maire</strong> est élu par le conseil municipal. Gère : état civil, écoles primaires, urbanisme, voirie communale.
                </p>
              </Card>
              <Card className="p-4 border-l-4 border-l-blue-500">
                <h4 className="font-bold">Le département (101)</h4>
                <p className="text-sm text-muted-foreground">
                  Conseil départemental élu. Compétences : action sociale (RSA), collèges, routes départementales. Le <strong>préfet</strong> représente l'État.
                </p>
              </Card>
              <Card className="p-4 border-l-4 border-l-purple-500">
                <h4 className="font-bold">La région (18)</h4>
                <p className="text-sm text-muted-foreground">
                  Conseil régional élu. Compétences : lycées, transports ferroviaires (TER), formation professionnelle, développement économique.
                </p>
              </Card>
            </div>
          </section>

          <section id="europe">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold m-0">6. La France et l'Europe</h2>
            </div>
            <p>
              La France est membre fondateur de l'Union européenne (27 États membres).
            </p>
            <Card className="p-4 my-4">
              <h4 className="font-bold mb-2">Institutions européennes :</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Commission européenne</strong> : propose les lois, exécutif</li>
                <li>• <strong>Parlement européen</strong> : vote les lois, contrôle</li>
                <li>• <strong>Conseil de l'UE</strong> : représente les gouvernements</li>
                <li>• <strong>Cour de Justice de l'UE</strong> : interprète le droit européen</li>
              </ul>
            </Card>
            <p>
              Les citoyens français votent aux élections européennes (tous les 5 ans) pour élire les eurodéputés.
            </p>
          </section>
        </section>

        {/* CTA */}
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Testez vos connaissances</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link to="/qcm-citoyennete-francaise">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="font-bold mb-2">QCM Complet</h3>
                <p className="text-sm text-muted-foreground mb-4">40 questions incluant les institutions</p>
                <Button className="w-full">
                  Lancer le QCM <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Card>
            </Link>
            <Link to="/livret-citoyen">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="font-bold mb-2">Livret du Citoyen</h3>
                <p className="text-sm text-muted-foreground mb-4">Révision interactive complète</p>
                <Button variant="outline" className="w-full">
                  Consulter <ArrowRight className="ml-2 w-4 h-4" />
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
            <Link to="/droits-devoirs" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Droits et Devoirs
            </Link>
            <Link to="/vivre-france" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Vivre en France
            </Link>
            <Link to="/blog/examen-civique-guide-complet-2026" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Guide examen 2026
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
                  "name": "Quels sont les pouvoirs du Président de la République française ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Le Président nomme le Premier ministre, peut dissoudre l'Assemblée nationale, organiser un référendum, activer l'article 16 (pouvoirs exceptionnels), et est chef des armées. Il est élu pour 5 ans (quinquennat) au suffrage universel direct."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Combien de députés et sénateurs compose le Parlement français ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Le Parlement français est bicaméral : l'Assemblée nationale compte 577 députés (Palais Bourbon) élus pour 5 ans, et le Sénat compte 348 sénateurs (Palais du Luxembourg) élus pour 6 ans."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Qu'est-ce que la séparation des pouvoirs en France ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La séparation des pouvoirs (Montesquieu) distingue : le pouvoir exécutif (Président + Gouvernement), le pouvoir législatif (Assemblée + Sénat) et le pouvoir judiciaire (tribunaux et cours)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quelles sont les collectivités territoriales en France ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La France compte environ 35 000 communes dirigées par un maire, 101 départements avec un conseil départemental, et 18 régions (13 en métropole + 5 outre-mer) avec un conseil régional."
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

export default InstitutionsFrancaises;
