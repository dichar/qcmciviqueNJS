import React from "react";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <SEO 
        title="Conditions d'utilisation – QCM Civique"
        description="Consultez les conditions générales d'utilisation du site QCM Civique. Règles d'accès, responsabilités et droits des utilisateurs."
        canonical="/terms"
      />
      <Navigation />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Conditions Générales d'Utilisation
        </h1>

        <Card className="p-6 md:p-8 space-y-8">
          {/* 1. Objet */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">1. Objet des conditions d'utilisation</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les présentes conditions générales d'utilisation (CGU) encadrent l'accès et l'utilisation du site QCM Civique. 
              En naviguant sur ce site ou en utilisant ses services, l'utilisateur accepte sans réserve les présentes conditions. 
              Si l'utilisateur n'accepte pas ces conditions, il est invité à ne pas utiliser le site.
            </p>
          </section>

          {/* 2. Description des services */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">2. Description des services</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Le site propose des outils de préparation à l'examen civique français, notamment :
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Des QCM d'entraînement couvrant les thèmes officiels de l'examen civique</li>
              <li>Des contenus pédagogiques (fiches de révision, explications)</li>
              <li>Un outil de vérification d'éligibilité à l'examen</li>
              <li>La possibilité de créer un compte pour suivre sa progression</li>
              <li>Des informations sur les centres d'examen agréés</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              <strong>Important :</strong> Ce site n'est pas un service officiel de l'État français. Les informations fournies 
              sont à titre indicatif et ne remplacent pas les sources officielles. Le contenu peut être modifié ou mis à jour 
              à tout moment sans préavis.
            </p>
          </section>

          {/* 3. Accès au site */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">3. Accès au site</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              L'utilisateur est responsable de disposer de l'équipement informatique et de la connexion internet nécessaires 
              pour accéder au site. Le site s'efforce d'être accessible en permanence, mais peut être temporairement indisponible 
              pour des raisons de maintenance, de mise à jour ou de force majeure.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Le site se réserve le droit de modifier, suspendre ou interrompre tout ou partie des services proposés, 
              sans obligation de préavis ni d'indemnisation.
            </p>
          </section>

          {/* 4. Compte utilisateur */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">4. Compte utilisateur</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Certaines fonctionnalités du site nécessitent la création d'un compte. L'utilisateur s'engage à :
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Fournir des informations exactes et à les maintenir à jour</li>
              <li>Préserver la confidentialité de ses identifiants de connexion</li>
              <li>Ne pas partager son compte avec des tiers</li>
              <li>Signaler immédiatement toute utilisation non autorisée de son compte</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              En cas d'usage abusif, frauduleux ou contraire aux présentes conditions, le compte peut être limité ou supprimé 
              sans préavis ni compensation.
            </p>
          </section>

          {/* 5. Propriété intellectuelle */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">5. Propriété intellectuelle</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              L'ensemble des contenus présents sur le site (textes, QCM, visuels, logos, structure, mise en page, code source) 
              est protégé par le droit de la propriété intellectuelle. Ces éléments restent la propriété exclusive du site.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              L'utilisateur est autorisé à consulter et utiliser les contenus à des fins personnelles et non commerciales uniquement. 
              Toute reproduction, diffusion, modification, extraction ou exploitation non autorisée des contenus est strictement interdite 
              et peut faire l'objet de poursuites.
            </p>
          </section>

          {/* 6. Comportements interdits */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">6. Comportements interdits</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              L'utilisateur s'engage à ne pas :
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Extraire massivement les questions ou contenus du site (scraping)</li>
              <li>Utiliser des robots, scripts ou outils automatisés pour accéder au site</li>
              <li>Tenter de pirater, contourner ou compromettre la sécurité du site</li>
              <li>Utiliser le site à des fins illégales, frauduleuses ou nuisibles</li>
              <li>Perturber le fonctionnement normal du site ou nuire aux autres utilisateurs</li>
              <li>Revendre, redistribuer ou exploiter commercialement les contenus</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Tout manquement à ces règles peut entraîner la restriction ou la suppression immédiate de l'accès au site.
            </p>
          </section>

          {/* 7. Limitation de responsabilité */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">7. Limitation de responsabilité</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <strong>Aucune garantie de réussite :</strong> Le site est un outil de préparation et d'entraînement. 
              Il ne garantit en aucun cas la réussite à l'examen civique officiel.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <strong>Exactitude des informations :</strong> Malgré le soin apporté à la rédaction des contenus, 
              des erreurs ou omissions peuvent exister. L'utilisateur reste responsable de vérifier les informations 
              auprès des sources officielles (préfectures, sites gouvernementaux, centres agréés CCI).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Dysfonctionnements techniques :</strong> Le site ne peut être tenu responsable des dommages directs 
              ou indirects résultant de dysfonctionnements techniques, de pertes de données, d'interruptions de service 
              ou de l'indisponibilité temporaire du site.
            </p>
          </section>

          {/* 8. Données personnelles */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">8. Données personnelles</h2>
            <p className="text-muted-foreground leading-relaxed">
              Le site collecte et traite certaines données personnelles dans le cadre de son fonctionnement. 
              Pour connaître les détails sur la collecte, l'utilisation, la conservation des données et les droits 
              dont dispose l'utilisateur, veuillez consulter la{" "}
              <Link to="/privacy" className="text-primary hover:underline font-medium">
                Politique de confidentialité
              </Link>.
            </p>
          </section>

          {/* 9. Liens externes */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">9. Liens externes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Le site peut contenir des liens vers des sites tiers (sites officiels, ressources externes, centres d'examen). 
              Ces liens sont fournis à titre informatif. Le site n'exerce aucun contrôle sur ces sites externes et décline 
              toute responsabilité quant à leur contenu, leur disponibilité ou leurs pratiques en matière de confidentialité.
            </p>
          </section>

          {/* 10. Droit applicable */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">10. Droit applicable et évolution des conditions</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Les présentes conditions sont soumises au droit français. En cas de litige, les parties s'efforceront 
              de trouver une solution amiable avant tout recours judiciaire.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Le site se réserve le droit de modifier les présentes conditions à tout moment. La version en vigueur 
              est celle accessible en ligne au moment de la consultation. L'utilisateur est invité à consulter 
              régulièrement cette page pour prendre connaissance des éventuelles modifications.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">11. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pour toute question relative aux présentes conditions d'utilisation, l'utilisateur peut nous contacter 
              via la page{" "}
              <Link to="/support" className="text-primary hover:underline font-medium">
                Support
              </Link>.
            </p>
          </section>

          {/* Date de mise à jour */}
          <section className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              Dernière mise à jour : 10 décembre 2025
            </p>
          </section>
        </Card>
      </main>
    </div>
  );
};

export default Terms;
