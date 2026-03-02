import QuizEngine from "@/components/quiz/QuizEngine";
import questionsCSP from "@/data/questions-csp.json";
import { QuizQuestion } from "@/data/quiz-questions";

const EntrainementCSP = () => {
  const questions: QuizQuestion[] = questionsCSP.questions;
  
  return (
    <QuizEngine
      questionsData={questions}
      seoTitle="QCM Civique CSP - 193 Questions Officielles"
      seoDescription="Entraînez-vous au niveau Fondamental pour votre Carte de Séjour Pluriannuelle (CSP). Questions officielles sur la vie quotidienne."
      seoCanonical="/entrainement-csp"
      sourceLabel="Source officielle : Ministère de l'Intérieur"
      durationMinutes={45}
      questionsPerSession={40}
      examType="csp"
    />
  );
};

export default EntrainementCSP;
