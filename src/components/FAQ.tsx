import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { QUIZ_CONSTANTS, QUIZ_DISPLAY } from "@/constants/quiz";

export const FAQ = () => {
  const faqs = [
    {
      question: "Qu'est-ce que l'examen civique ?",
      answer: `L'examen civique est un test obligatoire pour certaines demandes en France à partir du 1er janvier 2026. Il porte sur la connaissance de la langue française (compréhension écrite), les valeurs et principes de la République française, et l'intégration républicaine. L'examen officiel comprend ${QUIZ_CONSTANTS.QUESTIONS_PER_QUIZ} questions et dure ${QUIZ_CONSTANTS.QUIZ_DURATION_MINUTES} minutes. Le seuil de réussite est ${QUIZ_CONSTANTS.PASSING_SCORE_PERCENT}% (${QUIZ_CONSTANTS.PASSING_SCORE} bonnes réponses minimum). Important : QCM Civique est un site d'entraînement privé. Pour l'examen officiel, rendez-vous sur formation-civique.interieur.gouv.fr ou contactez la CCI de votre région.`
    },
    {
      question: "Qui doit passer l'examen civique ?",
      answer: "L'examen civique est obligatoire pour : première demande de carte de séjour pluriannuelle (à partir du 1er janvier 2026), demande de carte de résident (à partir du 1er janvier 2026), demande de naturalisation française. Il n'est PAS obligatoire pour : un renouvellement de titre de séjour existant, un changement de statut, une première demande de Carte de Séjour Temporaire (CST) valide 1 an, les ressortissants algériens demandant un titre de séjour long (accord bilatéral 1968 – mais pas pour la naturalisation)."
    },
    {
      question: "Suis-je concerné si j'ai demandé mon titre avant 2026 ?",
      answer: "Cela dépend du type de demande : si vous avez demandé un renouvellement de votre titre avant le 1er janvier 2026, vous n'avez pas à passer l'examen pour ce renouvellement. Si vous demandez une première carte pluriannuelle après le 1er janvier 2026, vous devez passer l'examen, même si votre demande a été enregistrée avant cette date. Conseil : vérifiez auprès de la préfecture de votre département."
    },
    {
      question: "Les Algériens doivent-ils passer l'examen civique ?",
      answer: "Pour les titres de séjour : Non, les ressortissants algériens sont dispensés d'examen civique en vertu de l'accord bilatéral Franco-Algérie (1968). Pour la naturalisation : Oui, les Algériens qui demandent la nationalité française seront soumis à l'examen civique, car la naturalisation relève du Code civil français. Vous devez toujours prouver une connaissance suffisante du français et démontrer votre adhésion aux valeurs de la République."
    },
    {
      question: "Comment s'inscrire à l'examen officiel ?",
      answer: "L'inscription se fait auprès des organismes officiels : CCI Paris Île-de-France – Le Français des affaires (www.lefrancaisdesaffaires.fr) ou France Éducation International. Rendez-vous sur formation-civique.interieur.gouv.fr pour trouver un centre agréé près de chez vous. Vous recevrez une convocation officielle par courrier. Important : QCM Civique ne gère pas les convocations."
    },
    {
      question: "Je n'ai pas reçu ma convocation – Que faire ?",
      answer: "Ne contactez pas QCM Civique. Vérifiez d'abord votre boîte mail (y compris spam) et que vous êtes bien inscrit sur le site officiel. Contactez formations-civique@interieur.gouv.fr ou la CCI de votre région. Délais typiques : convocation envoyée 6-8 semaines avant l'examen. Si vous êtes à moins de 4 semaines de votre examen, contactez immédiatement l'organisme."
    },
    {
      question: "Quel est le seuil de réussite à l'examen ?",
      answer: `Le seuil de réussite est ${QUIZ_CONSTANTS.PASSING_SCORE_PERCENT}%. Cela signifie que vous devez répondre correctement à au moins ${QUIZ_CONSTANTS.PASSING_SCORE} questions sur ${QUIZ_CONSTANTS.QUESTIONS_PER_QUIZ} pour réussir l'examen.`
    },
    {
      question: "Combien coûte l'examen civique officiel ?",
      answer: "L'examen officiel a un coût qui varie selon le centre de passation et la région. Les droits d'inscription sont fixés par chaque centre agréé, contactez directement le centre de votre département. Ce coût s'ajoute aux frais de votre demande de titre de séjour (200€ à 400€ selon le type). QCM Civique est un outil d'entraînement payant (12,99€ à 29,99€ selon l'offre) pour vous préparer."
    },
    {
      question: "Que puis-je réviser pour me préparer ?",
      answer: "Les thèmes principaux : Principes et valeurs de la République (égalité, liberté, fraternité, laïcité, symboles), Système institutionnel (Président, Gouvernement, Parlement), Droits et devoirs des citoyens (travail, éducation, santé, impôts), Intégration républicaine (égalité hommes-femmes, vivre-ensemble), Histoire, géographie et culture de France, Vie civile et pratique (famille, école, services publics). QCM Civique propose des questions d'entraînement sur tous ces thèmes."
    },
    {
      question: "Puis-je repasser l'examen si j'échoue ?",
      answer: "Oui, vous pouvez repasser l'examen autant de fois que nécessaire. Chaque nouvelle tentative coûte le tarif fixé par le centre. Il n'y a pas de limite de tentatives. Conseil : utilisez QCM Civique pour vous entraîner régulièrement. Une fois l'examen réussi, le résultat reste valable à vie."
    },
    {
      question: `Combien de questions contient le QCM ?`,
      answer: `Le test de naturalisation comporte ${QUIZ_CONSTANTS.QUESTIONS_PER_QUIZ} questions à choix multiples (QCM) par session. Notre banque de questions contient ${QUIZ_DISPLAY.TOTAL_QUESTIONS_TEXT} différentes pour vous permettre de réviser sans jamais voir les mêmes questions. Vous disposez de ${QUIZ_CONSTANTS.QUIZ_DURATION_MINUTES} minutes pour répondre.`
    },
    {
      question: "Est-ce que QCM Civique est un site officiel ?",
      answer: "Non. QCM Civique est un site d'entraînement privé créé pour vous aider à vous préparer à l'examen civique officiel. Nous ne sommes pas un organisme gouvernemental ni le gestionnaire des convocations. Nous sommes une plateforme d'entraînement avec ${QUIZ_DISPLAY.TOTAL_QUESTIONS_TEXT} questions et un outil pour tester vos connaissances. Pour l'examen officiel, contactez formation-civique.interieur.gouv.fr ou la CCI de votre région."
    },
    {
      question: "Pourquoi QCM Civique n'est pas gratuit ?",
      answer: "QCM Civique est développé et maintenu par une équipe pour créer et vérifier ${QUIZ_DISPLAY.TOTAL_QUESTIONS_TEXT} questions d'entraînement, suivre votre progression, proposer un livret pédagogique interactif, et mettre à jour le contenu selon les changements officiels. Nous proposons un essai gratuit (2 QCM de 40 questions en conditions réelles) pour tester avant d'acheter."
    },
    {
      question: "Est-ce un abonnement ?",
      answer: "Non. QCMcivique.fr fonctionne en paiement unique. Vous choisissez un pack et vous payez une seule fois le montant indiqué. Il n'y a aucun abonnement et aucun prélèvement récurrent."
    },
    {
      question: "Vais-je être débité tous les mois ?",
      answer: "Non. Il s'agit d'un paiement one shot. Une fois le pack payé, vous conservez l'accès inclus (1 mois, 3 mois ou à vie selon le pack), sans aucun renouvellement automatique."
    },
    {
      question: "J'ai trouvé une erreur dans une question – Que faire ?",
      answer: "Utilisez le bouton « Signaler une erreur » ou le formulaire de contact. Envoyez-nous le texte exact de la question, votre correction proposée, et une source. Notre équipe vérifie et corrige rapidement."
    },
    {
      question: "Puis-je utiliser QCM Civique sur mon téléphone ?",
      answer: "Oui, QCM Civique est accessible sur desktop et mobile. Vous pouvez vous entraîner n'importe où et n'importe quand. L'application est également installable sur votre téléphone."
    },
    {
      question: "Où puis-je passer l'examen officiel ?",
      answer: "L'examen civique se déroule dans les centres agréés CCI (via Le Français des Affaires) répartis dans toute la France. Attention : les préfectures et l'OFII ne peuvent PAS faire passer cet examen. Consultez notre page 'Centres d'Examen' pour trouver le centre le plus proche."
    }
  ];

  return (
    <section id="faq" aria-labelledby="faq-heading" className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-center mb-3">
          Questions Fréquentes sur l'Examen Civique
        </h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-12">
          Tout ce que vous devez savoir sur le test de naturalisation française
        </p>
        
        <Card className="p-4 md:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm md:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* SEO Schema for FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </div>
    </section>
  );
};
