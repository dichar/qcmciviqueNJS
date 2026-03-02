import QuizEngine from "@/components/quiz/QuizEngine";
import questionsCR from "@/data/questions-cr.json";
import { QuizQuestion } from "@/data/quiz-questions";

const EntrainementCR = () => {
  const questions: QuizQuestion[] = questionsCR.questions;
  
  return (
    <QuizEngine
      questionsData={questions}
      seoTitle="Examen Civique Carte de Résident (CR) - Test 2026"
      seoDescription="Préparez votre Carte de Résident avec 209 questions sur l'histoire, les institutions et la politique française. Niveau Intermédiaire."
      seoCanonical="/entrainement-cr"
      sourceLabel="Source officielle : Ministère de l'Intérieur"
      durationMinutes={45}
      questionsPerSession={40}
      examType="cr"
    />
  );
};

export default EntrainementCR;
