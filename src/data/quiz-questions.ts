import quizVersionsData from './quiz-versions.json';
import quizPoolData from './quiz-questions-pool.json';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

interface QuizVersion {
  version: number;
  questions: QuizQuestion[];
}

interface QuizVersionsData {
  versions: QuizVersion[];
}

interface QuizPoolData {
  questions: QuizQuestion[];
}

// Categories for balanced distribution
const CATEGORIES = [
  "Droits et devoirs",
  "Système institutionnel",
  "Vivre en France",
  "Histoire et culture",
  "Principes et valeurs"
];

// Combine all questions from all sources into a single pool
const getAllQuestions = (): QuizQuestion[] => {
  const versionsData = quizVersionsData as QuizVersionsData;
  const poolData = quizPoolData as QuizPoolData;
  
  // Get all questions from versions
  const versionQuestions = versionsData.versions.flatMap(v => v.questions);
  
  // Get questions from the new pool
  const poolQuestions = poolData.questions;
  
  // Combine and deduplicate by question text
  const allQuestions = [...versionQuestions, ...poolQuestions];
  const uniqueQuestions = allQuestions.filter((q, index, self) => 
    index === self.findIndex(t => t.question === q.question)
  );
  
  return uniqueQuestions;
};

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get questions with balanced category distribution, avoiding already seen questions
const getBalancedQuestions = (
  count: number = 40, 
  seenQuestions: Set<string> = new Set()
): QuizQuestion[] => {
  const allQuestions = getAllQuestions();
  
  // Filter out seen questions first
  const unseenQuestions = allQuestions.filter(q => !seenQuestions.has(q.question));
  
  // If we've seen most questions, reset and use all
  const questionsToUse = unseenQuestions.length >= count ? unseenQuestions : allQuestions;
  
  // Group questions by category
  const questionsByCategory: Record<string, QuizQuestion[]> = {};
  CATEGORIES.forEach(cat => {
    questionsByCategory[cat] = questionsToUse.filter(q => q.category === cat);
  });
  
  // Calculate questions per category (aim for equal distribution)
  const questionsPerCategory = Math.floor(count / CATEGORIES.length);
  const remainder = count % CATEGORIES.length;
  
  const selectedQuestions: QuizQuestion[] = [];
  
  // Select questions from each category
  CATEGORIES.forEach((category, index) => {
    const categoryQuestions = shuffleArray(questionsByCategory[category]);
    const toTake = questionsPerCategory + (index < remainder ? 1 : 0);
    selectedQuestions.push(...categoryQuestions.slice(0, toTake));
  });
  
  // If we don't have enough questions in some categories, fill with random questions
  if (selectedQuestions.length < count) {
    const remainingQuestions = shuffleArray(
      questionsToUse.filter(q => !selectedQuestions.includes(q))
    );
    selectedQuestions.push(...remainingQuestions.slice(0, count - selectedQuestions.length));
  }
  
  // Shuffle the final selection to mix categories
  return shuffleArray(selectedQuestions).slice(0, count);
};

// Export function to get fresh questions for each quiz session (avoiding seen questions)
export const getQuizQuestions = (seenQuestions: Set<string> = new Set()): QuizQuestion[] => {
  return getBalancedQuestions(40, seenQuestions);
};

// Get questions from wrong answers only (for review mode)
export const getQuestionsFromErrors = (
  wrongQuestionTexts: string[]
): QuizQuestion[] => {
  const allQuestions = getAllQuestions();
  const wrongQuestions = allQuestions.filter(q => 
    wrongQuestionTexts.includes(q.question)
  );
  return shuffleArray(wrongQuestions);
};

// Export all questions for SmartRevision and other features
export const getAllAvailableQuestions = (): QuizQuestion[] => {
  return getAllQuestions();
};

// Get total question count for display
export const getTotalQuestionCount = (): number => {
  return getAllQuestions().length;
};

// For backward compatibility, export a default set
export const quizQuestions: QuizQuestion[] = getBalancedQuestions(40);
