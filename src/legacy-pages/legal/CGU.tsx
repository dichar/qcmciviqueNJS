import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CGU = () => {
  return (
    <>
      <SEO
        title="Conditions Générales d'Utilisation - QCM Civique"
        description="Conditions Générales d'Utilisation du site QCM Civique."
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
          <h1>Conditions Générales d'Utilisation</h1>

          <h2>1. Objet des conditions d'utilisation</h2>
          <p>
            Les présentes conditions générales d'utilisation (CGU) encadrent l'accès et l'utilisation du site QCM Civique. En naviguant sur ce site ou en utilisant ses services, l'utilisateur accepte sans réserve les présentes conditions. Si l'utilisateur n'accepte pas ces conditions, il est invité à ne pas utiliser le site.
          </p>

          <h2>2. Description des services</h2>
          <p>Le site propose des outils de préparation à l'examen civique français, notamment :</p>
          <ul>
            <li>Des QCM d'entraînement couvrant les thèmes officiels de l'examen civique</li>
            <li>Des contenus pédagogiques (fiches de révision, explications)</li>
            <li>Un outil de vérification d'éligibilité à l'examen</li>
            <li>La possibilité de créer un compte pour suivre sa progression</li>
            <li>Des informations sur les centres d'examen agréés</li>
          </ul>
          <p>
            <strong>Important :</strong> Ce site n'est pas un service officiel de l'État français. Les informations fournies sont à titre indicatif et ne remplacent pas les sources officielles. Le contenu peut être modifié ou mis à jour à tout moment sans préavis.
          </p>

          <h2>3. Accès au site</h2>
          <p>
            L'utilisateur est responsable de disposer de l'équipement informatique et de la connexion internet nécessaires pour accéder au site. Le site s'efforce d'être accessible en permanence, mais peut être temporairement indisponible pour des raisons de maintenance, de mise à jour ou de force majeure.
          </p>
          <p>
            Le site se réserve le droit de modifier, suspendre ou interrompre tout ou partie des services proposés, sans obligation de préavis ni d'indemnisation.
          </p>

          <h2>4. Compte utilisateur</h2>
          <p>Certaines fonctionnalités du site nécessitent la création d'un compte. L'utilisateur s'engage à :</p>
          <ul>
            <li>Fournir des informations exactes et à les maintenir à jour</li>
            <li>Préserver la confidentialité de ses identifiants de connexion</li>
            <li>Ne pas partager son compte avec des tiers</li>
            <li>Signaler immédiatement toute utilisation non autorisée de son compte</li>
          </ul>
          <p>
            En cas d'usage abusif, frauduleux ou contraire aux présentes conditions, le compte peut être limité ou supprimé sans préavis ni compensation.
          </p>

          <h2>5. Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur le site (textes, QCM, visuels, logos, structure, mise en page, code source) est protégé par le droit de la propriété intellectuelle. Ces éléments restent la propriété exclusive du site.
          </p>
          <p>
            L'utilisateur est autorisé à consulter et utiliser les contenus à des fins personnelles et non commerciales uniquement. Toute reproduction, diffusion, modification, extraction ou exploitation non autorisée des contenus est strictement interdite et peut faire l'objet de poursuites.
          </p>

          <h2>6. Comportements interdits</h2>
          <p>L'utilisateur s'engage à ne pas :</p>
          <ul>
            <li>Extraire massivement les questions ou contenus du site (scraping)</li>
            <li>Utiliser des robots, scripts ou outils automatisés pour accéder au site</li>
            <li>Tenter de pirater, contourner ou compromettre la sécurité du site</li>
            <li>Utiliser le site à des fins illégales, frauduleuses ou nuisibles</li>
            <li>Perturber le fonctionnement normal du site ou nuire aux autres utilisateurs</li>
            <li>Revendre, redistribuer ou exploiter commercialement les contenus</li>
          </ul>
          <p>
            Tout manquement à ces règles peut entraîner la restriction ou la suppression immédiate de l'accès au site.
          </p>

          <h2>7. Limitation de responsabilité</h2>
          <ul>
            <li><strong>Aucune garantie de réussite :</strong> Le site est un outil de préparation et d'entraînement. Il ne garantit en aucun cas la réussite à l'examen civique officiel.</li>
            <li><strong>Exactitude des informations :</strong> Malgré le soin apporté à la rédaction des contenus, des erreurs ou omissions peuvent exister. L'utilisateur reste responsable de vérifier les informations auprès des sources officielles (préfectures, sites gouvernementaux, centres agréés CCI).</li>
            <li><strong>Dysfonctionnements techniques :</strong> Le site ne peut être tenu responsable des dommages directs ou indirects résultant de dysfonctionnements techniques, de pertes de données, d'interruptions de service ou de l'indisponibilité temporaire du site.</li>
          </ul>

          <h2>8. Données personnelles</h2>
          <p>
            Le site collecte et traite certaines données personnelles dans le cadre de son fonctionnement. Pour connaître les détails sur la collecte, l'utilisation, la conservation des données et les droits dont dispose l'utilisateur, veuillez consulter la <Link to="/confidentialite" className="text-primary hover:underline">Politique de confidentialité</Link>.
          </p>

          <h2>9. Liens externes</h2>
          <p>
            Le site peut contenir des liens vers des sites tiers (sites officiels, ressources externes, centres d'examen). Ces liens sont fournis à titre informatif. Le site n'exerce aucun contrôle sur ces sites externes et décline toute responsabilité quant à leur contenu, leur disponibilité ou leurs pratiques en matière de confidentialité.
          </p>

          <h2>10. Droit applicable et évolution des conditions</h2>
          <p>
            Les présentes conditions sont soumises au droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable avant tout recours judiciaire.
          </p>
          <p>
            Le site se réserve le droit de modifier les présentes conditions à tout moment. La version en vigueur est celle accessible en ligne au moment de la consultation. L'utilisateur est invité à consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
          </p>

          <h2>11. Contact</h2>
          <p>
            Pour toute question relative aux présentes conditions d'utilisation, l'utilisateur peut nous contacter via la page <Link to="/support" className="text-primary hover:underline">Support</Link>.
          </p>
        </article>
      </div>
    </>
  );
};

export default CGU;
