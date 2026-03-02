import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const MentionsLegales = () => {
  return (
    <>
      <SEO
        title="Mentions Légales - QCM Civique"
        description="Mentions légales et informations éditoriales du site QCM Civique."
        noIndex
      />

      <div className="max-w-4xl mx-auto py-12 px-4">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
        </Button>

        <article className="prose prose-slate max-w-none dark:prose-invert bg-card p-8 rounded-xl border shadow-sm">
          <h1 className="text-3xl font-bold mb-6">Mentions Légales</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Éditeur du site</h2>
            <p>
              Le site <strong>qcmcivique.fr</strong> est une plateforme de préparation à l'examen civique français,
              éditée par la micro-entreprise <strong>zrWeb</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>
                <strong>Dénomination :</strong> zrWeb
              </li>
              <li>
                <strong>Statut juridique :</strong> Micro-entreprise
              </li>
              <li>
                <strong>Siège social :</strong> Domicilié en France
              </li>
              <li>
                <strong>Email de contact :</strong> contact@qcmcivique.fr
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Hébergement</h2>
            <p>L'infrastructure technique du site est assurée par :</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>
                <strong>Application & Frontend :</strong> Lovable / Netlify
                <br />
                <span className="text-sm text-muted-foreground">Infrastructure Cloud distribuée</span>
              </li>
              <li>
                <strong>Base de données & Authentification :</strong> Supabase
                <br />
                <span className="text-sm text-muted-foreground">Données hébergées sur des serveurs sécurisés</span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu présent sur le site <strong>qcmcivique.fr</strong> (structure, logos, textes,
              images, base de données de questions) est la propriété exclusive de <strong>zrWeb</strong> ou de ses
              partenaires. Toute reproduction, distribution ou utilisation non autorisée du contenu est strictement
              interdite sans accord écrit préalable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Limitation de responsabilité</h2>
            <p>
              QCM Civique s'efforce de fournir des informations aussi précises que possible sur l'examen de
              naturalisation. Toutefois, le site ne peut être tenu responsable des omissions, des inexactitudes ou des
              changements réglementaires récents. L'utilisation des informations disponibles sur ce site se fait sous
              l'entière responsabilité de l'utilisateur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Contact & Support</h2>
            <p>
              Pour toute question relative à votre compte, à la facturation ou pour signaler un problème technique, nous
              vous invitons à utiliser notre système de messagerie interne ou à consulter notre FAQ.
            </p>
            <div className="mt-4">
              <Button variant="outline" asChild>
                <Link to="/contact">Contacter le support</Link>
              </Button>
            </div>
          </section>
        </article>
      </div>
    </>
  );
};

export default MentionsLegales;
