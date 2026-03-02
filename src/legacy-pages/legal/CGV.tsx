import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CGV = () => {
  return (
    <>
      <SEO
        title="Conditions Générales de Vente - QCM Civique"
        description="Conditions Générales de Vente du site QCM Civique."
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
          <h1>Conditions Générales de Vente (CGV)</h1>

          <h2>1. Préambule</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les transactions commerciales effectuées sur le site QCM Civique.
          </p>

          <h2>2. Produits et Services</h2>
          <p>
            Le site propose des abonnements numériques permettant d'accéder à des fonctionnalités avancées de préparation à l'examen civique :
          </p>
          <ul>
            <li><strong>Pack Essentiel (12,99 €) :</strong> Accès illimité aux QCM pendant 1 mois.</li>
            <li><strong>Pack Réussite (19,99 €) :</strong> Accès pendant 3 mois + Livret interactif.</li>
            <li><strong>Pack Premium Plus (29,99 €) :</strong> Accès à vie + Livret + Simulation entretien + Quiz éligibilité.</li>
          </ul>

          <h2>3. Prix et Paiement</h2>
          <p>
            Les prix sont indiqués en euros (€) toutes taxes comprises (TTC). Le paiement est exigible immédiatement à la commande.
          </p>
          <p>
            Le règlement s'effectue par carte bancaire via le prestataire de paiement sécurisé <strong>Stripe</strong>. Les coordonnées bancaires de l'utilisateur ne sont jamais stockées par QCM Civique.
          </p>

          <h2>4. Livraison</h2>
          <p>
            L'accès aux services numériques est activé immédiatement après la validation du paiement par Stripe. Un email de confirmation est envoyé à l'utilisateur.
          </p>

          <h2>5. Renoncement au droit de rétractation</h2>
          <p>
            Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.
          </p>
          <p>
            <strong>En souscrivant à un Pack sur QCM Civique, l'utilisateur accepte l'exécution immédiate du service et renonce expressément à son droit de rétractation.</strong>
          </p>

          <h2>6. Garanties et Responsabilité</h2>
          <p>
            Le site s'engage à fournir le service tel que décrit, sous réserve des aléas techniques. En cas de défaut de conformité, l'utilisateur peut contacter le support.
          </p>

          <h2>7. Contact</h2>
          <p>
            Pour toute question relative à ces conditions de vente, l'utilisateur peut nous contacter via la page <Link to="/support" className="text-primary hover:underline">Support</Link>.
          </p>
        </article>
      </div>
    </>
  );
};

export default CGV;
