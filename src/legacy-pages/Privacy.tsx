import React from "react";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <SEO 
        title="Politique de confidentialité – QCM Civique"
        description="Découvrez comment QCM Civique protège vos données personnelles. Conformité RGPD, droits d'accès, cookies et sécurité de vos informations."
        canonical="/privacy"
      />
      <Navigation />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Politique de Confidentialité
        </h1>

        <Card className="p-6 md:p-8 space-y-8">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              La présente politique de confidentialité décrit comment le site QCM Civique collecte, utilise et protège 
              les données personnelles des utilisateurs. En utilisant ce site, l'utilisateur reconnaît avoir pris 
              connaissance de cette politique et en accepte les termes.
            </p>
          </section>

          {/* 2. Données collectées */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">2. Données collectées</h2>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Données fournies par l'utilisateur</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Adresse e-mail (lors de l'inscription ou de l'utilisation du formulaire de contact)</li>
              <li>Nom ou pseudo (si renseigné dans le profil)</li>
              <li>Messages envoyés via les formulaires de contact ou de retour d'expérience</li>
              <li>Résultats de quiz et progression (pour les utilisateurs connectés)</li>
            </ul>

            <h3 className="text-lg font-medium mb-2 mt-4">Données de navigation</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Pages consultées et temps de visite</li>
              <li>Type d'appareil et navigateur utilisé</li>
              <li>Adresse IP (anonymisée ou raccourcie)</li>
              <li>Cookies et identifiants de session</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-3">
              Certaines données sont nécessaires pour utiliser les fonctionnalités du site (par exemple, l'adresse e-mail 
              pour créer un compte). D'autres sont collectées automatiquement lors de la navigation.
            </p>
          </section>

          {/* 3. Finalités */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">3. Finalités de la collecte</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Les données collectées sont utilisées pour :
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Gestion des comptes :</strong> permettre l'inscription, la connexion et le suivi de progression</li>
              <li><strong>Communication :</strong> répondre aux demandes envoyées via les formulaires</li>
              <li><strong>Amélioration du service :</strong> analyser l'utilisation du site pour améliorer les contenus pédagogiques</li>
              <li><strong>Mesure d'audience :</strong> produire des statistiques anonymisées sur la fréquentation</li>
              <li><strong>Sécurité :</strong> prévenir les abus, les fraudes et protéger le site contre les attaques</li>
            </ul>
          </section>

          {/* 4. Base légale */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">4. Base légale du traitement</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Le traitement des données personnelles repose sur :
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>L'exécution du service :</strong> les données nécessaires au fonctionnement du site (compte, quiz) sont traitées pour fournir le service demandé</li>
              <li><strong>Le consentement :</strong> pour certains cookies non essentiels et communications optionnelles</li>
              <li><strong>L'intérêt légitime :</strong> pour la mesure d'audience et l'amélioration continue du service, dans le respect de la vie privée</li>
            </ul>
          </section>

          {/* 5. Cookies */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">5. Cookies et traceurs</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Un cookie est un petit fichier texte stocké sur l'appareil de l'utilisateur lors de sa visite sur le site. 
              Le site utilise différents types de cookies :
            </p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Cookies strictement nécessaires</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ces cookies sont indispensables au fonctionnement du site (session de connexion, préférences de langue, 
              thème clair/sombre). Ils ne nécessitent pas de consentement.
            </p>

            <h3 className="text-lg font-medium mb-2 mt-4">Cookies de mesure d'audience</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ces cookies permettent de mesurer la fréquentation du site et d'analyser son utilisation (Google Analytics). 
              Ils sont soumis au consentement de l'utilisateur lorsqu'ils ne sont pas purement techniques.
            </p>

            <p className="text-muted-foreground leading-relaxed mt-3">
              L'utilisateur peut gérer ses préférences de cookies via les paramètres de son navigateur ou le bandeau 
              de consentement affiché lors de sa première visite.
            </p>
          </section>

          {/* 6. Durée de conservation */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">6. Durée de conservation</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Données de compte :</strong> conservées tant que le compte est actif, puis supprimées ou anonymisées après 2 ans d'inactivité</li>
              <li><strong>Messages de contact :</strong> conservés le temps de traiter la demande, puis jusqu'à 1 an maximum</li>
              <li><strong>Données de navigation et cookies :</strong> durée variable selon le type (généralement de quelques jours à 13 mois)</li>
              <li><strong>Résultats de quiz :</strong> conservés tant que le compte est actif</li>
            </ul>
          </section>

          {/* 7. Partage des données */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">7. Partage des données</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <strong>Les données personnelles ne sont pas vendues.</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Certaines données peuvent être accessibles à des prestataires techniques de confiance, uniquement pour 
              les besoins du service :
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Hébergement du site et de la base de données</li>
              <li>Outils d'analyse et de mesure d'audience</li>
              <li>Services de paiement (pour les achats)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Des données peuvent également être transmises aux autorités compétentes en cas d'obligation légale.
            </p>
          </section>

          {/* 8. Sécurité */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">8. Sécurité des données</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Le site met en œuvre des mesures techniques et organisationnelles pour protéger les données personnelles :
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Chiffrement des communications (HTTPS)</li>
              <li>Mots de passe stockés de manière sécurisée (hachage)</li>
              <li>Limitation des accès aux données au strict nécessaire</li>
              <li>Mises à jour régulières des systèmes</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Aucun système n'étant totalement invulnérable, le site fait son possible pour limiter les risques 
              tout en ne pouvant garantir une sécurité absolue.
            </p>
          </section>

          {/* 9. Droits des utilisateurs */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">9. Droits des utilisateurs</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Conformément au Règlement Général sur la Protection des Données (RGPD), l'utilisateur dispose des droits suivants :
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Droit d'accès :</strong> obtenir une copie des données personnelles détenues</li>
              <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
              <li><strong>Droit d'effacement :</strong> demander la suppression des données (dans certains cas)</li>
              <li><strong>Droit d'opposition :</strong> s'opposer au traitement des données pour des motifs légitimes</li>
              <li><strong>Droit de limitation :</strong> limiter temporairement le traitement des données</li>
              <li><strong>Droit à la portabilité :</strong> récupérer ses données dans un format structuré</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Pour exercer ces droits, l'utilisateur peut nous contacter via la page{" "}
              <Link to="/support" className="text-primary hover:underline font-medium">
                Support
              </Link>.
            </p>
          </section>

          {/* 10. Transferts hors UE */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">10. Transferts hors Union européenne</h2>
            <p className="text-muted-foreground leading-relaxed">
              Certains outils ou prestataires utilisés peuvent être situés en dehors de l'Union européenne. 
              Dans ce cas, le site veille à ce qu'un niveau de protection adéquat soit garanti, notamment par 
              l'utilisation de clauses contractuelles types approuvées par la Commission européenne ou de 
              mécanismes de certification équivalents.
            </p>
          </section>

          {/* 11. Modifications */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">11. Modifications de la politique</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cette politique de confidentialité peut être mise à jour pour refléter les évolutions du site ou 
              de la réglementation. La version en ligne au moment de la consultation est celle qui s'applique. 
              L'utilisateur est invité à consulter régulièrement cette page.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">12. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pour toute question relative à cette politique de confidentialité ou pour exercer vos droits, 
              veuillez nous contacter via la page{" "}
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

export default Privacy;
