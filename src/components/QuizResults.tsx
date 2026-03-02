import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, RotateCcw, Home, TrendingUp, Clock, RefreshCw } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User } from "@supabase/supabase-js";
import { z } from "zod";
import { PaymentGate } from "@/components/PaymentGate";
import { incrementCompletedQuizzes, shouldShowPaywallAfterQuiz } from "@/hooks/usePurchaseStatus";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

// Zod schemas for data validation
const questionSchema = z.object({
  question: z.string().min(1).max(1000),
  options: z.array(z.string().min(1).max(500)).min(2).max(10),
  correctAnswer: z.number().int().min(0),
  explanation: z.string().max(2000),
  category: z.string().min(1).max(200),
});

const quizResultSchema = z.object({
  answers: z.record(z.string(), z.number().int().min(0)),
  questions: z.array(questionSchema).min(1).max(100),
});

export type ExamType = "general" | "csp" | "cr" | "naturalisation";

interface QuizResultsProps {
  score: number;
  total: number;
  answers: Record<number, number>;
  questions: Question[];
  timeTaken: number; // in seconds
  completedQuizCount: number;
  hasFullAccess: boolean;
  onRestart?: () => void;
  onRestartWithErrors?: (wrongQuestions: string[]) => void;
  isErrorMode?: boolean;
  examType?: ExamType;
}

interface QuizResult {
  id: string;
  score: number;
  total_questions: number;
  time_taken: number;
  created_at: string;
}

