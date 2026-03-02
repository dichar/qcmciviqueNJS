import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star, Crown, Zap, Shield, Clock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";

const STRIPE_LINKS = {
  essentiel: "https://buy.stripe.com/eVq4gz8y40mm9Yu21If7i01",
  reussite: "https://buy.stripe.com/3cI8wP9C8fhgdaGbCif7i02",
  premium: "https://buy.stripe.com/5kQ9ATeWs1qqc6C8q6f7i03",
};

const Packs: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

  const handlePayment = (pack: "essentiel" | "reussite" | "premium") => {
    const baseUrl = STRIPE_LINKS[pack];
    const url = userId ? `${baseUrl}?client_reference_id=${userId}` : baseUrl;
    window.location.href = url;
  };

  const packs = [
    {
      id: "essentiel" as const,
      name: "Pack Essentiel",
      price: "12,99 €",
      duration: "Accès 1 mois",
      description:
        "Idéal pour une préparation rapide et efficace à l'examen civique. Parfait si vous avez un examen dans les prochaines semaines.",
      icon: Zap,
      popular: false,
      color: "from-blue-500 to-blue-600",
      features: [
        { text: "3 QCM par niveau : CSP, CR, Naturalisation", highlight: true },
        { text: "QCM de 40 questions en conditions réelles", highlight: true },
        { text: "Historique des résultats + suivi de progression", highlight: false },
        { text: "Accès aux Centres d'Examen (liste et carte)", highlight: false },
        { text: "Questions issues du livret officiel 2026", highlight: false },
      ],
    },
    {
      id: "reussite" as const,
      name: "Pack Réussite",
      price: "19,99 €",
      duration: "Accès 3 mois",
      description:
        "Le choix préféré de nos utilisateurs. Une préparation complète avec des outils d'analyse pour maximiser vos chances de réussite.",
      icon: Star,
      popular: true,
      color: "from-primary to-primary-hover",
      features: [
        { text: "Tout le Pack Essentiel inclus", highlight: false },
        { text: "3 QCM par niveau : CSP, CR, Naturalisation", highlight: true },
        { text: "Badges de Progression + Courbe d'évolution", highlight: true },
        { text: "Points à améliorer basés sur vos tests", highlight: false },
        { text: "Livret du Citoyen Interactif complet", highlight: true },
        { text: "Quiz Livret + correction en temps réel", highlight: false },
      ],
    },
    {
      id: "premium" as const,
      name: "Pack Premium Plus",
      price: "29,99 €",
      duration: "Accès à vie",
      description:
        "L'offre ultime pour une préparation sans limite. Accès permanent à toutes les fonctionnalités et mises à jour futures incluses.",
      icon: Crown,
      popular: false,
      color: "from-amber-500 to-orange-500",
      features: [
        { text: "Tout le Pack Réussite inclus", highlight: false },
        { text: "3 QCM par niveau : CSP, CR, Naturalisation", highlight: true },
        { text: "Questions d'entretien (Livret du Citoyen)", highlight: true },
        { text: "Quiz intelligent d'éligibilité à la naturalisation", highlight: true },
        { text: "Mises à jour permanentes et nouvelles fonctionnalités", highlight: false },
        { text: "Accès prioritaire aux nouvelles questions", highlight: false },
      ],
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Paiement 100% sécurisé",
      description: "Transactions cryptées via Stripe, leader mondial du paiement en ligne.",
    },
    {
      icon: Clock,
      title: "Accès immédiat",
      description: "Débloquez votre pack instantanément après le paiement.",
    },
    {
      icon: Sparkles,
      title: "Sans engagement",
      description: "Paiement unique, pas d'abonnement ni de prélèvement récurrent.",
    },
  ];

  return (
    <>
      <SEO
        title="Nos Packs - Préparation Examen Civique | QCM Civique"
        description="Choisissez le pack adapté à vos besoins pour préparer l'examen civique français. Pack Essentiel, Réussite ou Premium Plus avec QCM, livret citoyen et questions d'entretien."
      />
      <Navigation />

      <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Choisissez votre Pack
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Préparez l'examen civique avec nos QCM conçus à partir du livret officiel 2026. Plus de 400 questions pour
              vous entraîner en conditions réelles.
            </p>
          </div>

          {/* Benefits bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border/50">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{benefit.title}</p>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Packs grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
            {packs.map((pack) => {
              const Icon = pack.icon;
              return (
                <Card
                  key={pack.id}
                  className={`relative flex flex-col shadow-elegant transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    pack.popular
                      ? "border-primary border-2 ring-4 ring-primary/20 scale-[1.02] lg:scale-105"
                      : "border-border/50 hover:border-primary/50"
                  }`}
                >
                  {pack.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground px-6 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                      <Star className="h-4 w-4 fill-current" />
                      Le plus choisi
                    </div>
                  )}

                  <CardHeader className="text-center pb-4 pt-8 px-6">
                    <div className={`mx-auto mb-4 p-4 rounded-2xl w-fit bg-gradient-to-br ${pack.color} shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-1">{pack.name}</CardTitle>
                    <CardDescription className="text-sm font-medium text-primary">{pack.duration}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col px-6 pb-8">
                    <div className="text-center mb-4">
                      <p className={`text-4xl font-bold ${pack.popular ? "text-primary" : ""}`}>{pack.price}</p>
                      <p className="text-xs text-muted-foreground mt-1">Paiement unique</p>
                    </div>

                    <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">{pack.description}</p>

                    <ul className="space-y-3 flex-1 mb-8">
                      {pack.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle
                            className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                              feature.highlight ? "text-primary" : "text-green-500"
                            }`}
                          />
                          <span className={`text-sm leading-tight ${feature.highlight ? "font-medium" : ""}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handlePayment(pack.id)}
                      size="lg"
                      className={`w-full text-base font-semibold ${
                        pack.popular ? "bg-gradient-to-r from-primary to-primary-hover hover:opacity-90" : ""
                      }`}
                      variant={pack.popular ? "default" : "outline"}
                    >
                      {pack.popular ? "Choisir ce pack" : "Sélectionner"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Comparison table */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Comparatif des Packs</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Fonctionnalités</th>
                    <th className="text-center py-4 px-4 font-semibold">Essentiel</th>
                    <th className="text-center py-4 px-4 font-semibold text-primary">Réussite</th>
                    <th className="text-center py-4 px-4 font-semibold">Premium Plus</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "3 QCM par niveau (CSP, CR, Naturalisation)",
                      essentiel: true,
                      reussite: true,
                      premium: true,
                    },
                    {
                      feature: "QCM 40 questions (conditions réelles)",
                      essentiel: true,
                      reussite: true,
                      premium: true,
                    },
                    { feature: "Historique des résultats", essentiel: true, reussite: true, premium: true },
                    { feature: "Centres d'examen (liste + carte)", essentiel: true, reussite: true, premium: true },
                    { feature: "Contenu pédagogique + FAQ", essentiel: true, reussite: true, premium: true },
                    { feature: "Badges de progression", essentiel: false, reussite: true, premium: true },
                    { feature: "Courbe d'évolution", essentiel: false, reussite: true, premium: true },
                    { feature: "Points à améliorer personnalisés", essentiel: false, reussite: true, premium: true },
                    { feature: "Livret du Citoyen interactif", essentiel: false, reussite: true, premium: true },
                    { feature: "Quiz Livret avec correction", essentiel: false, reussite: true, premium: true },
                    { feature: "Questions d'entretien", essentiel: false, reussite: false, premium: true },
                    { feature: "Quiz d'éligibilité", essentiel: false, reussite: false, premium: true },
                    { feature: "Mises à jour permanentes", essentiel: false, reussite: false, premium: true },
                    { feature: "Durée d'accès", essentiel: "1 mois", reussite: "3 mois", premium: "À vie" },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 text-sm">{row.feature}</td>
                      <td className="text-center py-3 px-4">
                        {typeof row.essentiel === "boolean" ? (
                          row.essentiel ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )
                        ) : (
                          <span className="text-sm font-medium">{row.essentiel}</span>
                        )}
                      </td>
                      <td className="text-center py-3 px-4 bg-primary/5">
                        {typeof row.reussite === "boolean" ? (
                          row.reussite ? (
                            <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )
                        ) : (
                          <span className="text-sm font-medium text-primary">{row.reussite}</span>
                        )}
                      </td>
                      <td className="text-center py-3 px-4">
                        {typeof row.premium === "boolean" ? (
                          row.premium ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )
                        ) : (
                          <span className="text-sm font-medium">{row.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                {
                  question: "Comment fonctionne le paiement ?",
                  answer:
                    "Le paiement est sécurisé via Stripe. Vous payez une seule fois, sans abonnement ni prélèvement récurrent. Après le paiement, votre accès est activé instantanément.",
                },
                {
                  question: "Puis-je changer de pack après l'achat ?",
                  answer:
                    "Oui, vous pouvez upgrader vers un pack supérieur à tout moment. Si vous êtes un ancien client du Pack Essentiel (12,99€), vous bénéficiez d'un upgrade gratuit vers le Premium Plus.",
                },
                {
                  question: "Les questions sont-elles à jour ?",
                  answer:
                    "Oui, nos questions sont basées sur le livret du citoyen 2026 officiel. Le Pack Premium Plus inclut toutes les mises à jour futures automatiquement.",
                },
                {
                  question: "Que se passe-t-il après l'expiration de mon accès ?",
                  answer:
                    "Après expiration (1 mois pour Essentiel, 3 mois pour Réussite), vous pouvez renouveler ou upgrader. Le Pack Premium Plus offre un accès permanent sans expiration.",
                },
              ].map((faq, index) => (
                <div key={index} className="p-6 bg-card rounded-lg border border-border/50">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">Des questions ? Besoin d'aide pour choisir ?</p>
            <Button variant="outline" onClick={() => navigate("/contact")}>
              Nous contacter
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Packs;
