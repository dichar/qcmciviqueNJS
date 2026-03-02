import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, BookOpen, ArrowRight } from "lucide-react";
import type { Section, QuizQuestion } from "@/types/livret";
import { TextToSpeech } from "@/components/TextToSpeech";

interface LivretQuizProps {
  sections: Section[];
  currentPage: number;
  onAnswer: (isCorrect: boolean) => void;
  onQuizComplete?: () => void;
}

const themeColors: Record<string, string> = {
  valeurs: "bg-primary text-primary-foreground",
  institutions: "bg-accent text-accent-foreground",
  histoire: "bg-success text-success-foreground",
  ue: "bg-muted-foreground text-background",
};

export const LivretQuiz: React.FC<LivretQuizProps> = ({
  sections,
  currentPage,
  onAnswer,
  onQuizComplete,
}) => {
  const section = sections[currentPage];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const questions = section.quiz;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: number | boolean) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answer);
    setShowExplanation(true);

    let isCorrect = false;
    if (currentQuestion.type === "qcm" && currentQuestion.reponses) {
      isCorrect = currentQuestion.reponses[answer as number].correct;
    } else if (currentQuestion.type === "vrai-faux") {
      isCorrect = answer === currentQuestion.reponse;
    }

    // Only count if not already answered
    if (!answeredQuestions.has(currentQuestion.id)) {
      onAnswer(isCorrect);
      setAnsweredQuestions(prev => new Set(prev).add(currentQuestion.id));
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnsweredQuestions(new Set());
  };

  // Called when user finishes ALL questions of this section and clicks "Recommencer"
  const handleQuizSessionComplete = () => {
    // Notify parent that a full quiz session is complete
    if (onQuizComplete) {
      onQuizComplete();
    }
    resetQuiz();
  };

  // Reset when page changes (don't count as completion)
  useEffect(() => {
    resetQuiz();
  }, [currentPage]);

  const isCorrectAnswer = (index: number | boolean): boolean => {
    if (currentQuestion.type === "qcm" && currentQuestion.reponses) {
      return currentQuestion.reponses[index as number].correct;
    }
    return index === currentQuestion.reponse;
  };

  const getButtonVariant = (index: number | boolean): string => {
    if (!showExplanation) {
      return selectedAnswer === index ? "default" : "outline";
    }
    if (isCorrectAnswer(index)) {
      return "default"; // Will be styled green
    }
    if (selectedAnswer === index && !isCorrectAnswer(index)) {
      return "destructive";
    }
    return "outline";
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Badge className={themeColors[section.theme]}>
          Quiz : {section.titre}
        </Badge>
        <span className="text-muted-foreground">
          Question {currentQuestionIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-xl leading-relaxed flex-1">
              {currentQuestion.question}
            </CardTitle>
            <TextToSpeech 
              text={currentQuestion.type === "qcm" && currentQuestion.reponses 
                ? `${currentQuestion.question}. Les options sont : ${currentQuestion.reponses.map(r => r.texte).join('. ')}`
                : `${currentQuestion.question}. Répondez vrai ou faux.`
              }
              variant="outline"
              size="sm"
              showLabel
              className="flex-shrink-0"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* QCM Options */}
          {currentQuestion.type === "qcm" && currentQuestion.reponses && (
            <div className="space-y-3">
              {currentQuestion.reponses.map((option, index) => (
                <Button
                  key={index}
                  variant={getButtonVariant(index) as any}
                  className={`w-full justify-start text-left h-auto py-4 px-4 whitespace-normal ${
                    showExplanation && isCorrectAnswer(index)
                      ? "bg-success hover:bg-success text-success-foreground"
                      : ""
                  }`}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                >
                  <span className="flex items-center gap-3">
                    {showExplanation && isCorrectAnswer(index) && (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    {showExplanation && selectedAnswer === index && !isCorrectAnswer(index) && (
                      <XCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    {option.texte}
                  </span>
                </Button>
              ))}
            </div>
          )}

          {/* Vrai/Faux Options */}
          {currentQuestion.type === "vrai-faux" && (
            <div className="flex gap-4">
              <Button
                variant={getButtonVariant(true) as any}
                className={`flex-1 h-14 text-lg ${
                  showExplanation && isCorrectAnswer(true)
                    ? "bg-success hover:bg-success text-success-foreground"
                    : ""
                }`}
                onClick={() => handleAnswer(true)}
                disabled={showExplanation}
              >
                {showExplanation && isCorrectAnswer(true) && (
                  <CheckCircle className="w-5 h-5 mr-2" />
                )}
                {showExplanation && selectedAnswer === true && !isCorrectAnswer(true) && (
                  <XCircle className="w-5 h-5 mr-2" />
                )}
                Vrai
              </Button>
              <Button
                variant={getButtonVariant(false) as any}
                className={`flex-1 h-14 text-lg ${
                  showExplanation && isCorrectAnswer(false)
                    ? "bg-success hover:bg-success text-success-foreground"
                    : ""
                }`}
                onClick={() => handleAnswer(false)}
                disabled={showExplanation}
              >
                {showExplanation && isCorrectAnswer(false) && (
                  <CheckCircle className="w-5 h-5 mr-2" />
                )}
                {showExplanation && selectedAnswer === false && !isCorrectAnswer(false) && (
                  <XCircle className="w-5 h-5 mr-2" />
                )}
                Faux
              </Button>
            </div>
          )}

          {/* Explanation */}
          {showExplanation && (
            <Card className="bg-muted/50 border-muted">
              <CardContent className="py-4">
                <p className="text-foreground leading-relaxed">
                  <span className="font-semibold">Explication : </span>
                  {currentQuestion.explication}
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between gap-4">
        <Button variant="outline" className="gap-2" disabled>
          <BookOpen className="w-4 h-4" />
          Retour au Livret
        </Button>
        
        {showExplanation && currentQuestionIndex < questions.length - 1 && (
          <Button onClick={nextQuestion} className="gap-2">
            Prochaine Question
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
        
        {showExplanation && currentQuestionIndex === questions.length - 1 && (
          <Button onClick={handleQuizSessionComplete} variant="outline">
            Recommencer le Quiz
          </Button>
        )}
      </div>
    </div>
  );
};
