import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, BookOpen, HelpCircle, Clock, Target, Users, MapPin } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";
import { useLanguage } from "@/contexts/LanguageContext";
import { FAQ } from "@/components/FAQ";
import { SEO } from "@/components/SEO";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { QUIZ_CONSTANTS, QUIZ_DISPLAY } from "@/constants/quiz";
import { NewYearFireworks } from "@/components/NewYearFireworks";
import { NewYearPromoBanner } from "@/components/NewYearPromoBanner";
import { useLinkValidation } from "@/hooks/useLinkValidation";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import ExamLevelsSection from "@/components/ExamLevelsSection";
import PartnersSection from "@/components/PartnersSection";
import { cn } from "@/lib/utils";

const Index = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const testimonials = [
    {
      name: "Mariam K.",
      track: "Carte de Résident",
      result: "36/40 au centre CCI - Admise",
      anonymous: true,
    },
    {
      name: "Alexandre D.",
      track: "Naturalisation",
      result: "Réussite 86% - Entretien préfecture validé",
      anonymous: false,
    },
    {
      name: "Sara M.",
      track: "Naturalisation (ANEF)",
      result: "92% de réussite via le Pack Réussite",
      anonymous: false,
    },
    {
      name: "Rachid B.",
      track: "Carte Pluriannuelle (CSP)",
      result: "Admis du 1er coup - Livret très utile",
      anonymous: true,
    },
    {
      name: "Lina P.",
      track: "Naturalisation",
      result: "Dossier accepté - Conforme décret 2025",
      anonymous: false,
    },
    {
      name: "Hassan A.",
      track: "Carte de Résident",
      result: "Réussite 90% - Zéro erreur sur les valeurs",
      anonymous: true,
    },
  ];

  // Validate all links in development mode
  useLinkValidation();

  // Scroll to hash on mount
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <UnifiedLayout>
      <div className="relative overflow-x-hidden">
        {/* New Year Fireworks Animation - visible until 02/01/2026 23:59 */}
        <NewYearFireworks />

        <SEO
          title={`QCM Civique 2026 : Entraînement pour votre examen civique`}
          description={`Préparez l'examen civique ${QUIZ_CONSTANTS.EXAM_YEAR} avec ${QUIZ_DISPLAY.TOTAL_QUESTIONS_TEXT}, un blog d'actualités et le livret du citoyen interactif. Réussissez votre naturalisation française.`}
          canonical="/"
        />

        {/* Announcement Banner */}
        <AnnouncementBanner />

        {/* New Year Promo Banner - 24h only */}
        <NewYearPromoBanner />

        {/* Hero Section */}
        <header role="banner" className="container mx-auto px-4 py-8 md:py-16 lg:py-12">
          <div className="text-center max-w-4xl mx-auto space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight px-2">
              Préparez l'examen civique 2026
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground px-4">{t("home.subtitle")}</p>
            <p className="text-sm sm:text-base text-muted-foreground">
              <span className="font-semibold text-foreground">20 000+ candidats entraînés</span> ·{" "}
              <span className="font-semibold text-foreground">45 000+ tests passés!</span> ·{" "}
              <span className="font-semibold text-foreground">4,8/5 ★★★★★</span>
            </p>
          </div>

          {/* Main CTAs */}
          <nav
            role="navigation"
            aria-label="Main actions"
            className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto mt-8 md:mt-12"
          >
            <Link to="/qcm-citoyennete-francaise" className="block">
              <Card className="p-6 md:p-8 hover:shadow-strong transition-all duration-300 md:hover:scale-105 border-2 hover:border-primary h-full">
                <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">{t("home.cta.quiz")}</h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    40 {t("home.stats.questions")} • 45 {t("home.stats.time")} • {t("home.features.conditions.title")}
                  </p>
                  <Button size="lg" className="w-full mt-auto">
                    {t("home.cta.quiz")}
                  </Button>
                </div>
              </Card>
            </Link>

            <Link to="/eligibility" className="block">
              <Card className="p-6 md:p-8 hover:shadow-strong transition-all duration-300 md:hover:scale-105 border-2 hover:border-accent h-full">
                <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent/10 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <HelpCircle className="w-7 h-7 md:w-8 md:h-8 text-accent" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">Dois-je passer l'examen civique ?</h2>
                  <p className="text-sm md:text-base text-muted-foreground">Testez votre éligibilité en 25 questions</p>
                  <Button size="lg" variant="accent" className="w-full mt-auto">
                    Vérifier mon éligibilité
                  </Button>
                </div>
              </Card>
            </Link>
          </nav>

          {/* Exam Levels Section - Right after main CTAs */}
          <ExamLevelsSection />
        </header>

        {/* Main Content */}
        <main>
          {/* Stats Section */}
          <section aria-label="Exam statistics" className="bg-primary text-primary-foreground py-8 md:py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
                <div>
                  <div
                    className="text-3xl md:text-4xl font-bold mb-1 md:mb-2"
                    aria-label={`${QUIZ_DISPLAY.TOTAL_QUESTIONS_LABEL} questions`}
                  >
                    {QUIZ_DISPLAY.TOTAL_QUESTIONS_LABEL}
                  </div>
                  <div className="text-xs md:text-sm opacity-90">Questions d'entraînement</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 md:mb-2" aria-label={`20 000+ utilisateurs`}>
                    20 000+
                  </div>
                  <div className="text-xs md:text-sm opacity-90">candidats entraînés</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 md:mb-2" aria-label={`45 000+ tests passés`}>
                    45 000+
                  </div>
                  <div className="text-xs md:text-sm opacity-90">tests passés</div>
                </div>
                <div>
                  <div
                    className="text-3xl md:text-4xl font-bold mb-1 md:mb-2"
                    aria-label={`${QUIZ_CONSTANTS.PASSING_SCORE_PERCENT}% requis`}
                  >
                    {QUIZ_CONSTANTS.PASSING_SCORE_PERCENT}%
                  </div>
                  <div className="text-xs md:text-sm opacity-90">{t("home.stats.success")}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section aria-labelledby="features-heading" className="container mx-auto px-4 py-12 md:py-12">
            <h2 id="features-heading" className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
              {t("home.features.title")}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
              <Card className="p-5 md:p-6 text-center">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4"
                  aria-hidden="true"
                >
                  <Target className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{t("home.features.conditions.title")}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{t("home.features.conditions.desc")}</p>
              </Card>

              <Card className="p-5 md:p-6 text-center">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4"
                  aria-hidden="true"
                >
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{t("home.features.free.title")}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{t("home.features.free.desc")}</p>
              </Card>

              <Card className="p-5 md:p-6 text-center sm:col-span-2 md:col-span-1">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4"
                  aria-hidden="true"
                >
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
                  {t("home.features.interactive.title")}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">{t("home.features.interactive.desc")}</p>
              </Card>
            </div>
          </section>

          {/* Partners Section */}
          <PartnersSection />

          {/* Testimonials Section */}
          <section aria-label="Témoignages" className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Témoignages</h2>
              <p className="text-center text-muted-foreground mb-8 md:mb-12">
                Découvrez les avis de noscandidats ayant réussi leur examen civique 2026.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {testimonials.map((tst, index) => (
                  <Card key={`${tst.name}-${index}`} className="p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold",
                          tst.anonymous && "blur-sm",
                        )}
                      >
                        {tst.name.split(" ")[0][0]}
                        {tst.name.split(" ")[1]?.[0] || ""}
                      </div>
                      <div className={cn("min-w-0", tst.anonymous && "blur-sm")}>
                        <p className="text-sm font-semibold truncate">{tst.name}</p>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="text-muted-foreground">Démarche:</span>{" "}
                        <span className="font-medium">{tst.track}</span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Résultat:</span>{" "}
                        <span className="font-medium">{tst.result}</span>
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Exam Centers CTA */}
          <section aria-label="Exam centers" className="container mx-auto px-4 pb-12 md:pb-16">
            <Card className="max-w-4xl mx-auto p-6 md:p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{t("home.features.centers.title")}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{t("home.features.centers.desc")}</p>
                </div>
                <Link to="/centres" className="w-full md:w-auto">
                  <Button size="lg" variant="outline" className="w-full md:w-auto whitespace-nowrap">
                    {t("home.cta.centers")}
                  </Button>
                </Link>
              </div>
            </Card>
          </section>

          {/* Thematic Quizzes Section */}
          <section aria-label="Quiz thématiques" className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Révisez par Thème</h2>
              <p className="text-center text-muted-foreground mb-8 md:mb-12">
                Approfondissez vos connaissances avec nos guides thématiques
              </p>

              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                <Link to="/quiz-valeurs-republique">
                  <Card className="p-6 hover:shadow-strong transition-all duration-300 hover:scale-105 border-2 hover:border-primary h-full">
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <span className="text-2xl">🇫🇷</span>
                      </div>
                      <h3 className="text-lg font-bold">Valeurs de la République</h3>
                      <p className="text-sm text-muted-foreground">Liberté, égalité, fraternité et laïcité</p>
                    </div>
                  </Card>
                </Link>

                <Link to="/quiz-droits-devoirs-citoyen">
                  <Card className="p-6 hover:shadow-strong transition-all duration-300 hover:scale-105 border-2 hover:border-accent h-full">
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                        <span className="text-2xl">⚖️</span>
                      </div>
                      <h3 className="text-lg font-bold">Droits et Devoirs</h3>
                      <p className="text-sm text-muted-foreground">Vos droits et responsabilités de citoyen</p>
                    </div>
                  </Card>
                </Link>

                <Link to="/quiz-histoire-geographie-france">
                  <Card className="p-6 hover:shadow-strong transition-all duration-300 hover:scale-105 border-2 hover:border-primary h-full">
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <span className="text-2xl">🗺️</span>
                      </div>
                      <h3 className="text-lg font-bold">Histoire & Géographie</h3>
                      <p className="text-sm text-muted-foreground">Culture, patrimoine et institutions</p>
                    </div>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <FAQ />

          {/* About Section */}
          <section aria-labelledby="about-heading" className="bg-secondary py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 id="about-heading" className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
                {t("home.about.title")}
              </h2>
              <Card className="p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-2 md:gap-3">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success mt-1 flex-shrink-0" aria-hidden="true" />
                    <p className="text-sm md:text-base">{t("home.about.desc")}</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </main>

        {/* Share Section */}
        <section className="container mx-auto px-4 py-8 text-center">
          <div className="max-w-md mx-auto">
            <ShareButtons
              title="QCM Civique - Préparation à l'examen civique 2026"
              description="Préparez-vous à l'examen civique français avec +1500 questions d'entraînement !"
            />
          </div>
        </section>
      </div>
    </UnifiedLayout>
  );
};

export default Index;
