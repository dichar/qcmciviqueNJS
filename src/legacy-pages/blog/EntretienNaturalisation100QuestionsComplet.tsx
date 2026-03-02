import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle, Users, Building, Globe, Scale } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";

const EntretienNaturalisation100QuestionsComplet = () => {
  return (
    <UnifiedLayout>
      <SEO 
        title="Entretien Naturalisation 2026 : 100 Questions Incontournables"
        description="Préparez votre entretien de naturalisation avec les 100 questions les plus posées en préfecture. Guide complet avec réponses modèles pour réussir en 2026."
        canonical="/blog/entretien-naturalisation-100-questions-complet"
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
              Guide Complet
            </span>
            <span>•</span>
            <time dateTime="2025-12-18">18 décembre 2025</time>
            <span>•</span>
            <span>15 min de lecture</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Entretien de Naturalisation : Les 100 Questions Incontournables en 2026
          </h1>
          <p className="text-xl text-muted-foreground">
            L'entretien à la préfecture est l'étape finale et souvent la plus stressante du parcours de naturalisation française. Ce guide complet vous prépare à affronter cette épreuve décisive.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <Card className="p-6 bg-primary/5 border-primary/20 mb-8">
            <p className="flex items-start gap-3 m-0">
              <BookOpen className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <span>
                <strong>Conseil pratique :</strong> Avant de lire cet article, testez votre niveau avec notre{" "}
                <Link to="/quiz" className="text-primary hover:underline">essai gratuit</Link>{" "}
                pour identifier vos lacunes.
              </span>
            </p>
          </Card>

          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
              <Users className="w-6 h-6 text-primary" />
              Questions sur Votre Parcours Personnel
            </h2>
            <p>
              Lors de l'entretien, le préfet évalue d'abord votre sincérité et votre engagement. Ces questions visent à vérifier que votre demande de naturalisation repose sur une véritable intention de devenir français.
            </p>
            
            <div className="space-y-6 mt-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">1. Pourquoi voulez-vous devenir Français/Française ?</h3>
                <p className="text-muted-foreground mb-3">
                  <strong>Réponse modèle :</strong> Expliquez clairement votre attachement émotionnel et pratique à la France. Mentionnez vos contributions à la société française (travail, famille, engagement associatif). Évitez de mentionner des raisons purement économiques.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">2. Depuis combien de temps vivez-vous en France ?</h3>
                <p className="text-muted-foreground">
                  <strong>Réponse modèle :</strong> Donnez une date précise et mentionnez les différentes étapes de votre intégration. Soyez cohérent avec vos documents administratifs.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">3. Où vivez-vous exactement en France ?</h3>
                <p className="text-muted-foreground">
                  <strong>Réponse modèle :</strong> Indiquez votre adresse actuelle et décrivez votre cadre de vie. Cette question valide que vous résidez réellement en France.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">4. Quelle est votre profession actuelle ?</h3>
                <p className="text-muted-foreground">
                  <strong>Réponse modèle :</strong> Décrivez votre emploi, votre secteur d'activité et vos responsabilités. Mentionnez votre stabilité professionnelle.
                </p>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
              <Globe className="w-6 h-6 text-primary" />
              Connaître la France : Histoire et Géographie
            </h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">5. Que symbolise la Prise de la Bastille (14 juillet 1789) ?</h3>
                <p className="text-muted-foreground">
                  <strong>Réponse :</strong> La Prise de la Bastille symbolise le début de la Révolution française et la fin de l'Ancien Régime. C'est pourquoi le 14 juillet est la fête nationale française.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">6. Qui a été le premier Président de la Ve République ?</h3>
                <p className="text-muted-foreground">
                  <strong>Réponse :</strong> Charles de Gaulle, élu en 1959. Il a instauré la Constitution de 1958 qui renforce le pouvoir exécutif.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">7. Quels sont les cinq fleuves principaux de France ?</h3>
                <p className="text-muted-foreground">
                  <strong>Réponse :</strong> La Seine (Paris), la Loire (le plus long), la Garonne, le Rhône et le Rhin (frontière avec l'Allemagne).
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">8. Quels pays bordent la France ?</h3>
                <p className="text-muted-foreground">
                  <strong>Réponse :</strong> Belgique, Luxembourg, Allemagne, Suisse, Italie, Monaco, Espagne, et Andorre. La France est aussi bordée par l'océan Atlantique, la Manche et la mer Méditerranée.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">9. En quelle année les femmes ont obtenu le droit de vote ?</h3>
                <p className="text-muted-foreground">
                  <strong>Réponse :</strong> 1944. Ce droit a été accordé après la Libération.
                </p>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
              <Scale className="w-6 h-6 text-primary" />
              Les Valeurs de la République et la Laïcité
            </h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">10. Que signifie "Liberté, Égalité, Fraternité" ?</h3>
                <div className="text-muted-foreground space-y-2">
                  <p><strong>Liberté :</strong> Le droit d'agir, penser et s'exprimer sans contrainte (dans le respect de la loi).</p>
                  <p><strong>Égalité :</strong> Tous les citoyens sont égaux devant la loi, sans distinction.</p>
                  <p><strong>Fraternité :</strong> Le sentiment de solidarité entre les citoyens.</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">11. Qu'est-ce que la laïcité en France ?</h3>
                <p className="text-muted-foreground">
                  <strong>Réponse :</strong> La laïcité est la neutralité de l'État en matière religieuse. L'État ne favorise aucune religion. Chacun a la liberté de croyance et de culte. L'École publique est laïque.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">12. Qu'est-ce qu'une discrimination ?</h3>
                <p className="text-muted-foreground">
                  <strong>Réponse :</strong> La discrimination est le traitement inégal d'une personne en raison de son origine, son sexe, son âge, son handicap ou sa religion. C'est illégal en France.
                </p>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
              <Building className="w-6 h-6 text-primary" />
              Les Institutions Françaises
            </h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">13. Quel est le rôle du Président de la République ?</h3>
                <p className="text-muted-foreground">
                  <strong>Réponse :</strong> Le Président est le chef de l'État, élu pour 5 ans au suffrage universel. Il nomme le Premier ministre, préside le gouvernement et est le chef des armées.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">14. Quel est le rôle du Parlement ?</h3>
                <p className="text-muted-foreground">
                  <strong>Réponse :</strong> Le Parlement vote les lois et contrôle le gouvernement. Il est composé de l'Assemblée nationale (577 députés) et du Sénat (348 sénateurs).
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">15. Qu'est-ce que la Constitution de 1958 ?</h3>
                <p className="text-muted-foreground">
                  <strong>Réponse :</strong> La Constitution de la Ve République définit le fonctionnement des institutions françaises. Elle affirme que "la France est une République indivisible, laïque, démocratique et sociale".
                </p>
              </Card>
            </div>
          </section>

          <section className="mb-12 bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">FAQ - Questions Fréquentes</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Combien de temps dure l'entretien de naturalisation ?</h3>
                <p className="text-muted-foreground">En moyenne, entre 20 et 45 minutes selon la préfecture.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Y a-t-il un nombre limite de tentatives pour l'examen civique ?</h3>
                <p className="text-muted-foreground">Non, vous pouvez tenter l'examen autant de fois que vous le souhaitez.</p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Puis-je avoir recours à un interprète pendant l'examen ?</h3>
                <p className="text-muted-foreground">Non, l'examen est en français écrit. Des aménagements peuvent être accordés aux personnes en situation de handicap.</p>
              </div>
            </div>
          </section>
        </div>

        <Card className="p-8 bg-primary/5 border-primary/20 mt-12">
          <h2 className="text-2xl font-bold mb-4">Prêt pour l'examen ?</h2>
          <p className="text-muted-foreground mb-6">
            Testez vos connaissances avec notre QCM de 40 questions en conditions réelles.
          </p>
          <Button asChild size="lg">
            <Link to="/quiz">Lancer un essai gratuit</Link>
          </Button>
        </Card>

        <div className="flex justify-center mt-8">
          <ShareButtons 
            title="Entretien Naturalisation : 100 Questions"
            description="Guide complet pour réussir l'entretien de naturalisation"
            compact={false}
          />
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default EntretienNaturalisation100QuestionsComplet;
