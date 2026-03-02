// Dictionnaire de vocabulaire B2 pour l'examen civique
// Les mots complexes avec leurs définitions simples

export interface VocabularyWord {
  word: string;
  definition: string;
  example?: string;
}

export const vocabularyB2: Record<string, VocabularyWord> = {
  // Termes juridiques et institutionnels
  "promulguer": {
    word: "Promulguer",
    definition: "Publier officiellement une loi pour la rendre applicable.",
    example: "Le Président promulgue les lois votées par le Parlement."
  },
  "laïcité": {
    word: "Laïcité",
    definition: "Principe de séparation entre l'État et les religions. L'État ne favorise aucune religion.",
    example: "La laïcité garantit la liberté de croire ou de ne pas croire."
  },
  "suffrage": {
    word: "Suffrage",
    definition: "Vote, droit de voter lors d'élections.",
    example: "Le suffrage universel permet à tous les citoyens majeurs de voter."
  },
  "suffrage universel": {
    word: "Suffrage universel",
    definition: "Droit de vote accordé à tous les citoyens majeurs, sans distinction.",
  },
  "scrutin": {
    word: "Scrutin",
    definition: "Ensemble des opérations de vote lors d'une élection.",
    example: "Le scrutin présidentiel a lieu tous les 5 ans."
  },
  "mandat": {
    word: "Mandat",
    definition: "Durée pendant laquelle un élu exerce sa fonction.",
    example: "Le mandat présidentiel est de 5 ans en France."
  },
  "quinquennat": {
    word: "Quinquennat",
    definition: "Période de 5 ans du mandat présidentiel.",
  },
  "législature": {
    word: "Législature",
    definition: "Période de 5 ans pendant laquelle siège l'Assemblée nationale.",
  },
  "bicaméral": {
    word: "Bicaméral",
    definition: "Système à deux chambres parlementaires (Assemblée nationale + Sénat).",
  },
  "navette parlementaire": {
    word: "Navette parlementaire",
    definition: "Échange d'un texte de loi entre l'Assemblée nationale et le Sénat jusqu'à accord.",
  },
  "constitution": {
    word: "Constitution",
    definition: "Texte fondamental qui définit l'organisation de l'État et les droits des citoyens.",
    example: "La Constitution de 1958 fonde la Ve République."
  },
  "referendum": {
    word: "Référendum",
    definition: "Vote direct des citoyens sur une question importante.",
    example: "Le référendum de 2000 a instauré le quinquennat."
  },
  "plébiscite": {
    word: "Plébiscite",
    definition: "Vote où le peuple approuve ou rejette une décision, souvent en faveur d'un dirigeant.",
  },
  "ordonnance": {
    word: "Ordonnance",
    definition: "Texte pris par le gouvernement dans un domaine normalement réservé au Parlement.",
  },
  "décret": {
    word: "Décret",
    definition: "Décision officielle prise par le Président ou le Premier ministre.",
  },
  "amendement": {
    word: "Amendement",
    definition: "Modification proposée à un texte de loi en cours de discussion.",
  },
  "préambule": {
    word: "Préambule",
    definition: "Introduction d'un texte de loi exposant ses principes fondamentaux.",
  },
  "jurisprudence": {
    word: "Jurisprudence",
    definition: "Ensemble des décisions de justice qui servent de référence.",
  },
  "justiciable": {
    word: "Justiciable",
    definition: "Personne qui peut faire appel à la justice.",
  },
  
  // Droits et libertés
  "inaliénable": {
    word: "Inaliénable",
    definition: "Qui ne peut pas être retiré ou vendu. Les droits fondamentaux sont inaliénables.",
  },
  "imprescriptible": {
    word: "Imprescriptible",
    definition: "Qui ne peut pas disparaître avec le temps (crime contre l'humanité).",
  },
  "dignité": {
    word: "Dignité",
    definition: "Respect dû à chaque être humain du fait de son humanité.",
  },
  "égalité": {
    word: "Égalité",
    definition: "Principe selon lequel tous les citoyens ont les mêmes droits.",
  },
  "fraternité": {
    word: "Fraternité",
    definition: "Solidarité et entraide entre les citoyens.",
  },
  "liberté d'expression": {
    word: "Liberté d'expression",
    definition: "Droit de dire et d'écrire ce que l'on pense, dans les limites de la loi.",
  },
  "liberté de conscience": {
    word: "Liberté de conscience",
    definition: "Droit de penser et de croire librement.",
  },
  "présomption d'innocence": {
    word: "Présomption d'innocence",
    definition: "Toute personne est considérée innocente jusqu'à preuve du contraire.",
  },
  "habeas corpus": {
    word: "Habeas corpus",
    definition: "Protection contre les arrestations arbitraires.",
  },
  
  // Institutions
  "souveraineté": {
    word: "Souveraineté",
    definition: "Pouvoir suprême d'un État sur son territoire. En France, elle appartient au peuple.",
  },
  "exécutif": {
    word: "Exécutif",
    definition: "Pouvoir qui applique les lois (Président, gouvernement).",
  },
  "législatif": {
    word: "Législatif",
    definition: "Pouvoir qui vote les lois (Parlement).",
  },
  "judiciaire": {
    word: "Judiciaire",
    definition: "Pouvoir qui juge et applique la justice (tribunaux).",
  },
  "séparation des pouvoirs": {
    word: "Séparation des pouvoirs",
    definition: "Principe où exécutif, législatif et judiciaire sont indépendants.",
  },
  "garde des sceaux": {
    word: "Garde des Sceaux",
    definition: "Ministre de la Justice.",
  },
  "préfet": {
    word: "Préfet",
    definition: "Représentant de l'État dans un département.",
  },
  "maire": {
    word: "Maire",
    definition: "Élu à la tête d'une commune, représentant de l'État et chef de l'administration municipale.",
  },
  "conseil municipal": {
    word: "Conseil municipal",
    definition: "Assemblée élue qui gère les affaires de la commune.",
  },
  "conseil départemental": {
    word: "Conseil départemental",
    definition: "Assemblée élue qui gère les affaires du département.",
  },
  "conseil régional": {
    word: "Conseil régional",
    definition: "Assemblée élue qui gère les affaires de la région.",
  },
  "collectivités territoriales": {
    word: "Collectivités territoriales",
    definition: "Communes, départements et régions qui s'administrent librement.",
  },
  "décentralisation": {
    word: "Décentralisation",
    definition: "Transfert de compétences de l'État vers les collectivités locales.",
  },
  "déconcentration": {
    word: "Déconcentration",
    definition: "Délégation du pouvoir central vers des représentants locaux de l'État (préfets).",
  },
  
  // Citoyenneté
  "naturalisation": {
    word: "Naturalisation",
    definition: "Procédure pour devenir français par décision de l'État (pas par naissance).",
  },
  "intégration": {
    word: "Intégration",
    definition: "Processus par lequel une personne s'adapte à la société française.",
  },
  "assimilation": {
    word: "Assimilation",
    definition: "Condition pour la naturalisation : adoption des valeurs et mode de vie français.",
  },
  "civisme": {
    word: "Civisme",
    definition: "Comportement responsable d'un bon citoyen envers la société.",
  },
  "devoir civique": {
    word: "Devoir civique",
    definition: "Obligation morale du citoyen (voter, payer ses impôts, respecter les lois).",
  },
  "droit de vote": {
    word: "Droit de vote",
    definition: "Possibilité pour un citoyen de participer aux élections.",
  },
  "éligibilité": {
    word: "Éligibilité",
    definition: "Droit de se présenter comme candidat à une élection.",
  },
  
  // Histoire
  "révolution": {
    word: "Révolution",
    definition: "Changement radical et rapide de régime politique.",
  },
  "monarchie": {
    word: "Monarchie",
    definition: "Régime où le pouvoir est détenu par un roi ou une reine.",
  },
  "république": {
    word: "République",
    definition: "Régime politique où le pouvoir appartient au peuple via ses représentants élus.",
  },
  "empire": {
    word: "Empire",
    definition: "Régime dirigé par un empereur.",
  },
  "absolutisme": {
    word: "Absolutisme",
    definition: "Pouvoir royal total, sans limites ni contrôle.",
  },
  "siècle des lumières": {
    word: "Siècle des Lumières",
    definition: "18e siècle, période de grands progrès intellectuels et philosophiques.",
  },
  "droits de l'homme": {
    word: "Droits de l'Homme",
    definition: "Droits fondamentaux de tout être humain, déclarés en 1789.",
  },
  "résistance": {
    word: "Résistance",
    definition: "Opposition organisée contre l'occupation nazie (1940-1944).",
  },
  "collaboration": {
    word: "Collaboration",
    definition: "Coopération avec l'occupant allemand pendant la Seconde Guerre mondiale.",
  },
  "armistice": {
    word: "Armistice",
    definition: "Accord pour cesser les combats (11 novembre 1918).",
  },
  
  // Europe et international
  "union européenne": {
    word: "Union européenne",
    definition: "Organisation de 27 pays européens partageant certaines politiques communes.",
  },
  "schengen": {
    word: "Espace Schengen",
    definition: "Zone de libre circulation sans contrôle aux frontières intérieures.",
  },
  "traité": {
    word: "Traité",
    definition: "Accord officiel entre États.",
  },
  "souveraineté nationale": {
    word: "Souveraineté nationale",
    definition: "Pouvoir suprême appartenant à la nation française.",
  },
  
  // Social et économie
  "sécurité sociale": {
    word: "Sécurité sociale",
    definition: "Système de protection (maladie, retraite, famille, accidents du travail).",
  },
  "solidarité": {
    word: "Solidarité",
    definition: "Entraide entre les membres d'une société.",
  },
  "cotisations": {
    word: "Cotisations",
    definition: "Sommes prélevées sur les salaires pour financer la protection sociale.",
  },
  "impôt": {
    word: "Impôt",
    definition: "Somme versée à l'État pour financer les services publics.",
  },
  "service public": {
    word: "Service public",
    definition: "Activité d'intérêt général assurée par l'État ou les collectivités.",
  },
  
  // Symboles
  "marianne": {
    word: "Marianne",
    definition: "Figure féminine symbolisant la République française.",
  },
  "marseillaise": {
    word: "Marseillaise",
    definition: "Hymne national français, composé en 1792.",
  },
  "tricolore": {
    word: "Tricolore",
    definition: "Les trois couleurs du drapeau français : bleu, blanc, rouge.",
  },
  "devise": {
    word: "Devise",
    definition: "Formule résumant les valeurs : Liberté, Égalité, Fraternité.",
  },
  "coq gaulois": {
    word: "Coq gaulois",
    definition: "Symbole de la France, représentant la fierté nationale.",
  },
  "panthéon": {
    word: "Panthéon",
    definition: "Monument où reposent les grands personnages de l'histoire française.",
  },
};

// Fonction pour trouver les mots du vocabulaire dans un texte
export const findVocabularyWords = (text: string): string[] => {
  const lowerText = text.toLowerCase();
  const foundWords: string[] = [];
  
  Object.keys(vocabularyB2).forEach(key => {
    if (lowerText.includes(key.toLowerCase())) {
      foundWords.push(key);
    }
  });
  
  return foundWords;
};

// Fonction pour obtenir la définition d'un mot
export const getDefinition = (word: string): VocabularyWord | undefined => {
  const lowerWord = word.toLowerCase();
  return vocabularyB2[lowerWord];
};