const QuizResults = ({
  score,
  total,
  answers,
  questions,
  timeTaken,
  completedQuizCount,
  hasFullAccess,
  onRestart,
  onRestartWithErrors,
  isErrorMode = false,
  examType = "general",
}: QuizResultsProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [previousResults, setPreviousResults] = useState<QuizResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showPaymentGate, setShowPaymentGate] = useState(false);
  const hasSavedRef = useRef(false);
  const hasIncrementedRef = useRef(false);

  const percentage = (score / total) * 100;
  const passed = percentage >= 80;

  // Store quiz result in localStorage for unauthenticated users
  useEffect(() => {
    const quizResult = {
      score,
      total,
      answers,
      questions,
      timeTaken,
      timestamp: Date.now(),
    };
    localStorage.setItem("pendingQuizResult", JSON.stringify(quizResult));
  }, [score, total, answers, questions, timeTaken]);

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);

      if (session?.user && !hasSavedRef.current) {
        await saveResult(session.user.id);
        handleQuizCompletion();
        setShowResults(true);
      } else if (!session?.user) {
        setShowAuthDialog(true);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user && !hasSavedRef.current) {
        await saveResult(session.user.id);
        handleQuizCompletion();
        setShowAuthDialog(false);
        setShowResults(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle quiz completion: increment count and show paywall if needed
  const handleQuizCompletion = () => {
    if (hasIncrementedRef.current) return;
    hasIncrementedRef.current = true;

    const newCount = incrementCompletedQuizzes();

    // Show paywall after 2nd quiz completion (newCount will be 2)
    if (shouldShowPaywallAfterQuiz(newCount, hasFullAccess)) {
      setShowPaymentGate(true);
    }
  };

  const handlePaymentGateClose = () => {
    setShowPaymentGate(false);
    // User can continue viewing results, no forced redirect
  };

  const saveResult = async (userId: string) => {
    if (hasSavedRef.current || isSaving) return; // Prevent double saves

    hasSavedRef.current = true; // Set synchronously before any async operations
    setIsSaving(true);
    try {
      // Get result from localStorage if available (for fresh logins)
      const storedResult = localStorage.getItem("pendingQuizResult");
      let resultToSave = { score, total, answers, questions, timeTaken };

      if (storedResult) {
        const parsed = JSON.parse(storedResult);
        resultToSave = {
          score: parsed.score,
          total: parsed.total,
          answers: parsed.answers,
          questions: parsed.questions,
          timeTaken: parsed.timeTaken,
        };
      }

      // Validate quiz data before saving
      const answersForValidation = Object.fromEntries(
        Object.entries(resultToSave.answers).map(([key, value]) => [key.toString(), value]),
      );

      const validated = quizResultSchema.parse({
        answers: answersForValidation,
        questions: resultToSave.questions,
      });

      // Calculate category scores
      const categoryScores: Record<string, { correct: number; total: number }> = {};
      resultToSave.questions.forEach((q: any, index: number) => {
        const category = q.category || "Autres";
        if (!categoryScores[category]) {
          categoryScores[category] = { correct: 0, total: 0 };
        }
        categoryScores[category].total++;
        if (resultToSave.answers[index] === q.correctAnswer) {
          categoryScores[category].correct++;
        }
      });

      // Save current result
      const { error: insertError } = await supabase.from("quiz_results").insert({
        user_id: userId,
        score: resultToSave.score,
        total_questions: resultToSave.total,
        time_taken: resultToSave.timeTaken,
        answers: validated.answers,
        questions: validated.questions,
        category_scores: categoryScores,
        exam_type: examType,
      });

      if (insertError) throw insertError;

      // Clear localStorage after successful save
      localStorage.removeItem("pendingQuizResult");

      // Fetch previous results
      const { data, error: fetchError } = await supabase
        .from("quiz_results")
        .select("id, score, total_questions, time_taken, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setPreviousResults(data || []);

      toast({
        title: t("results.saved"),
        description: t("results.savedDesc"),
      });
    } catch (error: any) {
      console.error("Error saving result:", error);
      toast({
        title: t("common.error"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: window.location.origin,
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: t("common.error"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center">
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-8">
      {/* Payment Gate - Closable after 2nd quiz */}
      {showPaymentGate && <PaymentGate isClosable={true} onClose={handlePaymentGateClose} redirectOnClose="/" />}

      {/* Auth Required - Non-dismissible */}
      {!user && (
        <div className="container mx-auto px-4 max-w-md">
          <Card className="p-8 text-center shadow-strong">
            <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-16 h-16 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Connexion requise !</h1>
            <p className="text-muted-foreground mb-6">{t("results.authRequiredDesc")}</p>
            <Button onClick={handleGoogleSignIn} className="w-full" size="lg">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {t("auth.continueWithGoogle")}
            </Button>
            <p className="text-sm text-center text-muted-foreground mt-4">{t("results.whyAuth")}</p>
          </Card>
        </div>
      )}

      {/* Results Display */}
      {showResults && (
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Results Header */}
          <Card className="p-8 mb-8 text-center shadow-strong">
            <div className="mb-6">
              {passed ? (
                <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-16 h-16 text-success" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-16 h-16 text-destructive" />
                </div>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-4">{passed ? t("results.passed") : t("results.failed")}</h1>

            <div className="text-5xl font-bold mb-4">
              {score} / {total}
            </div>

            <p className="text-2xl text-muted-foreground mb-2">
              {percentage.toFixed(0)}% {t("results.successRate")}
            </p>

            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
              <Clock className="w-4 h-4" />
              <span>
                {t("results.timeTaken")}: {formatTime(timeTaken)}
              </span>
            </div>

            <div className="bg-secondary p-4 rounded-lg mb-6">
              {passed ? (
                <p className="text-lg">{t("results.passedDesc")}</p>
              ) : (
                <p className="text-lg">{t("results.failedDesc")}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              {/* Bouton "Refaire mes erreurs" - Correction Ciblée */}
              {onRestartWithErrors &&
                !isErrorMode &&
                (() => {
                  const wrongQuestions = questions
                    .filter((q, idx) => answers[idx] !== q.correctAnswer)
                    .map((q) => q.question);

                  if (wrongQuestions.length > 0) {
                    return (
                      <Button
                        size="lg"
                        variant="accent"
                        onClick={() => onRestartWithErrors(wrongQuestions)}
                        className="bg-accent text-accent-foreground hover:bg-accent-hover"
                      >
                        <RefreshCw className="mr-2 h-5 w-5" />
                        Refaire mes {wrongQuestions.length} erreurs
                      </Button>
                    );
                  }
                  return null;
                })()}

              {onRestart ? (
                <Button size="lg" variant="default" onClick={onRestart}>
                  <RotateCcw className="mr-2" />
                  {isErrorMode ? "Nouveau quiz complet" : t("results.restart")}
                </Button>
              ) : (
                <Link to="/quiz">
                  <Button size="lg" variant="default">
                    <RotateCcw className="mr-2" />
                    {t("results.restart")}
                  </Button>
                </Link>
              )}
              <Link to="/">
                <Button size="lg" variant="outline">
                  <Home className="mr-2" />
                  {t("results.backHome")}
                </Button>
              </Link>
            </div>

            {/* Info mode erreurs */}
            {isErrorMode && (
              <div className="mt-4 p-3 bg-accent/10 rounded-lg text-sm text-center">
                <span className="font-medium">Mode révision ciblée :</span> Vous révisez uniquement vos erreurs
                précédentes
              </div>
            )}

            {/* Share Section */}
            <div className="mt-6 pt-6 border-t flex justify-center">
              <ShareButtons
                title={`J'ai obtenu ${percentage}% au QCM Civique !`}
                description={
                  passed
                    ? "J'ai réussi mon test de préparation à l'examen civique. Toi aussi, prépare-toi sur qcmcivique.fr !"
                    : "Je m'entraîne pour l'examen civique sur qcmcivique.fr. Rejoins-moi !"
                }
                url="https://qcmcivique.fr"
              />
            </div>
          </Card>

          {/* Previous Results History */}
          {previousResults.length > 1 && (
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold">{t("results.history")}</h2>
                </div>
                <Link to="/results">
                  <Button variant="outline" size="sm">
                    Voir tout l'historique
                  </Button>
                </Link>
              </div>
              <p className="text-muted-foreground mb-4">{t("results.historyDesc")}</p>
              <div className="space-y-3">
                {previousResults.slice(0, 5).map((result, index) => {
                  const resultPercentage = (result.score / result.total_questions) * 100;
                  const resultPassed = resultPercentage >= 80;

                  return (
                    <div
                      key={result.id}
                      className={`p-4 rounded-lg border ${
                        index === 0 ? "bg-primary/5 border-primary" : "bg-secondary"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {resultPercentage.toFixed(0)}%
                            {index === 0 && <span className="ml-2 text-xs text-primary">({t("results.latest")})</span>}
                          </p>
                          <p className="text-sm text-muted-foreground">{formatDate(result.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{formatTime(result.time_taken)}</span>
                          {resultPassed ? (
                            <CheckCircle className="w-5 h-5 text-success ml-2" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive ml-2" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Detailed Results */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">{t("results.correction")}</h2>
            <div className="space-y-6">
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const hasAnswered = userAnswer !== undefined;

                return (
                  <Card
                    key={index}
                    className={`p-6 ${
                      !hasAnswered
                        ? "border-l-4 border-l-muted"
                        : isCorrect
                          ? "border-l-4 border-l-success"
                          : "border-l-4 border-l-destructive"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      {!hasAnswered ? (
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold">?</span>
                        </div>
                      ) : isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold">
                            {t("quiz.question")} {index + 1}
                          </span>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {question.category}
                          </span>
                        </div>
                        <p className="font-medium mb-4">{question.question}</p>

                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optIndex) => {
                            const isUserAnswer = userAnswer === optIndex;
                            const isCorrectAnswer = question.correctAnswer === optIndex;

                            return (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg ${
                                  isCorrectAnswer
                                    ? "bg-success/10 border border-success"
                                    : isUserAnswer
                                      ? "bg-destructive/10 border border-destructive"
                                      : "bg-secondary"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {isCorrectAnswer && <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                                  )}
                                  <span className={isCorrectAnswer ? "font-medium" : ""}>{option}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {question.explanation && (
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                            <p className="text-sm">
                              <span className="font-semibold">{t("results.explanation")}: </span>
                              {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResults;
