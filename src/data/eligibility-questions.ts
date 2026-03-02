export interface EligibilityQuestion {
  id: string;
  question: string;
  source?: string;
  options: Array<{
    value: string;
    label: string;
    skipToResult?: EligibilityResultType;
  }>;
}

export type EligibilityResultType =
  | "not-concerned-transition"
  | "exempted-renewal"
  | "not-concerned-absolute"
  | "exempted-eu"
  | "exempted-minor"
  | "exempted-bilateral-probable"
  | "exempted-age-probable"
  | "check-age-complex"
  | "exempted-bpi-complex"
  | "medical-exemption"
  | "need-civic-exam-diploma"
  | "need-civic-exam-standard";

export const eligibilityQuestions: EligibilityQuestion[] = [
  {
    id: "date_depot",
    question: "Quand avez-vous déposé ou allez-vous déposer votre demande en préfecture ?",
    source: "Loi n° 2024-42 du 26 janvier 2024",
    options: [
      {
        value: "before-2026",
        label: "Ma demande a été déposée avant le 1er janvier 2026",
        skipToResult: "not-concerned-transition",
      },
      {
        value: "after-2026",
        label: "Ma demande est déposée à partir du 1er janvier 2026",
      },
    ],
  },
  {
    id: "demarche",
    question: "Quelle démarche administrative effectuez-vous ?",
    source: "Décrets d'application 2025",
    options: [
      {
        value: "renewal",
        label: "Renouvellement d'un titre existant (CSP ou Carte de Résident)",
        skipToResult: "exempted-renewal",
      },
      {
        value: "naturalization",
        label: "Demande de naturalisation française",
      },
      {
        value: "first-csp",
        label: "Première demande de Carte de Séjour Pluriannuelle (CSP)",
      },
      {
        value: "first-cr",
        label: "Première demande de Carte de Résident (CR - 10 ans)",
      },
      {
        value: "other",
        label: "Autre (Titre temporaire d'un an, visa long séjour, etc.)",
        skipToResult: "not-concerned-absolute",
      },
    ],
  },
  {
    id: "nationalite",
    question: "Quelle est votre nationalité ?",
    source: "Accords bilatéraux et Droit de l'UE",
    options: [
      {
        value: "fr",
        label: "Française ou double nationalité",
        skipToResult: "not-concerned-absolute",
      },
      {
        value: "eu",
        label: "Ressortissant de l'Union Européenne, de l'EEE ou de la Suisse",
        skipToResult: "exempted-eu",
      },
      {
        value: "algerian",
        label: "Algérienne (Accord franco-algérien de 1968)",
      },
      {
        value: "other",
        label: "Autre nationalité",
      },
    ],
  },
  {
    id: "age",
    question: "Quel sera votre âge au moment du dépôt de votre dossier en préfecture ?",
    source: "Article L. 413-7 du CESEDA",
    options: [
      {
        value: "under18",
        label: "Moins de 18 ans",
        skipToResult: "exempted-minor",
      },
      {
        value: "18to64",
        label: "Entre 18 et 64 ans",
      },
      {
        value: "65plus",
        label: "65 ans ou plus",
      },
    ],
  },
  {
    id: "statut_bpi",
    question: "Êtes-vous bénéficiaire de la protection internationale (Réfugié, Protection subsidiaire, Apatride) ?",
    source: "Loi du 26 janvier 2024",
    options: [
      {
        value: "yes",
        label: "Oui, j'ai l'un de ces statuts",
        skipToResult: "exempted-bpi-complex",
      },
      {
        value: "no",
        label: "Non",
      },
    ],
  },
  {
    id: "sante",
    question: "Avez-vous un handicap ou un état de santé déficient chronique certifié ?",
    source: "Arrêté du 10 octobre 2025",
    options: [
      {
        value: "yes-cert",
        label: "Oui, justifié par le certificat médical type réglementaire du Ministère",
        skipToResult: "medical-exemption",
      },
      {
        value: "no",
        label: "Non",
      },
    ],
  },
  {
    id: "diplome_france",
    question: "Avez-vous obtenu un diplôme d'État en France (ex: CAP, Bac, Licence, Master) ?",
    source: "Article L. 413-5 du CESEDA",
    options: [
      {
        value: "yes",
        label: "Oui, j'ai un diplôme obtenu en France",
        skipToResult: "need-civic-exam-diploma",
      },
      {
        value: "no",
        label: "Non, mes diplômes sont étrangers ou je n'en ai pas",
        skipToResult: "need-civic-exam-standard",
      },
    ],
  },
];

