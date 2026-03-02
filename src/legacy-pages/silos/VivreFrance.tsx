import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecentArticles } from "@/components/blog/RecentArticles";
import { LastUpdatedBadge } from "@/components/seo/LastUpdatedBadge";
import { ArrowRight, Home, GraduationCap, Briefcase, Heart, MapPin, Users } from "lucide-react";

// Date de dernière mise à jour de cette page pilier
const LAST_UPDATED = "2026-02-01";

const VivreFrance = () => {
  return (
    <UnifiedLayout>
      <SEO
        title="Vivre en France – Guide Naturalisation | QCM Civique"
        description="Vie quotidienne en France : éducation, santé, travail, logement, culture. Tout ce qu'il faut savoir pour l'examen civique 2026."
        canonical="/vivre-france"
        keywords="vivre en france, vie quotidienne france, école france, santé france, travail france, naturalisation"
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span className="mx-2">/</span>
          <span>Vivre en France</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Home className="w-8 h-8 text-primary" />
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Page Pilier</span>
            </div>
            <LastUpdatedBadge date={LAST_UPDATED} />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Vivre en France : Guide Pratique pour la Naturalisation
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            La vie quotidienne en France, ses spécificités et son organisation. Ce thème représente environ 15% des questions de l'examen civique.
          </p>
        </header>

        <Card className="p-6 mb-10 bg-secondary/50">
          <h2 className="font-bold text-lg mb-4">Sommaire</h2>
          <nav className="grid md:grid-cols-2 gap-2">
            <a href="#education" className="text-primary hover:underline">1. L'éducation</a>
            <a href="#sante" className="text-primary hover:underline">2. La santé</a>
            <a href="#travail" className="text-primary hover:underline">3. Le travail</a>
            <a href="#logement" className="text-primary hover:underline">4. Le logement</a>
            <a href="#culture" className="text-primary hover:underline">5. La culture et les loisirs</a>
            <a href="#geographie" className="text-primary hover:underline">6. Géographie de la France</a>
          </nav>
        </Card>

        <section className="prose prose-lg max-w-none space-y-8">
          
          <section id="education">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">1. L'Éducation</h2>
            </div>
            <p>
              L'école est <strong>gratuite, laïque et obligatoire</strong> de 3 à 16 ans (lois Ferry 1881-1882, modifiées en 2019).
            </p>
            
            <Card className="p-6 my-6">
              <h4 className="font-bold mb-4">Le système scolaire français :</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-lg">🏫</div>
                  <div>
                    <strong>École maternelle</strong> (3-6 ans)
                    <p className="text-sm text-muted-foreground">Petite, moyenne et grande section</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-lg">📚</div>
                  <div>
                    <strong>École primaire</strong> (6-11 ans)
                    <p className="text-sm text-muted-foreground">CP, CE1, CE2, CM1, CM2</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-lg">🎒</div>
                  <div>
                    <strong>Collège</strong> (11-15 ans)
                    <p className="text-sm text-muted-foreground">6e, 5e, 4e, 3e → Diplôme : Brevet</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-lg">🎓</div>
                  <div>
                    <strong>Lycée</strong> (15-18 ans)
                    <p className="text-sm text-muted-foreground">Seconde, Première, Terminale → Diplôme : Baccalauréat</p>
                  </div>
                </div>
              </div>
            </Card>

            <p>
              L'enseignement supérieur comprend les universités, les grandes écoles (ENA, Polytechnique, HEC...), les IUT et les BTS. L'enseignement public est quasiment gratuit.
            </p>
          </section>

          <section id="sante">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold m-0">2. La Santé</h2>
            </div>
            <p>
              Le système de santé français est basé sur la <strong>Sécurité sociale</strong>, créée en 1945. Il garantit l'accès aux soins pour tous.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Card className="p-4">
                <h4 className="font-bold mb-2">Assurance maladie</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Carte Vitale : carte de remboursement</li>
                  <li>• Remboursement des consultations</li>
                  <li>• Remboursement des médicaments</li>
                  <li>• Prise en charge hospitalière</li>
                </ul>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">Complémentaire santé</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Mutuelle : complète les remboursements</li>
                  <li>• CSS : pour les revenus modestes</li>
                  <li>• AME : pour les sans-papiers</li>
                </ul>
              </Card>
            </div>

            <Card className="p-4 my-4 bg-accent/10 border-accent/30">
              <h4 className="font-bold mb-2">Numéros d'urgence :</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                <div><strong>15</strong> : SAMU</div>
                <div><strong>17</strong> : Police</div>
                <div><strong>18</strong> : Pompiers</div>
                <div><strong>112</strong> : Urgence européenne</div>
              </div>
            </Card>
          </section>

          <section id="travail">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">3. Le Travail</h2>
            </div>
            <p>
              Le droit du travail français protège les salariés. Le <strong>Code du travail</strong> fixe les règles.
            </p>
            
            <Card className="p-4 my-4">
              <h4 className="font-bold mb-2">Points clés :</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>SMIC</strong> : Salaire Minimum Interprofessionnel de Croissance (~1 400€ net/mois en 2024)</li>
                <li>• <strong>35 heures</strong> : durée légale hebdomadaire</li>
                <li>• <strong>5 semaines</strong> : congés payés minimum</li>
                <li>• <strong>CDI</strong> : Contrat à Durée Indéterminée (le plus protecteur)</li>
                <li>• <strong>CDD</strong> : Contrat à Durée Déterminée</li>
              </ul>
            </Card>

            <p>
              <strong>France Travail</strong> (ex-Pôle Emploi) accompagne les demandeurs d'emploi. L'assurance chômage indemnise les salariés ayant perdu leur emploi.
            </p>
          </section>

          <section id="logement">
            <div className="flex items-center gap-3 mb-4">
              <Home className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold m-0">4. Le Logement</h2>
            </div>
            <p>
              Trouver un logement en France peut être difficile, surtout dans les grandes villes. Des aides existent.
            </p>
            
            <div className="space-y-3 my-6">
              <Card className="p-4">
                <h4 className="font-bold">Aides au logement (CAF)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>APL</strong> : Aide Personnalisée au Logement</li>
                  <li>• <strong>ALF</strong> : Allocation de Logement Familiale</li>
                  <li>• <strong>ALS</strong> : Allocation de Logement Sociale</li>
                </ul>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold">Logement social</h4>
                <p className="text-sm text-muted-foreground">
                  HLM (Habitations à Loyer Modéré) : logements à loyer réduit pour les revenus modestes. Demande via le dossier unique sur le site gouvernemental.
                </p>
              </Card>
            </div>
          </section>

          <section id="culture">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold m-0">5. La Culture et les Loisirs</h2>
            </div>
            <p>
              La France a une riche vie culturelle. Le ministère de la Culture soutient la création et la diffusion artistique.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <Card className="p-4">
                <h4 className="font-bold mb-2">🏛️ Patrimoine</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Musée du Louvre (le plus visité au monde)</li>
                  <li>• Château de Versailles</li>
                  <li>• Mont-Saint-Michel</li>
                  <li>• Cathédrale Notre-Dame</li>
                </ul>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">🎭 Culture vivante</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Festival de Cannes (cinéma)</li>
                  <li>• Festival d'Avignon (théâtre)</li>
                  <li>• Fête de la Musique (21 juin)</li>
                  <li>• Journées du Patrimoine (septembre)</li>
                </ul>
              </Card>
            </div>

            <p>
              Le <strong>Pass Culture</strong> offre 300€ aux jeunes de 18 ans pour des activités culturelles.
            </p>
          </section>

          <section id="geographie">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold m-0">6. Géographie de la France</h2>
            </div>
            <p>
              La France métropolitaine est le plus grand pays d'Europe occidentale. Elle possède également des territoires d'outre-mer.
            </p>
            
            <Card className="p-4 my-4">
              <h4 className="font-bold mb-2">Chiffres clés :</h4>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <div>• Superficie : ~640 000 km² (métropole)</div>
                <div>• Population : ~68 millions d'habitants</div>
                <div>• Capitale : Paris</div>
                <div>• Langue officielle : français</div>
                <div>• Monnaie : Euro (€)</div>
                <div>• 18 régions (13 métropole + 5 outre-mer)</div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Card className="p-4">
                <h4 className="font-bold mb-2">Territoires d'outre-mer</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Guadeloupe, Martinique (Antilles)</li>
                  <li>• Guyane (Amérique du Sud)</li>
                  <li>• Réunion, Mayotte (Océan Indien)</li>
                  <li>• Nouvelle-Calédonie, Polynésie française (Pacifique)</li>
                </ul>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">Relief et frontières</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Montagnes : Alpes, Pyrénées, Massif central</li>
                  <li>• Fleuves : Seine, Loire, Rhône, Garonne</li>
                  <li>• 6 pays frontaliers : Belgique, Luxembourg, Allemagne, Suisse, Italie, Espagne</li>
                </ul>
              </Card>
            </div>
          </section>
        </section>

        {/* CTA */}
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Testez vos connaissances</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link to="/quiz-histoire-geographie-france">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="font-bold mb-2">Quiz Histoire & Géographie</h3>
                <p className="text-sm text-muted-foreground mb-4">Questions sur la France</p>
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
                  Lancer <ArrowRight className="ml-2 w-4 h-4" />
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
            <Link to="/institutions-francaises" className="text-primary hover:underline flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Institutions françaises
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
                  "name": "L'école est-elle obligatoire en France ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Oui, l'école est gratuite, laïque et obligatoire de 3 à 16 ans en France (lois Ferry 1881-1882, modifiées en 2019). Le système comprend l'école maternelle, primaire, le collège et le lycée."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Comment fonctionne la Sécurité sociale en France ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La Sécurité sociale, créée en 1945, garantit l'accès aux soins pour tous. La Carte Vitale permet le remboursement des consultations, médicaments et hospitalisations. Une mutuelle complémentaire peut compléter les remboursements."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quels sont les numéros d'urgence en France ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Les numéros d'urgence sont : 15 (SAMU - urgences médicales), 17 (Police), 18 (Pompiers), 112 (numéro d'urgence européen valable dans toute l'UE)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quels sont les territoires d'outre-mer français ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Les territoires d'outre-mer comprennent : Guadeloupe et Martinique (Antilles), Guyane (Amérique du Sud), Réunion et Mayotte (Océan Indien), Nouvelle-Calédonie et Polynésie française (Pacifique)."
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

export default VivreFrance;
