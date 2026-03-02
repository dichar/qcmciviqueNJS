import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, MapPin, Landmark, Scale, Heart, Lightbulb } from "lucide-react";

const EntretienNaturalisation100Questions = () => {
  return (
    <UnifiedLayout>
      <SEO
        title="Entretien Naturalisation 2026 : Les 100 Questions Incontournables"
        description="Préparez votre entretien de naturalisation avec les 100 questions les plus posées en préfecture. Guide complet avec réponses modèles et conseils d'experts."
        canonical="/blog/entretien-naturalisation-100-questions"
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Préparation Entretien</span>
            <span className="text-muted-foreground text-sm">20 min de lecture</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Entretien de Naturalisation 2026 : Les 100 Questions/Réponses Incontournables
          </h1>
          <p className="text-lg text-muted-foreground">
            L'entretien oral à la préfecture complète le QCM civique. Découvrez les questions les plus fréquentes et comment y répondre avec la méthode STAR.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 mb-8">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Important : QCM + Entretien coexistent</h3>
                <p className="text-muted-foreground">
                  Le nouvel examen civique (QCM) <strong>ne remplace pas</strong> l'entretien d'assimilation en préfecture. Les deux coexistent. Le QCM valide les connaissances théoriques, tandis que l'entretien vérifie la cohérence du parcours, la motivation et la maîtrise orale de la langue.
                </p>
              </div>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            La Méthode STAR pour les Questions Personnelles
          </h2>
          
          <p>Avant de lister les connaissances, armez-vous pour les questions sur vous-même avec la méthode <strong>STAR</strong> :</p>

          <Card className="p-6 my-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="font-bold text-primary text-lg">S</div>
                <div className="text-sm">Situation</div>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="font-bold text-primary text-lg">T</div>
                <div className="text-sm">Tâche</div>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="font-bold text-primary text-lg">A</div>
                <div className="text-sm">Action</div>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="font-bold text-primary text-lg">R</div>
                <div className="text-sm">Résultat</div>
              </div>
            </div>
            <p className="text-sm"><strong>Question type :</strong> "Pourquoi voulez-vous devenir Français ?"</p>
            <div className="mt-3 space-y-2">
              <p className="text-sm text-red-600">❌ <strong>Mauvaise réponse :</strong> "Pour le passeport."</p>
              <p className="text-sm text-green-600">✅ <strong>Bonne réponse (STAR) :</strong> "Je vis en France depuis 10 ans (Situation), j'ai construit ma carrière et ma famille ici (Action), je partage les valeurs de la République et je souhaite concrétiser cette appartenance par le droit de vote (Résultat)."</p>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <Scale className="w-6 h-6 text-primary" />
            Thématique 1 : La République et ses Valeurs
          </h2>
          
          <p className="text-red-600 font-semibold mb-4">⚠️ Cette section est "éliminatoire". Une erreur ici est souvent fatale.</p>

          <div className="space-y-4 my-6">
            <Card className="p-4">
              <h4 className="font-bold mb-2">Q: Quelle est la devise de la France ?</h4>
              <p className="text-muted-foreground text-sm">
                <strong>R:</strong> Liberté, Égalité, Fraternité. Savoir expliquer chaque terme :
                <br/>• <strong>Liberté</strong> : droit d'agir, penser, s'exprimer dans le respect de la loi
                <br/>• <strong>Égalité</strong> : tous égaux devant la loi, sans discrimination
                <br/>• <strong>Fraternité</strong> : solidarité entre citoyens
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold mb-2">Q: Qu'est-ce que la laïcité ?</h4>
              <p className="text-muted-foreground text-sm">
                <strong>R:</strong> Séparation de l'Église et de l'État (Loi 1905). L'État ne favorise aucune religion. Chacun a la liberté de croire ou ne pas croire.
                <br/><em>Question piège :</em> "Peut-on porter des signes religieux dans la rue ?" → Oui, sauf burqa. "Et à l'école ?" → Non pour les signes ostentatoires.
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold mb-2">Q: Quels sont les symboles de la République ?</h4>
              <p className="text-muted-foreground text-sm">
                <strong>R:</strong> Le drapeau tricolore (bleu, blanc, rouge), la Marseillaise (hymne national), Marianne (allégorie de la République), le coq gaulois, la fête nationale du 14 juillet, le sceau de la République.
              </p>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            Thématique 2 : Histoire de France
          </h2>

          <div className="space-y-4 my-6">
            <Card className="p-4">
              <h4 className="font-bold mb-2">Q: Qui a été le premier Président de la Vème République ?</h4>
              <p className="text-muted-foreground text-sm"><strong>R:</strong> Charles de Gaulle, élu en 1958.</p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold mb-2">Q: Que représente le 14 juillet ?</h4>
              <p className="text-muted-foreground text-sm"><strong>R:</strong> Fête nationale - Prise de la Bastille (1789) et Fête de la Fédération (1790), symboles de la liberté et de l'unité nationale.</p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold mb-2">Q: Citez les dates clés à connaître</h4>
              <p className="text-muted-foreground text-sm">
                • 1789 : Révolution française<br/>
                • 1848 : Abolition de l'esclavage<br/>
                • 1944 : Droit de vote des femmes<br/>
                • 1958 : Constitution de la Vème République<br/>
                • 1975 : IVG légalisée (Simone Veil)<br/>
                • 1981 : Abolition de la peine de mort (Robert Badinter)
              </p>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            Thématique 3 : Géographie
          </h2>

          <div className="space-y-4 my-6">
            <Card className="p-4">
              <h4 className="font-bold mb-2">Q: Quels pays bordent la France ?</h4>
              <p className="text-muted-foreground text-sm">
                <strong>R:</strong> 8 pays : Belgique, Luxembourg, Allemagne, Suisse, Italie, Monaco, Espagne, Andorre. 
                + Brésil et Suriname via la Guyane.
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold mb-2">Q: Quels sont les 5 fleuves principaux ?</h4>
              <p className="text-muted-foreground text-sm"><strong>R:</strong> Seine (Paris), Loire (le plus long), Rhône, Garonne, Rhin (frontière avec l'Allemagne).</p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold mb-2">Q: Citez les DROM</h4>
              <p className="text-muted-foreground text-sm"><strong>R:</strong> Guadeloupe, Martinique, Guyane, Réunion, Mayotte (5 départements/régions d'outre-mer).</p>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-primary" />
            Thématique 4 : Institutions
          </h2>

          <div className="space-y-4 my-6">
            <Card className="p-4">
              <h4 className="font-bold mb-2">Q: Quel est le rôle du Président de la République ?</h4>
              <p className="text-muted-foreground text-sm"><strong>R:</strong> Chef de l'État, élu pour 5 ans au suffrage universel direct. Chef des armées, nomme le Premier Ministre, promulgue les lois.</p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold mb-2">Q: Qu'est-ce que le Parlement ?</h4>
              <p className="text-muted-foreground text-sm"><strong>R:</strong> Il vote les lois et contrôle le gouvernement. Composé de deux chambres : l'Assemblée Nationale (577 députés) et le Sénat (348 sénateurs).</p>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            Thématique 5 : Questions Personnelles (Le Test de Sincérité)
          </h2>

          <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 my-6">
            <p className="font-semibold mb-4">⚠️ C'est ici que l'agent peut vous "piéger". Soyez honnête et cohérent.</p>
            <div className="space-y-3">
              <p><strong>"Envoyez-vous de l'argent au pays ?"</strong> → Être honnête.</p>
              <p><strong>"Fréquentez-vous des Français d'origine ?"</strong> → Vérification de la mixité sociale.</p>
              <p><strong>"Avez-vous conservé des liens avec votre pays d'origine ?"</strong> → Ne pas renier, mais prioriser la France.</p>
              <p><strong>"Que feriez-vous si la nationalité vous était refusée ?"</strong> → Montrer la persévérance.</p>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4">Conseils de "Savoir-Être" pour le Jour J</h2>

          <div className="grid md:grid-cols-3 gap-4 my-6">
            <Card className="p-4 text-center">
              <div className="text-3xl mb-2">👁️</div>
              <h4 className="font-bold mb-2">Body Language</h4>
              <p className="text-sm text-muted-foreground">Regarder l'agent dans les yeux, ne pas croiser les bras</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl mb-2">🤝</div>
              <h4 className="font-bold mb-2">Honnêteté</h4>
              <p className="text-sm text-muted-foreground">Si vous ne savez pas, dites-le. C'est mieux qu'inventer.</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl mb-2">👔</div>
              <h4 className="font-bold mb-2">Tenue</h4>
              <p className="text-sm text-muted-foreground">Correcte ("Business casual"), c'est un rendez-vous solennel</p>
            </Card>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <Button asChild size="lg" className="flex-1">
            <Link to="/quiz">S'entraîner au QCM</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link to="/livret-citoyen">Réviser le Livret du Citoyen</Link>
          </Button>
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default EntretienNaturalisation100Questions;