export const eligibilityResults: Record<EligibilityResultType, {
  title: string;
  description: string;
  warning?: string;
  requiresExam: boolean;
  nextSteps: string[];
  icon: "check" | "x" | "alert" | "info";
  badgeText?: string;
}> = {
  "not-concerned-absolute": {
    badgeText: "CERTITUDE ✅",
    title: "Vous n'êtes pas concerné(e)",
    description: "Votre situation actuelle ou la démarche que vous effectuez (titre temporaire, visa de court séjour, etc.) n'exige pas le passage du nouvel examen civique de 2026.",
    requiresExam: false,
    icon: "x",
    nextSteps: ["Poursuivez vos démarches habituelles sur l'ANEF ou en préfecture."],
  },
  "not-concerned-transition": {
    badgeText: "CERTITUDE ✅",
    title: "Exemption : Dossier déposé avant 2026",
    description: "La loi ne s'applique pas de manière rétroactive. Puisque votre demande a été déposée avant le 1er janvier 2026, vous n'êtes pas soumis(e) à la réussite de cet examen.",
    requiresExam: false,
    icon: "x",
    nextSteps: ["Patientez jusqu'à l'instruction complète de votre dossier par la préfecture."],
  },
  "exempted-eu": {
    badgeText: "CERTITUDE ✅",
    title: "Exemption totale (Droit Européen)",
    description: "En tant que citoyen(ne) de l'UE, de l'EEE ou de la Suisse, vous êtes totalement exclu(e) de ce dispositif d'intégration.",
    requiresExam: false,
    icon: "check",
    nextSteps: ["Vous n'avez aucune démarche civique à effectuer pour votre séjour."],
  },
  "exempted-minor": {
    badgeText: "CERTITUDE ✅",
    title: "Exemption : Demande pour Mineur",
    description: "L'obligation de réussite à l'examen civique s'applique uniquement aux demandeurs majeurs (plus de 18 ans).",
    requiresExam: false,
    icon: "check",
    nextSteps: ["Consultez les règles relatives au document de circulation pour mineur étranger (DCEM)."],
  },
  "exempted-renewal": {
    badgeText: "CERTITUDE ✅",
    title: "Exemption : Renouvellement de titre",
    description: "L'examen civique concerne uniquement les premières demandes (depuis 2026). Le simple renouvellement d'une carte pluriannuelle ou d'une carte de résident n'y est pas soumis.",
    requiresExam: false,
    icon: "check",
    nextSteps: ["Préparez votre dossier de renouvellement classique."],
  },
  "exempted-bilateral-probable": {
    badgeText: "EXEMPTION PROBABLE (Sous réserve) ⚠️",
    title: "Exemption liée à l'accord franco-algérien",
    description: "La loi vous dispense théoriquement de l'examen civique pour votre demande de certificat de résidence. Cependant, la loi de 2026 étant très récente, l'interprétation peut varier d'une préfecture à l'autre.",
    warning: "💡 Conseil : Les préfectures bloquent souvent des dossiers par manque de mise à jour sur les décrets. Dans le doute, ou si vous souhaitez bétonner votre dossier, obtenir cette certification est un atout majeur qui vous fera gagner des mois.",
    requiresExam: false,
    icon: "alert",
    nextSteps: [
      "Contactez votre préfecture pour obtenir une confirmation écrite de votre dispense",
      "Dans le doute, préparez et passez l'examen civique pour sécuriser votre dossier",
      "⚠️ Attention : Si vous demandez la naturalisation plus tard, cet examen deviendra 100% obligatoire."
    ],
  },
  "exempted-age-probable": {
    badgeText: "EXEMPTION PROBABLE (Sous réserve) ⚠️",
    title: "Dispense liée à l'âge (+65 ans)",
    description: "Vous avez plus de 65 ans. La loi prévoit une dispense pour les cartes de séjour. Néanmoins, l'administration est extrêmement pointilleuse sur la date exacte prise en compte pour le calcul de l'âge.",
    warning: "💡 Conseil : De nombreux dossiers sont rejetés pour quelques semaines de décalage dans le traitement. Pour éviter un rejet de la préfecture qui bloquera votre vie pendant des mois, nous vous conseillons de vous préparer au cas où l'agent vous le réclame.",
    requiresExam: false,
    icon: "info",
    nextSteps: [
      "Confirmez que votre préfecture applique bien la dispense d'âge à la date de votre dépôt",
      "Sécurisez votre dossier en passant l'examen par précaution"
    ],
  },
  "exempted-bpi-complex": {
    badgeText: "EXAMEN RECOMMANDÉ PAR SÉCURITÉ 🚨",
    title: "Attention à votre demande de naturalisation",
    description: "Votre statut protecteur (réfugié, apatride) vous dispense de l'examen civique pour obtenir une carte de séjour. MAIS si votre objectif final est la naturalisation française, les règles changent totalement.",
    warning: "💡 Votre situation est à la limite des textes. Les préfectures confondent souvent les règles entre carte de résident et naturalisation. Pour éviter tout blocage administratif et sécuriser votre avenir en France, le passage de l'examen est vivement conseillé.",
    requiresExam: true,
    icon: "alert",
    nextSteps: [
      "Anticipez votre demande de nationalité en réussissant l'examen dès maintenant",
      "Entraînez-vous avec les 40 questions officielles sur qcmcivique.fr"
    ],
  },
  "check-age-complex": {
    badgeText: "EXAMEN RECOMMANDÉ PAR SÉCURITÉ 🚨",
    title: "Vigilance : Naturalisation après 65 ans",
    description: "Avoir plus de 65 ans ne vous dispense pas automatiquement de l'examen civique pour la naturalisation. Des conditions d'ancienneté de résidence très strictes s'y ajoutent.",
    warning: "💡 Les rejets de dossiers de naturalisation prennent souvent 18 à 24 mois à être notifiés. Ne prenez pas le risque de perdre deux ans de votre vie pour un simple examen de 40 questions. Sécurisez votre dossier immédiatement.",
    requiresExam: true,
    icon: "alert",
    nextSteps: [
      "Passez l'examen civique pour garantir la recevabilité de votre demande",
      "Commencez votre entraînement sur les 5 thèmes obligatoires de la République"
    ],
  },
  "medical-exemption": {
    badgeText: "CAS COMPLEXE ℹ️",
    title: "Exemption ou aménagement médical",
    description: "Sur présentation du certificat médical réglementaire (modèle type fourni par le Ministère), vous pouvez être dispensé(e) ou bénéficier d'un aménagement (tiers-temps, assistance) pour passer l'épreuve.",
    warning: "💡 Un simple certificat de votre médecin traitant sera refusé. Il faut impérativement utiliser le formulaire Cerfa spécifique prévu par l'arrêté d'octobre 2025.",
    requiresExam: false,
    icon: "info",
    nextSteps: [
      "Téléchargez le modèle réglementaire de certificat médical",
      "Faites-le remplir scrupuleusement par votre médecin",
      "Contactez le centre d'examen pour connaître les modalités d'aménagement"
    ],
  },
  "need-civic-exam-diploma": {
    badgeText: "EXAMEN OBLIGATOIRE ❌",
    title: "Examen civique requis (Mais test de langue exempté !)",
    description: "Excellente nouvelle : votre diplôme français vous dispense du test de langue (qui coûte souvent plus de 150€). Cependant, la loi de 2026 exige que TOUS les candidats passent le nouvel Examen Civique, quel que soit leur niveau d'études en France.",
    warning: "💡 Ne tombez pas dans le piège ! De nombreux candidats voient leur dossier rejeté car ils pensent que leur Master ou leur Bac les dispense du QCM civique. C'est faux. L'État veut vérifier vos connaissances sur les valeurs de la République.",
    requiresExam: true,
    icon: "alert",
    nextSteps: [
      "Utilisez le temps et l'argent économisés sur le test de langue pour réussir l'examen civique",
      "Accédez à la plateforme Premium qcmcivique.fr pour vous préparer",
      "Obtenez votre score minimum de 32/40 du premier coup"
    ],
  },
  "need-civic-exam-standard": {
    badgeText: "EXAMEN OBLIGATOIRE ❌",
    title: "Vous devez passer l'Examen Civique",
    description: "D'après les textes d'application en vigueur, votre profil nécessite la réussite obligatoire à l'examen civique (score minimum de 32 bonnes réponses sur 40) pour que votre dossier soit accepté par la préfecture.",
    warning: "💡 Les créneaux d'examen en préfecture/CCI sont très demandés. Un échec vous obligera à repayer et à attendre plusieurs semaines pour le repasser. Mettez toutes les chances de votre côté.",
    requiresExam: true,
    icon: "alert",
    nextSteps: [
      "Débloquez l'accès Premium sur qcmcivique.fr dès aujourd'hui",
      "Entraînez-vous avec des simulations en conditions réelles",
      "Inscrivez-vous rapidement auprès d'un organisme agréé"
    ],
  },
};
