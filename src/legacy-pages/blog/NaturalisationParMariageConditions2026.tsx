import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, FileText, Heart } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";

const NaturalisationParMariageConditions2026 = () => {
  return (
    <UnifiedLayout>
      <SEO 
        title="Naturalisation par Mariage 2026 : Conditions, Étapes et Pièges à Éviter"
        description="Guide complet sur la naturalisation par mariage en France. Conditions de durée, vie commune, niveau B1, examen civique et pièges fréquents à éviter."
        canonical="/blog/naturalisation-par-mariage-conditions-2026"
        type="article"
      />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
              Procédure
            </span>
            <span>•</span>
            <time dateTime="2025-12-18">18 décembre 2025</time>
            <span>•</span>
            <span>14 min de lecture</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Naturalisation par Mariage : Conditions, Étapes et Pièges à Éviter en 2026
          </h1>
          <p className="text-xl text-muted-foreground">
            Le mariage avec un citoyen français ouvre une voie accélérée vers la naturalisation, mais cette voie comporte des pièges majeurs. Depuis 2026, l'examen civique s'y ajoute.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Conditions Obligatoires</h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="flex items-center gap-3 font-bold text-lg mb-4">
                  <Heart className="w-6 h-6 text-red-500" />
                  1. Durée Minimale de Mariage et Vie Commune
                </h3>
                <p className="text-muted-foreground mb-4">
                  C'est la condition la plus importante et la plus fréquemment source de refus.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Cas général :</strong> Marié depuis au moins 4 ans avec vie commune ininterrompue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Avec résidence en France :</strong> Réduit à 3 ans si vie commune en France pendant 3 ans après le mariage</span>
                  </li>
                </ul>
                <Card className="p-4 bg-amber-50 border-amber-200 mt-4">
                  <p className="flex items-start gap-2 m-0 text-amber-800">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span><strong>Important :</strong> La vie commune doit être continue. Toute séparation de plus de quelques mois peut entraîner le refus.</span>
                  </p>
                </Card>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">2. Votre Conjoint Doit Être Français</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Votre conjoint doit être de nationalité française au moment du mariage</li>
                  <li>• Il doit conserver la nationalité française au moment de votre demande</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">3. Absence de Condamnation Pénale</h3>
                <p className="text-muted-foreground mb-3">
                  Vous ne devez pas avoir été condamné à une peine supérieure à 6 mois d'emprisonnement.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Les petites infractions (stationnement, excès de vitesse) ne vous disqualifient pas</li>
                  <li>• Une condamnation pour violences, fraude, ou crime disqualifie complètement</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">4. Niveau de Langue B1</h3>
                <p className="text-muted-foreground mb-3">
                  Vous devez justifier d'un niveau B1 à l'écrit et à l'oral.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Test TEF ou DELF B1</li>
                  <li>• Diplôme français de niveau 3 (Brevet, CAP)</li>
                  <li>• Certificats valides 2 ans</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">5. Examen Civique (Depuis 2026)</h3>
                <p className="text-muted-foreground">
                  L'examen civique est obligatoire avec un seuil de 80%. 40 questions en 45 minutes sur l'histoire, les institutions, les valeurs républicaines et les droits/devoirs des citoyens.
                </p>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Les Pièges à Éviter</h2>
            
            <div className="space-y-4">
              <Card className="p-6 border-l-4 border-l-red-500">
                <h3 className="font-bold text-lg mb-2">Piège 1 : Compter les mois incorrectement</h3>
                <p className="text-muted-foreground">
                  Les 4 ans doivent s'être écoulés ET vous devez avoir été en vie commune continue. Une séparation annule tout.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-red-500">
                <h3 className="font-bold text-lg mb-2">Piège 2 : Sous-estimer les justificatifs de vie commune</h3>
                <p className="text-muted-foreground">
                  La préfecture vérifiera vraiment que vous vivez ensemble. Des factures au nom d'une seule personne peuvent susciter des doutes.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-red-500">
                <h3 className="font-bold text-lg mb-2">Piège 3 : Oublier la transcription du mariage</h3>
                <p className="text-muted-foreground">
                  Si votre mariage n'est pas transcrit aux registres français, vous ne pouvez même pas commencer la procédure.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-red-500">
                <h3 className="font-bold text-lg mb-2">Piège 4 : Ignorer le niveau B1</h3>
                <p className="text-muted-foreground">
                  Sans preuve d'un niveau B1 en français, votre demande sera rejetée.
                </p>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Procédure Pas à Pas</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold mb-1">Transcription du mariage</h3>
                  <p className="text-muted-foreground">Si marié à l'étranger, faites transcrire l'acte aux registres de l'état civil français.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold mb-1">Réunir les documents</h3>
                  <p className="text-muted-foreground">Passeport, actes de naissance, certificat de mariage, justificatifs de vie commune et ressources.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold mb-1">Dépôt à la préfecture</h3>
                  <p className="text-muted-foreground">À la préfecture du lieu de résidence de votre conjoint. Délai : 6 à 18 mois.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold mb-1">Examen civique</h3>
                  <p className="text-muted-foreground">40 questions, 45 minutes, 80% requis. Vous pouvez le tenter autant de fois que nécessaire.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div>
                  <h3 className="font-bold mb-1">Entretien d'assimilation</h3>
                  <p className="text-muted-foreground">20 à 45 minutes pour vérifier la réalité de votre vie commune et votre assimilation.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Combien de temps faut-il vraiment ?</h3>
                <p className="text-muted-foreground">En général, 1,5 à 2 ans du dépôt à la naturalisation.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Que se passe-t-il si je divorce pendant la procédure ?</h3>
                <p className="text-muted-foreground">La procédure s'arrête. Vous ne pouvez plus demander la naturalisation par mariage.</p>
              </div>
            </div>
          </section>
        </div>

        <Card className="p-8 bg-primary/5 border-primary/20 mt-12">
          <h2 className="text-2xl font-bold mb-4">Préparez l'examen civique</h2>
          <p className="text-muted-foreground mb-6">
            Entraînez-vous avec notre QCM de 40 questions en conditions réelles.
          </p>
          <Button asChild size="lg">
            <Link to="/quiz">Lancer un essai gratuit</Link>
          </Button>
        </Card>

        <div className="flex justify-center mt-8">
          <ShareButtons 
            title="Naturalisation par Mariage : Guide Complet 2026"
            description="Conditions, étapes et pièges à éviter"
            compact={false}
          />
        </div>
      </article>
    </UnifiedLayout>
  );
};

export default NaturalisationParMariageConditions2026;
