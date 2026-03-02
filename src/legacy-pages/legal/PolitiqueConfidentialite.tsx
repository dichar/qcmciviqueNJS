import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PolitiqueConfidentialite = () => {
  return (
    <>
      <SEO
        title="Politique de Confidentialité - QCM Civique"
        description="Politique de confidentialité et protection des données personnelles sur QCM Civique."
        noIndex
      />
      
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Link>
        </Button>

        <article className="prose prose-slate max-w-none dark:prose-invert">
          <h1>Politique de Confidentialité</h1>

          <h2>1. Introduction</h2>
          <p>
            La présente politique de confidentialité décrit comment le site QCM Civique collecte, utilise et protège les données personnelles des utilisateurs. En utilisant ce site, l'utilisateur reconnaît avoir pris connaissance de cette politique et en accepte les termes.
          </p>

          <h2>2. Données collectées</h2>
          <p><strong>Données fournies par l'utilisateur :</strong></p>
          <ul>
            <li>Adresse e-mail (lors de l'inscription ou de l'utilisation du formulaire de contact)</li>
            <li>Nom ou pseudo (si renseigné dans le profil)</li>
            <li>Messages envoyés via les formulaires de contact ou de retour d'expérience</li>
            <li>Résultats de quiz et progression (pour les utilisateurs connectés)</li>
          </ul>
          <p><strong>Données de navigation :</strong></p>
          <ul>
            <li>Pages consultées et temps de visite</li>
            <li>Type d'appareil et navigateur utilisé</li>
            <li>Adresse IP (anonymisée ou raccourcie)</li>
            <li>Cookies et identifiants de session</li>
          </ul>
          <p>
            Certaines données sont nécessaires pour utiliser les fonctionnalités du site (par exemple, l'adresse e-mail pour créer un compte). D'autres sont collectées automatiquement lors de la navigation.
          </p>

          <h2>3. Finalités de la collecte</h2>
          <p>Les données collectées sont utilisées pour :</p>
          <ul>
            <li><strong>Gestion des comptes :</strong> permettre l'inscription, la connexion et le suivi de progression</li>
            <li><strong>Communication :</strong> répondre aux demandes envoyées via les formulaires</li>
            <li><strong>Amélioration du service :</strong> analyser l'utilisation du site pour améliorer les contenus pédagogiques</li>
            <li><strong>Mesure d'audience :</strong> produire des statistiques anonymisées sur la fréquentation</li>
            <li><strong>Sécurité :</strong> prévenir les abus, les fraudes et protéger le site contre les attaques</li>
          </ul>

          <h2>4. Base légale du traitement</h2>
          <p>Le traitement des données personnelles repose sur :</p>
          <ul>
            <li><strong>L'exécution du service :</strong> les données nécessaires au fonctionnement du site (compte, quiz) sont traitées pour fournir le service demandé</li>
            <li><strong>Le consentement :</strong> pour certains cookies non essentiels et communications optionnelles</li>
            <li><strong>L'intérêt légitime :</strong> pour la mesure d'audience et l'amélioration continue du service, dans le respect de la vie privée</li>
          </ul>

          <h2>5. Cookies et traceurs</h2>
          <p>
            Un cookie est un petit fichier texte stocké sur l'appareil de l'utilisateur lors de sa visite sur le site. Le site utilise différents types de cookies :
          </p>
          <ul>
            <li><strong>Cookies strictement nécessaires :</strong> Ces cookies sont indispensables au fonctionnement du site (session de connexion, préférences de langue, thème clair/sombre). Ils ne nécessitent pas de consentement.</li>
            <li><strong>Cookies de mesure d'audience :</strong> Ces cookies permettent de mesurer la fréquentation du site et d'analyser son utilisation. Ils sont soumis au consentement de l'utilisateur lorsqu'ils ne sont pas purement techniques.</li>
          </ul>
          <p>
            L'utilisateur peut gérer ses préférences de cookies via les paramètres de son navigateur ou le bandeau de consentement affiché lors de sa première visite.
          </p>

          <h2>6. Durée de conservation</h2>
          <ul>
            <li><strong>Données de compte :</strong> conservées tant que le compte est actif, puis supprimées ou anonymisées après 2 ans d'inactivité.</li>
            <li><strong>Messages de contact :</strong> conservés le temps de traiter la demande, puis jusqu'à 1 an maximum.</li>
            <li><strong>Données de navigation et cookies :</strong> durée variable selon le type (généralement de quelques jours à 13 mois).</li>
            <li><strong>Résultats de quiz :</strong> conservés tant que le compte est actif.</li>
          </ul>

          <h2>7. Partage des données</h2>
          <p>Les données personnelles ne sont pas vendues.</p>
          <p>
            Certaines données peuvent être accessibles à des prestataires techniques de confiance, uniquement pour les besoins du service :
          </p>
          <ul>
            <li><strong>Supabase :</strong> Hébergement de la base de données et gestion de l'authentification.</li>
            <li><strong>Stripe :</strong> Gestion sécurisée des paiements bancaires.</li>
            <li><strong>Resend :</strong> Service d'envoi d'emails transactionnels.</li>
            <li><strong>Lovable / Netlify :</strong> Hébergement du site web.</li>
          </ul>
          <p>Des données peuvent également être transmises aux autorités compétentes en cas d'obligation légale.</p>

          <h2>8. Sécurité des données</h2>
          <p>Le site met en œuvre des mesures techniques et organisationnelles pour protéger les données personnelles :</p>
          <ul>
            <li>Chiffrement des communications (HTTPS)</li>
            <li>Mots de passe stockés de manière sécurisée (hachage)</li>
            <li>Limitation des accès aux données au strict nécessaire</li>
            <li>Mises à jour régulières des systèmes</li>
          </ul>
          <p>
            Aucun système n'étant totalement invulnérable, le site fait son possible pour limiter les risques tout en ne pouvant garantir une sécurité absolue.
          </p>

          <h2>9. Droits des utilisateurs</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD), l'utilisateur dispose des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès :</strong> obtenir une copie des données personnelles détenues</li>
            <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
            <li><strong>Droit d'effacement :</strong> demander la suppression des données (dans certains cas)</li>
            <li><strong>Droit d'opposition :</strong> s'opposer au traitement des données pour des motifs légitimes</li>
            <li><strong>Droit de limitation :</strong> limiter temporairement le traitement des données</li>
            <li><strong>Droit à la portabilité :</strong> récupérer ses données dans un format structuré</li>
          </ul>
          <p>
            Pour exercer ces droits, l'utilisateur peut nous contacter via la page <Link to="/support" className="text-primary hover:underline">Support</Link>.
          </p>

          <h2>10. Transferts hors Union européenne</h2>
          <p>
            Certains outils ou prestataires utilisés peuvent être situés en dehors de l'Union européenne (ex: services Google, Stripe). Dans ce cas, le site veille à ce qu'un niveau de protection adéquat soit garanti, notamment par l'utilisation de clauses contractuelles types approuvées par la Commission européenne ou de mécanismes de certification équivalents.
          </p>

          <h2>11. Modifications de la politique</h2>
          <p>
            Cette politique de confidentialité peut être mise à jour pour refléter les évolutions du site ou de la réglementation. La version en ligne au moment de la consultation est celle qui s'applique. L'utilisateur est invité à consulter régulièrement cette page.
          </p>

          <h2>12. Contact</h2>
          <p>
            Pour toute question relative à cette politique de confidentialité ou pour exercer vos droits, veuillez nous contacter via la page <Link to="/support" className="text-primary hover:underline">Support</Link>.
          </p>
        </article>
      </div>
    </>
  );
};

export default PolitiqueConfidentialite;
