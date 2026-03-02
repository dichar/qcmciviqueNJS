// Centralized quiz constants - update this single file when adding new questions
export const QUIZ_CONSTANTS = {
  TOTAL_QUESTIONS: 1500,
  QUESTIONS_PER_QUIZ: 40,
  QUIZ_DURATION_MINUTES: 45,
  PASSING_SCORE_PERCENT: 80,
  PASSING_SCORE: 32, // 80% of 40
  EXAM_YEAR: 2026,
} as const;

// Formatted strings for display
export const QUIZ_DISPLAY = {
  TOTAL_QUESTIONS_LABEL: "1500+",
  TOTAL_QUESTIONS_TEXT: "Plus de 1500 questions",
  QUESTIONS_PER_QUIZ_LABEL: "40",
} as const;
