import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, Clock, Shield, Briefcase } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";

const CarteResidentFranceDroits2026 = () => {
  return (
    <UnifiedLayout>
      <SEO 
        title="Carte de Résident en France 2026 : Durée, Droits, Renouvellement"
        description="Guide complet sur la carte de résident 10 ans en France. Conditions d'accès, droits conférés, renouvellement et différences avec la carte longue durée UE."
        canonical="/blog/carte-resident-france-droits-2026"
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
              Titre de Séjour
            </span>
            <span>•</span>
            <time dateTime="2025-12-18">18 décembre 2025</time>
            <span>•</span>
            <span>11 min de lecture</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Carte de Résident en France : Durée, Droits, Renouvellement en 2026
          </h1>
          <p className="text-xl text-muted-foreground">
            La carte de résident est le Graal des étrangers souhaitant s'installer durablement en France. Valable 10 ans et renouvelable indéfiniment, elle offre une stabilité juridique incomparable.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Conditions d'Accès</h2>
            
            <Card className="p-6 mb-6">
              <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                <Clock className="w-6 h-6 text-primary" />
                Condition Générale : 5 Ans de Résidence Régulière
              </h3>
              <p className="text-muted-foreground mb-4">
                Pour obtenir une carte de résident, vous devez avoir résidé légalement et régulièrement en France pendant 5 années consécutives.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-medium mb-2">Absences tolérées :</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Absences n'excédant pas 12 mois consécutifs</li>
                  <li>• Total des absences ne dépassant pas 18 mois sur 5 ans</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Conditions Spécifiques (Réduction à 3 Ans)</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Réfugiés :</strong> Après 3 ans de résidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Accords bilatéraux :</strong> Certains pays (Algérie, Maroc, Tunisie) ont des accords réduisant le délai</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Apatrides :</strong> Après 3 ans en France</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-bold text-lg mb-4">Condition d'Intégration (Depuis 2026)</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Réussite de l'examen civique (40 questions, 80% requis)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Niveau de langue B1 (écrit et oral) justifié par un certificat</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Stabilité professionnelle ou financière</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Respect de l'ordre public et des lois</span>
                </li>
              </ul>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Droits Conférés</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                  Ce que vous POUVEZ faire
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Séjourner en France pendant 10 ans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Travailler pour n'importe quel employeur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Créer une entreprise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Accéder aux services publics, santé, éducation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Demander le regroupement familial</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <Briefcase className="w-6 h-6 text-red-500" />
                  Ce que vous NE POUVEZ PAS faire
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Voter aux élections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Être candidat à une élection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Devenir fonctionnaire français</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Transmettre automatiquement la nationalité</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Durée de Validité et Renouvellement</h2>
            
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-bold mb-2">Durée Initiale : 10 Ans</h3>
                <p className="text-muted-foreground">
                  La carte de résident est valable 10 ans à partir de sa délivrance. Vous devez résider en France au minimum 6 mois par année civile.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-2">Renouvellement</h3>
                <p className="text-muted-foreground">
                  À l'approche de l'expiration, vous pouvez demander le renouvellement. Après 10 ans de possession, vous pouvez demander une carte à durée indéterminée.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-red-500">
                <h3 className="font-bold mb-2">Perte de la Carte</h3>
                <p className="text-muted-foreground">
                  Vous perdez votre carte si vous quittez la France plus de 6 ans consécutifs, êtes expulsé, commettez des actes graves contre l'ordre public, ou êtes condamné à plus de 3 ans d'emprisonnement.
                </p>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Procédure de Demande</h2>
            
            <Card className="p-6">
              <h3 className="font-bold mb-4">Documents à Fournir</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-2">Identification :</p>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Pièce d'identité valide</li>
                    <li>• Acte de naissance avec traduction</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Résidence :</p>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Justificatifs de 5 ans de résidence</li>
                    <li>• Contrats de bail, factures</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Ressources :</p>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Avis d'imposition (3 ans)</li>
                    <li>• Bulletins de salaire récents</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Examen civique :</p>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Certificat de réussite</li>
                    <li>• Certificat niveau B1</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <p className="font-medium">Coût : 225€ (200€ taxe + 25€ timbre)</p>
                <p className="text-muted-foreground">Délai de traitement : 2 à 6 mois</p>
              </div>
            </Card>
          </section>

          <section className="mb-12 bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Si je quitte la France 1 an pour un projet, je perds ma carte ?</h3>
                <p className="text-muted-foreground">Non. Vous pouvez vous absenter jusqu'à 6 ans consécutifs sans perdre la carte.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Je suis marié à un Français. Ai-je droit à une carte sans attendre 5 ans ?</h3>
                <p className="text-muted-foreground">Oui, vous pouvez la demander après 2 ans de mariage et 1 an de résidence en France.</p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Avec une carte de résident, puis-je voter aux élections locales ?</h3>
                <p className="text-muted-foreground">Non. Seuls les citoyens français et les ressortissants UE (dans certains cas) peuvent voter.</p>
              </div>
            </div>
          </section>
        </div>

        <Card className="p-8 bg-primary/5 border-primary/20 mt-12">
          <h2 className="text-2xl font-bold mb-4">Préparez l'examen civique</h2>
          <p className="text-muted-foreground mb-6">
            L'examen civique est obligatoire depuis 2026. Entraînez-vous avec notre QCM.
          </p>
          <Button asChild size="lg">
            <Link to="/quiz">Lancer un essai gratuit</Link>
          </Button>
        </Card>

        <div className="flex justify-center mt-8">
          <ShareButtons 
            title="Carte de Résident en France 2026"
            description="Durée, droits et renouvellement"
            compact={false}
          />
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default CarteResidentFranceDroits2026;
