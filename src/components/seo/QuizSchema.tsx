interface QuizSchemaProps {
  name: string;
  description: string;
  questionCount?: number;
  educationalLevel?: string;
  url: string;
}

export const QuizSchema = ({
  name,
  description,
  questionCount = 40,
  educationalLevel = "Naturalisation française",
  url,
}: QuizSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: name,
    description: description,
    educationalLevel: educationalLevel,
    numberOfQuestions: questionCount,
    provider: {
      "@type": "Organization",
      name: "QCM Civique",
      url: "https://qcmcivique.fr",
    },
    about: {
      "@type": "Thing",
      name: "Examen Civique Français",
      description: "Préparation à l'examen civique obligatoire pour la naturalisation française",
    },
    learningResourceType: "Quiz",
    inLanguage: "fr",
    isAccessibleForFree: false,
    url: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
