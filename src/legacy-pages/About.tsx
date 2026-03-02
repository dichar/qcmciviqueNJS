import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award, Target, CheckCircle2, Lightbulb } from "lucide-react";
import { SEO } from "@/components/SEO";
import { QUIZ_CONSTANTS, QUIZ_DISPLAY } from "@/constants/quiz";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";

const About = () => {
  const { t } = useLanguage();

  return (
    <UnifiedLayout>
      <SEO
        title={`Notre mission – ${QUIZ_DISPLAY.TOTAL_QUESTIONS_LABEL} questions pour l'examen civique`}
        description={`QCM Civique accompagne les candidats à la naturalisation avec ${QUIZ_DISPLAY.TOTAL_QUESTIONS_TEXT} d'entraînement, des explications claires et un suivi personnalisé.`}
        canonical="/about"
      />
      
      <main className="container mx-auto px-4 py-8">
        <article>
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              À propos de QCM Civique France
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Votre partenaire de confiance pour réussir l'examen civique français 2026 et obtenir la naturalisation
            </p>
          </section>

          {/* Mission Section */}
          <section className="mb-12">
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <Target className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-3xl font-bold mb-4">Notre Mission</h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    QCM Civique France accompagne les candidats à l'examen civique, obligatoire pour la naturalisation et les titres de séjour, avec un essai gratuit pour tester nos quiz.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Notre objectif est de rendre la préparation à l'examen civique accessible à tous, quel que soit votre 
                    niveau de français ou votre situation géographique. Nous croyons que chaque personne mérite toutes les chances de réussir son intégration en France.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* What We Offer */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Ce que nous offrons</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <BookOpen className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">QCM Interactifs</h3>
                <p className="text-muted-foreground">
                  {QUIZ_DISPLAY.TOTAL_QUESTIONS_TEXT} conformes au programme officiel {QUIZ_CONSTANTS.EXAM_YEAR}, avec des explications détaillées 
                  pour chaque réponse. Tests chronométrés simulant les conditions réelles de l'examen : {QUIZ_CONSTANTS.QUESTIONS_PER_QUIZ} questions à répondre en {QUIZ_CONSTANTS.QUIZ_DURATION_MINUTES} minutes.
                </p>
              </Card>

              <Card className="p-6">
                <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Vérification d'Éligibilité</h3>
                <p className="text-muted-foreground">
                  Un outil intelligent qui vous guide à travers les critères d'éligibilité pour la naturalisation française ou les titres de séjour pluriannuels.
                </p>
              </Card>

              <Card className="p-6">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Centres d'Examen Agréés CCI</h3>
                <p className="text-muted-foreground">
                  Liste complète et mise à jour des centres d'examen agréés par la CCI Paris Île-de-France 
                  (via Le Français des Affaires) partout en France.
                </p>
              </Card>

              <Card className="p-6">
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Suivi de Progression</h3>
                <p className="text-muted-foreground">
                  Suivez vos performances, identifiez vos points forts et vos axes d'amélioration grâce à des statistiques 
                  détaillées sur vos résultats aux différents tests.
                </p>
              </Card>

              <Card className="p-6">
                <Lightbulb className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Contenu Multilingue</h3>
                <p className="text-muted-foreground">
                  Interface disponible en français, anglais, arabe et espagnol pour faciliter l'apprentissage des candidats 
                  de toutes origines.
                </p>
              </Card>

              <Card className="p-6">
                <BookOpen className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Essai Gratuit</h3>
                <p className="text-muted-foreground">
                  Testez le site gratuitement avant de vous engager. Accès complet disponible via nos offres payantes.
                  Notre priorité : vous accompagner vers la citoyenneté.
                </p>
              </Card>
            </div>
          </section>

          {/* About the Exam */}
          <section className="mb-12">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
              <h2 className="text-3xl font-bold mb-6">L'Examen Civique Français</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                  <strong className="text-foreground">Qu'est-ce que l'examen civique ?</strong><br />
                  L'examen civique est une épreuve obligatoire pour toute demande de naturalisation française, ainsi que pour les demandes de carte de séjour pluriannuelle ou de carte de résident, à partir du 1er janvier 2026.
                  Il vise à évaluer votre connaissance des valeurs, des principes et des symboles de la République française, ainsi que de son histoire, son système institutionnel, ses droits et devoirs, et la vie en société.
                </p>
                <p className="text-lg">
                  <strong className="text-foreground">Format de l'examen 2026 :</strong><br />
                  • 40 questions à choix multiples (QCM)<br />
                  • Durée : 45 minutes<br />
                  • Note minimale pour réussir : 32/40 (80% de bonnes réponses)<br />
                  • Thèmes : valeurs et principes de la République, histoire et géographie de la France, institutions, droits, devoirs, et vie quotidienne.
                </p>
                <p className="text-lg">
                  <strong className="text-foreground">Pourquoi se préparer ?</strong><br />
                  Bien que l'examen soit exigeant, une préparation sérieuse augmente considérablement 
                  vos chances de succès. Nos statistiques montrent que les candidats qui s'entraînent régulièrement sur 
                  notre plateforme ont un taux de réussite de 85%, contre une moyenne nationale inférieure à ce taux.
                </p>
              </div>
            </Card>
          </section>

          {/* Our Values */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Nos Valeurs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3 text-primary">Accessibilité</h3>
                <p className="text-muted-foreground">
                  Nous croyons que l'éducation civique doit être accessible à tous, sans barrière financière ou linguistique.
                </p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3 text-primary">Qualité</h3>
                <p className="text-muted-foreground">
                  Notre contenu est vérifié, mis à jour régulièrement et conforme aux dernières exigences officielles.
                </p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3 text-primary">Bienveillance</h3>
                <p className="text-muted-foreground">
                  Nous accompagnons chaque candidat avec respect et empathie dans son parcours d'intégration.
                </p>
              </Card>
            </div>
          </section>

          {/* Statistics */}
          <section className="mb-12">
            <Card className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10">
              <h2 className="text-3xl font-bold text-center mb-8">Nos Résultats</h2>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                  <p className="text-muted-foreground">Utilisateurs actifs</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">{QUIZ_DISPLAY.TOTAL_QUESTIONS_LABEL}</div>
                  <p className="text-muted-foreground">Questions disponibles</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">85%</div>
                  <p className="text-muted-foreground">Taux de réussite</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">4.8/5</div>
                  <p className="text-muted-foreground">Note utilisateurs</p>
                </div>
              </div>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <h2 className="text-3xl font-bold mb-4">Prêt à commencer votre préparation ?</h2>
              <p className="text-lg mb-6 opacity-90">
                Rejoignez des milliers de candidats qui se préparent avec succès à l'examen civique
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/qcm-citoyennete-francaise">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Commencer un Quiz
                  </Button>
                </Link>
                <Link to="/eligibility">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 hover:bg-white/20">
                    Vérifier mon Éligibilité
                  </Button>
                </Link>
              </div>
            </Card>
          </section>

          {/* Disclaimer */}
          <section className="mt-12 text-center text-sm text-muted-foreground">
            <p>
              QCM Civique France est un service indépendant non affilié aux centres agréés CCI (via Le Français des Affaires) 
              ou à tout autre organisme gouvernemental. Nous proposons du contenu éducatif basé 
              sur le programme officiel, mais nous ne sommes pas un centre d'examen agréé.
            </p>
          </section>
        </article>
      </main>
    </UnifiedLayout>
  );
};

export default About;
