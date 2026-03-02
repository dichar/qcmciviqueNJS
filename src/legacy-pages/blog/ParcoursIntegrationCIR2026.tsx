import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, FileText, Users, BookOpen, Briefcase, ArrowRight } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";

const ParcoursIntegrationCIR2026 = () => {
  return (
    <UnifiedLayout>
      <SEO 
        title="Parcours d'Intégration et Contrat d'Intégration Républicaine (CIR) 2026"
        description="Guide complet sur le Contrat d'Intégration Républicaine : formations civiques, linguistiques et professionnelles. Étapes clés pour votre intégration en France."
        canonical="/blog/parcours-integration-cir-2026"
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
              Intégration
            </span>
            <span>•</span>
            <time dateTime="2025-12-18">18 décembre 2025</time>
            <span>•</span>
            <span>10 min de lecture</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Parcours d'Intégration et Contrat d'Intégration Républicaine : Les Étapes Clés en 2026
          </h1>
          <p className="text-xl text-muted-foreground">
            Le Contrat d'Intégration Républicaine (CIR) est la première étape de votre parcours d'intégration en France. Souvent négligé, il a pourtant un impact majeur sur votre avenir.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <Card className="p-6 bg-amber-50 border-amber-200 mb-8">
            <p className="flex items-start gap-3 m-0 text-amber-800">
              <FileText className="w-6 h-6 flex-shrink-0 mt-1" />
              <span>
                <strong>Important :</strong> Le non-respect du CIR (absentéisme aux formations) peut bloquer le renouvellement de votre titre de séjour et hanter votre dossier de naturalisation 5 ans plus tard.
              </span>
            </p>
          </Card>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Les 4 Composantes du CIR</h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Formation Civique (24h obligatoires)
                </h3>
                <p className="text-muted-foreground mb-4">
                  4 journées de formation sur les institutions, la santé, le travail et l'histoire de France. Depuis 2025, le contenu est renforcé sur l'histoire et la culture française.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-medium mb-2">Thèmes abordés :</p>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Valeurs de la République et laïcité</li>
                    <li>• Institutions françaises</li>
                    <li>• Accès aux droits et services publics</li>
                    <li>• Histoire et culture de la France</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Formation Linguistique
                </h3>
                <p className="text-muted-foreground mb-4">
                  Prescrite si votre niveau est inférieur à A1. Parcours de 100 à 600 heures selon vos besoins. Obligation de suivre les cours et de progresser.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">100h</div>
                    <div className="text-sm text-muted-foreground">Parcours minimum</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">400h</div>
                    <div className="text-sm text-muted-foreground">Parcours standard</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">600h</div>
                    <div className="text-sm text-muted-foreground">Parcours intensif</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Entretien de Fin de Parcours
                </h3>
                <p className="text-muted-foreground">
                  Bilan avec l'OFII pour évaluer votre progression et votre intégration. Cet entretien vérifie le respect de vos engagements et prépare la suite de votre parcours.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Accompagnement Professionnel
                </h3>
                <p className="text-muted-foreground">
                  Passerelle vers France Travail (anciennement Pôle Emploi) pour faciliter votre insertion professionnelle. Orientation et conseils adaptés à votre situation.
                </p>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
              <ArrowRight className="w-6 h-6 text-primary" />
              Lien CIR et Titres de Séjour
            </h2>
            
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-bold text-lg mb-4">Impact sur votre parcours</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Carte Pluriannuelle</p>
                    <p className="text-sm text-muted-foreground">Le préfet vérifie l'assiduité aux formations du CIR et l'obtention du niveau A1 (bientôt A2) pour délivrer la première carte pluriannuelle.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Naturalisation</p>
                    <p className="text-sm text-muted-foreground">Lors de l'enquête de naturalisation, l'administration vérifie si vous avez respecté votre CIR à votre arrivée. Un signalement de l'OFII pour absentéisme peut être un motif d'ajournement.</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Le Parcours Complet d'Intégration</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Arrivée en France</p>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Visa long séjour + Rendez-vous OFII</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Signature du CIR</p>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Engagement formel + Début des formations</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Formations (Année 1)</p>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">24h civique + Formation linguistique si nécessaire</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Carte Pluriannuelle</p>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Après 1 an + CIR validé + Niveau A2 + Examen civique</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div className="flex-1">
                  <p className="font-medium">Carte de Résident ou Naturalisation</p>
                  <p className="text-sm text-muted-foreground">Après 5 ans + Niveau B1/B2 + Examen civique</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Conseils Pratiques</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  À Faire
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Être présent à TOUTES les formations</li>
                  <li>• Conserver tous les justificatifs de présence</li>
                  <li>• Progresser activement en français</li>
                  <li>• Prendre des notes pendant les formations</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold mb-3 text-red-600">
                  <FileText className="w-5 h-5" />
                  À Éviter
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Manquer des sessions sans justification</li>
                  <li>• Négliger l'apprentissage du français</li>
                  <li>• Perdre les attestations de formation</li>
                  <li>• Sous-estimer l'importance du CIR</li>
                </ul>
              </Card>
            </div>
          </section>

          <section className="mb-12 bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Le CIR est-il obligatoire ?</h3>
                <p className="text-muted-foreground">Oui, pour tous les primo-arrivants admis au séjour pour plus de 3 mois. C'est une condition pour obtenir la carte pluriannuelle.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Que se passe-t-il si je manque des formations ?</h3>
                <p className="text-muted-foreground">L'OFII peut signaler votre absentéisme. Cela peut bloquer le renouvellement de votre titre et affecter votre dossier de naturalisation.</p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Les formations sont-elles payantes ?</h3>
                <p className="text-muted-foreground">Non, les formations du CIR sont gratuites et prises en charge par l'État.</p>
              </div>
            </div>
          </section>
        </div>

        <Card className="p-8 bg-primary/5 border-primary/20 mt-12">
          <h2 className="text-2xl font-bold mb-4">Préparez l'examen civique</h2>
          <p className="text-muted-foreground mb-6">
            L'examen civique est obligatoire pour la carte pluriannuelle et la naturalisation. Entraînez-vous dès maintenant.
          </p>
          <Button asChild size="lg">
            <Link to="/quiz">Lancer un essai gratuit</Link>
          </Button>
        </Card>

        <div className="flex justify-center mt-8">
          <ShareButtons 
            title="Parcours d'Intégration et CIR 2026"
            description="Les étapes clés pour votre intégration en France"
            compact={false}
          />
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default ParcoursIntegrationCIR2026;
