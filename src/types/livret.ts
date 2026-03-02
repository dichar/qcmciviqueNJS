export interface QuizQuestion {
  id: string;
  type: "qcm" | "vrai-faux";
  question: string;
  reponses?: { texte: string; correct: boolean }[];
  reponse?: boolean;
  explication: string;
}

export interface Section {
  id: number;
  page: number;
  theme: string;
  titre: string;
  contenuOriginal: string;
  explication: string;
  simplification: string;
  exempleConcret: string;
  questionsEntretien: string[];
  quiz: QuizQuestion[];
}

export interface FAQItem {
  id: number;
  question: string;
  reponse: string;
  theme: string;
}

export interface InterviewQuestion {
  id: number;
  question: string;
  niveauDifficulte: string;
  theme: string;
  suggestions: string;
}

export interface LivretData {
  app_info: {
    title: string;
    description: string;
    version: string;
    total_sections: number;
    total_faq: number;
    total_interview_questions: number;
    color_primary: string;
  };
  sections: Section[];
  faq: FAQItem[];
  interviewQuestions: InterviewQuestion[];
}
