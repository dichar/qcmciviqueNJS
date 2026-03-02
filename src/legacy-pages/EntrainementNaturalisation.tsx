import QuizEngine from "@/components/quiz/QuizEngine";
import questionsNat from "@/data/questions-nat.json";
import { QuizQuestion } from "@/data/quiz-questions";

const EntrainementNaturalisation = () => {
  const questions: QuizQuestion[] = questionsNat;
  
  return (
    <QuizEngine
      questionsData={questions}
      seoTitle="QCM Naturalisation Française 2026 - 240 Questions"
      seoDescription="Le test le plus complet pour la Nationalité Française. 240 questions sur la culture, le patrimoine et les valeurs républicaines."
      seoCanonical="/entrainement-naturalisation"
      sourceLabel="Source officielle : Ministère de l'Intérieur"
      durationMinutes={45}
      questionsPerSession={40}
      examType="naturalisation"
    />
  );
};

export default EntrainementNaturalisation;
