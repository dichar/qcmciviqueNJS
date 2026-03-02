import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizNavigationMobileProps {
  currentQuestion: number;
  totalQuestions: number;
  hasAnswer: boolean;
  showingCorrection: boolean;
  onPrevious: () => void;
  onNext: () => void;
  isLastQuestion: boolean;
  submitLabel?: string;
  nextLabel?: string;
  previousLabel?: string;
}

/**
 * Mobile-optimized navigation for quiz
 * Positioned at bottom of screen for thumb-zone accessibility
 */
const QuizNavigationMobile = ({
  currentQuestion,
  totalQuestions,
  hasAnswer,
  showingCorrection,
  onPrevious,
  onNext,
  isLastQuestion,
  submitLabel = "Terminer",
  nextLabel = "Suivant",
  previousLabel = "Précédent",
}: QuizNavigationMobileProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-3 md:p-4 z-40 safe-area-inset-bottom">
      <div className="container max-w-4xl mx-auto flex items-center gap-3">
        {/* Previous button */}
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestion === 0}
          className="flex-1 h-12 md:h-11 text-sm md:text-base"
          aria-label={previousLabel}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span className="hidden sm:inline">{previousLabel}</span>
          <span className="sm:hidden">Préc.</span>
        </Button>

        {/* Question counter (center) */}
        <div className="flex-shrink-0 px-3 py-2 bg-secondary rounded-lg text-center min-w-[80px]">
          <span className="text-sm font-bold">
            {currentQuestion + 1}/{totalQuestions}
          </span>
        </div>

        {/* Next/Submit button */}
        {isLastQuestion ? (
          <Button
            onClick={onNext}
            disabled={!hasAnswer}
            className={cn(
              "flex-1 h-12 md:h-11 text-sm md:text-base transition-all",
              hasAnswer ? "bg-green-600 hover:bg-green-700 text-white" : "bg-muted text-muted-foreground",
            )}
            aria-label={submitLabel}
          >
            <Check className="w-5 h-5 mr-1" />
            {submitLabel}
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!hasAnswer}
            className={cn(
              "flex-1 h-12 md:h-11 text-sm md:text-base transition-all",
              hasAnswer ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted text-muted-foreground",
            )}
            aria-label={nextLabel}
          >
            <span className="hidden sm:inline">{nextLabel}</span>
            <span className="sm:hidden">Suiv.</span>
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        )}
      </div>

      {/* Hint when no answer selected */}
      <p className={cn("text-center text-xs text-muted-foreground mt-2", !hasAnswer ? "visible" : "invisible")}>
        Sélectionnez une réponse pour continuer
      </p>
    </div>
  );
};

export default QuizNavigationMobile;
