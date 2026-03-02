import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { eligibilityQuestions, EligibilityResultType } from "@/data/eligibility-questions";
import EligibilityResult from "@/components/EligibilityResult";
import { Navigation } from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { PaymentGate } from "@/components/PaymentGate";
import { usePurchaseStatus, hasFeatureAccess } from "@/hooks/usePurchaseStatus";
import { SEO } from "@/components/SEO";
import { Scale, ChevronLeft } from "lucide-react";

const FREE_ELIGIBILITY_QUIZ_ALLOWED = 2;
const ELIGIBILITY_QUIZ_COUNT_KEY = 'qcmcivique_eligibility_quiz_count';

const Eligibility = () => {
  const { t } = useLanguage();
  const { packType, hasFullAccess, loading } = usePurchaseStatus();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [resultType, setResultType] = useState<EligibilityResultType | null>(null);
  const [showPaymentGate, setShowPaymentGate] = useState(false);
  const [eligibilityQuizCount, setEligibilityQuizCount] = useState(0);

  const canAccessEligibilityQuiz = hasFullAccess && hasFeatureAccess(packType, 'eligibility_quiz');

  useEffect(() => {
    const count = parseInt(localStorage.getItem(ELIGIBILITY_QUIZ_COUNT_KEY) || '0', 10);
    setEligibilityQuizCount(count);
  }, []);

  const shouldBlockAccess = !canAccessEligibilityQuiz && eligibilityQuizCount >= FREE_ELIGIBILITY_QUIZ_ALLOWED;

  /**
   * Logique de saut conditionnelle :
   * - Algérien + CSP/CR → exempted-bilateral-probable
   * - Algérien + naturalisation → continuer (pas de skip)
   * - 65+ + CSP/CR → exempted-age-probable
   * - 65+ + naturalisation → check-age-complex
   */
  const resolveConditionalSkip = (questionId: string, value: string, allAnswers: Record<number, string>): EligibilityResultType | null => {
    const demarche = getDemarcheFromAnswers(allAnswers);

    if (questionId === "nationalite" && value === "algerian") {
      if (demarche !== "naturalization") {
        return "exempted-bilateral-probable";
      }
      return null; // Continue pour naturalisation
    }

    if (questionId === "age" && value === "65plus") {
      if (demarche === "naturalization") {
        return "check-age-complex";
      }
      return "exempted-age-probable";
    }

    return null;
  };

  const getDemarcheFromAnswers = (allAnswers: Record<number, string>): string | undefined => {
    // La question "demarche" est à l'index 1
    return allAnswers[1];
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    const question = eligibilityQuestions[currentQuestion];
    const option = question.options.find((opt) => opt.value === value);

    // 1. Vérifier le skipToResult direct
    if (option?.skipToResult) {
      finishQuiz(option.skipToResult as EligibilityResultType);
      return;
    }

    // 2. Vérifier la logique conditionnelle
    const conditionalResult = resolveConditionalSkip(question.id, value, newAnswers);
    if (conditionalResult) {
      finishQuiz(conditionalResult);
      return;
    }

    // 3. Passer à la question suivante
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < eligibilityQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      finishQuiz("need-civic-exam-standard");
    }
  };

  const finishQuiz = (result: EligibilityResultType) => {
    setResultType(result);
    if (!canAccessEligibilityQuiz) {
      const newCount = eligibilityQuizCount + 1;
      setEligibilityQuizCount(newCount);
      localStorage.setItem(ELIGIBILITY_QUIZ_COUNT_KEY, newCount.toString());
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const newAnswers = { ...answers };
      delete newAnswers[currentQuestion];
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResultType(null);
  };

  if (!loading && shouldBlockAccess) {
    return (
      <>
        <Navigation />
        <PaymentGate 
          onClose={() => {}}
          isClosable={true}
          redirectOnClose="/"
        />
      </>
    );
  }

  if (resultType) {
    return (
      <>
        <Navigation />
        <EligibilityResult resultType={resultType} onRestart={handleRestart} />
      </>
    );
  }

  const question = eligibilityQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / eligibilityQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <SEO 
        title="Dois-je passer l'examen civique 2026 ? | Test d'éligibilité"
        description="Vérifiez en 7 questions si vous devez passer l'examen civique obligatoire de 2026. Test basé sur la loi immigration du 26 janvier 2024 et ses décrets d'application."
        canonical="/eligibility"
      />
      <Navigation />
      
      <div className="container mx-auto px-3 md:px-4 max-w-3xl py-4 md:py-8">
        {/* Header */}
        <div className="mb-6 md:mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Scale className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Dois-je passer l'examen civique ?</h1>
          <p className="text-muted-foreground">Répondez à ces questions pour connaître votre situation</p>
        </div>

        {/* Progress */}
        <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} sur {eligibilityQuestions.length}
            </p>
            {question.source && (
              <p className="text-xs text-muted-foreground italic hidden sm:block">
                📜 {question.source}
              </p>
            )}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-5 md:p-8 mb-4 md:mb-6 shadow-medium">
          <div className="mb-5 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold">{question.question}</h2>
            {question.source && (
              <p className="text-xs text-muted-foreground italic mt-2 sm:hidden">
                📜 {question.source}
              </p>
            )}
          </div>

          <RadioGroup
            value={answers[currentQuestion]}
            onValueChange={handleAnswer}
          >
            <div className="space-y-2 md:space-y-3">
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-2 md:space-x-3 p-3 md:p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    answers[currentQuestion] === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleAnswer(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} className="flex-shrink-0" />
                  <Label
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer text-sm md:text-base"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Précédent
          </Button>
          <span className="text-sm text-muted-foreground">
            Sélectionnez une réponse pour continuer
          </span>
        </div>
      </div>
    </div>
  );
};

export default Eligibility;

