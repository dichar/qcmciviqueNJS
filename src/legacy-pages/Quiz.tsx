import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { getQuizQuestions, getQuestionsFromErrors, QuizQuestion } from "@/data/quiz-questions";
import QuizResults from "@/components/QuizResults";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePurchaseStatus, FREE_QUIZZES_LIMIT } from "@/hooks/usePurchaseStatus";
import { PaymentGate } from "@/components/PaymentGate";
import { SEO } from "@/components/SEO";
import { TextToSpeech } from "@/components/TextToSpeech";
import { VocabularyTooltip } from "@/components/VocabularyTooltip";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizNavigationMobile from "@/components/quiz/QuizNavigationMobile";
import { useConfetti } from "@/hooks/useConfetti";
import { useIsMobile } from "@/hooks/use-mobile";

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Type for shuffled option with original index
interface ShuffledOption {
  text: string;
  originalIndex: number;
}

const Quiz = () => {
  const { t } = useLanguage();
  const { hasFullAccess, canTakeQuiz, completedQuizCount, loading: purchaseLoading, userId } = usePurchaseStatus();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { fireConfetti, fireSmallConfetti } = useConfetti();

  // Generate a unique key to force remount when navigating to /quiz
  const [quizKey, setQuizKey] = useState(() => Date.now());
  const [errorOnlyMode, setErrorOnlyMode] = useState(false);
  const [errorQuestions, setErrorQuestions] = useState<string[]>([]);

  // Streak tracking for gamification
  const [streak, setStreak] = useState(0);
  const [lastStreakCelebration, setLastStreakCelebration] = useState(0);

  // Generate questions once when component mounts or key changes
  const quizQuestions = useMemo(() => {
    if (errorOnlyMode && errorQuestions.length > 0) {
      return getQuestionsFromErrors(errorQuestions);
    }
    return getQuizQuestions();
  }, [quizKey, errorOnlyMode, errorQuestions]);

  // Pre-shuffle options for all questions once when quiz starts
  const shuffledOptionsMap = useMemo(() => {
    const map: Record<number, ShuffledOption[]> = {};
    quizQuestions.forEach((q, qIndex) => {
      const optionsWithIndex: ShuffledOption[] = q.options.map((text, originalIndex) => ({
        text,
        originalIndex,
      }));
      map[qIndex] = shuffleArray(optionsWithIndex);
    });
    return map;
  }, [quizQuestions]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(45 * 60);
  const [startTime, setStartTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);
  const [showPaymentGate, setShowPaymentGate] = useState(false);
  const [showRealTimeCorrections, setShowRealTimeCorrections] = useState(false);
  const [showCurrentCorrection, setShowCurrentCorrection] = useState(false);
  const navigate = useNavigate();

  // Reset quiz
  const resetQuiz = useCallback(() => {
    setQuizKey(Date.now());
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(45 * 60);
    setStartTime(Date.now());
    setIsFinished(false);
    setErrorOnlyMode(false);
    setErrorQuestions([]);
    setStreak(0);
    setLastStreakCelebration(0);
  }, []);

  // Restart with only errors
  const restartWithErrors = useCallback((wrongQuestions: string[]) => {
    setErrorQuestions(wrongQuestions);
    setErrorOnlyMode(true);
    setQuizKey(Date.now());
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(Math.max(wrongQuestions.length * 60, 10 * 60));
    setStartTime(Date.now());
    setIsFinished(false);
    setStreak(0);
    setLastStreakCelebration(0);
  }, []);

  // Check purchase status
  useEffect(() => {
    if (!purchaseLoading) {
      if (!canTakeQuiz) {
        setShowPaymentGate(true);
      }
    }
  }, [purchaseLoading, canTakeQuiz]);

  // Timer
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  // Spacebar navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space" && !isFinished) {
        event.preventDefault();
        if (answers[currentQuestion] !== undefined) {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentQuestion, answers, isFinished]);

  // Confetti celebration for streaks
  useEffect(() => {
    if (streak >= 5 && streak !== lastStreakCelebration && streak % 5 === 0) {
      fireSmallConfetti();
      setLastStreakCelebration(streak);
    }
  }, [streak, lastStreakCelebration, fireSmallConfetti]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (answerIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: answerIndex });
    if (showRealTimeCorrections) {
      const question = quizQuestions[currentQuestion];
      const isCorrect = answerIndex === question.correctAnswer;
      setShowCurrentCorrection(true);
      setStreak((prev) => (isCorrect ? prev + 1 : 0));
    }
  };

  const handleNext = () => {
    const question = quizQuestions[currentQuestion];
    const isCorrect = answers[currentQuestion] === question.correctAnswer;

    // Move to next question (correction already shown on select)
    setShowCurrentCorrection(false);

    // Update streak if not in real-time mode
    if (!showRealTimeCorrections && answers[currentQuestion] !== undefined) {
      if (isCorrect) {
        setStreak((prev) => prev + 1);
      } else {
        setStreak(0);
      }
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrevious = () => {
    setShowCurrentCorrection(false);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  // Loading state
  if (purchaseLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  // Payment gate
  if (showPaymentGate) {
    return (
      <UnifiedLayout>
        <PaymentGate />
      </UnifiedLayout>
    );
  }

  // Results
  if (isFinished) {
    const score = calculateScore();
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    return (
      <QuizResults
        score={score}
        total={quizQuestions.length}
        answers={answers}
        questions={quizQuestions}
        timeTaken={timeTaken}
        completedQuizCount={completedQuizCount}
        hasFullAccess={hasFullAccess}
        onRestart={resetQuiz}
        onRestartWithErrors={restartWithErrors}
        isErrorMode={errorOnlyMode}
      />
    );
  }

  const question = quizQuestions[currentQuestion];
  const answeredCount = Object.keys(answers).length;

  return (
    <UnifiedLayout>
      <SEO
        title="QCM Civique – Essai Gratuit | Entraînement examen naturalisation"
        description="Testez-vous en conditions réelles : 40 questions, 45 minutes, correction instantanée. Préparez efficacement votre examen civique 2026."
        canonical="/qcm-citoyennete-francaise"
      />

      {/* Main content with bottom padding for mobile navigation */}
      <div className={`container mx-auto px-3 md:px-4 max-w-4xl py-4 md:py-8 ${isMobile ? "pb-32" : ""}`}>
        {/* Progress, Timer and Streak */}
        <div className="mb-4 md:mb-8 space-y-3 md:space-y-4">
          <div className="flex justify-between items-start gap-4">
            <QuizProgress
              current={currentQuestion}
              total={quizQuestions.length}
              answeredCount={answeredCount}
              streak={streak}
              showStreak={showRealTimeCorrections}
            />

            <div className="flex items-center gap-2 bg-accent/10 px-3 py-2 md:px-4 md:py-3 rounded-lg flex-shrink-0">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-accent" aria-hidden="true" />
              <div>
                <p className="text-[10px] md:text-xs text-muted-foreground">{t("quiz.timeRemaining")}</p>
                <p className="text-base md:text-lg font-bold text-accent" role="timer">
                  {formatTime(timeRemaining)}
                </p>
              </div>
            </div>
          </div>

          {/* Real-time corrections toggle */}
          <button
            onClick={() => setShowRealTimeCorrections(!showRealTimeCorrections)}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 border-2 ${
              showRealTimeCorrections
                ? "bg-primary text-primary-foreground border-primary shadow-lg"
                : "bg-background text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            {showRealTimeCorrections ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            Corrections en temps réel : {showRealTimeCorrections ? "Activé" : "Désactivé"}
          </button>
        </div>

        {/* Question Card */}
        <Card className="p-5 md:p-8 mb-4 md:mb-6 shadow-medium">
          <div className="mb-5 md:mb-6">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <p className="text-xs md:text-sm text-accent font-semibold">{question.category}</p>
              <TextToSpeech
                text={`${question.question}. Les options sont : ${question.options.join(". ")}`}
                variant="outline"
                size="sm"
                showLabel
                className="text-xs"
              />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              <VocabularyTooltip text={question.question} />
            </h2>
          </div>

          <RadioGroup
            key={currentQuestion}
            value={answers[currentQuestion] !== undefined ? answers[currentQuestion].toString() : ""}
            onValueChange={(value) => !showCurrentCorrection && handleAnswer(parseInt(value))}
            disabled={showCurrentCorrection}
          >
            <div className="space-y-2 md:space-y-3" role="radiogroup">
              {shuffledOptionsMap[currentQuestion]?.map((shuffledOption, displayIndex) => {
                const originalIndex = shuffledOption.originalIndex;
                const isSelected = answers[currentQuestion] === originalIndex;
                const isCorrect = originalIndex === question.correctAnswer;
                const showResult = showCurrentCorrection;

                let borderClass = "border-border hover:border-primary/50";
                let bgClass = "";

                if (showResult) {
                  if (isCorrect) {
                    borderClass = "border-green-500";
                    bgClass = "bg-green-50 dark:bg-green-950/30";
                  } else if (isSelected && !isCorrect) {
                    borderClass = "border-red-500";
                    bgClass = "bg-red-50 dark:bg-red-950/30";
                  }
                } else if (isSelected) {
                  borderClass = "border-primary";
                  bgClass = "bg-primary/5";
                }

                return (
                  <div
                    key={displayIndex}
                    className={`flex items-center space-x-3 p-4 md:p-5 rounded-xl border-2 transition-all min-h-[60px] md:min-h-[72px] ${
                      showCurrentCorrection ? "cursor-default" : "cursor-pointer active:scale-[0.98]"
                    } ${borderClass} ${bgClass}`}
                    onClick={() => !showCurrentCorrection && handleAnswer(originalIndex)}
                  >
                    <RadioGroupItem
                      value={originalIndex.toString()}
                      id={`option-${displayIndex}`}
                      className="flex-shrink-0 w-5 h-5 md:w-4 md:h-4"
                      disabled={showCurrentCorrection}
                    />
                    <Label
                      htmlFor={`option-${displayIndex}`}
                      className={`flex-1 ${showCurrentCorrection ? "cursor-default" : "cursor-pointer"} text-base md:text-lg leading-relaxed`}
                    >
                      <VocabularyTooltip text={shuffledOption.text} />
                    </Label>
                    {showResult && isCorrect && <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </RadioGroup>

          {/* Explanation */}
          {showCurrentCorrection && question.explanation && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border animate-fade-in">
              <p className="text-sm font-medium mb-1">Explication :</p>
              <p className="text-sm text-muted-foreground">{question.explanation}</p>
            </div>
          )}
        </Card>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex justify-between items-center gap-3 md:gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1 sm:flex-initial"
            >
              {t("quiz.previous")}
            </Button>

            {currentQuestion === quizQuestions.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined}
                className="flex-1 sm:flex-initial"
              >
                {t("quiz.submit")}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined}
                className="flex-1 sm:flex-initial"
              >
                {t("quiz.next")}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Mobile Navigation - Fixed at bottom */}
      {isMobile && (
        <QuizNavigationMobile
          currentQuestion={currentQuestion}
          totalQuestions={quizQuestions.length}
          hasAnswer={answers[currentQuestion] !== undefined}
          showingCorrection={showCurrentCorrection}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === quizQuestions.length - 1}
          submitLabel={t("quiz.submit")}
          nextLabel={t("quiz.next")}
          previousLabel={t("quiz.previous")}
        />
      )}
    </UnifiedLayout>
  );
};

export default Quiz;
