import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, ArrowRight, RotateCcw, CheckCircle, Mic } from "lucide-react";
import type { InterviewQuestion } from "@/types/livret";
import { TextToSpeech } from "@/components/TextToSpeech";

interface LivretEntretienProps {
  questions: InterviewQuestion[];
  onComplete: () => void;
}

const difficultyColors: Record<string, string> = {
  facile: "bg-success text-success-foreground",
  moyen: "bg-primary text-primary-foreground",
  difficile: "bg-accent text-accent-foreground",
};

const difficultyLabels: Record<string, string> = {
  facile: "Facile",
  moyen: "Moyen",
  difficile: "Difficile",
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const LivretEntretien: React.FC<LivretEntretienProps> = ({
  questions,
  onComplete,
}) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions).slice(0, 10));
  }, [questions]);

  const currentQuestion = shuffledQuestions[currentIndex];
  const progress = ((currentIndex + 1) / 10) * 100;

  const handleNext = () => {
    if (currentIndex < 9) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer("");
      setShowSuggestions(false);
    } else {
      // Only call onComplete when the full session of 10 questions is done
      onComplete();
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setShuffledQuestions(shuffleArray(questions).slice(0, 10));
    setCurrentIndex(0);
    setUserAnswer("");
    setShowSuggestions(false);
    setIsComplete(false);
  };

  if (shuffledQuestions.length === 0) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (isComplete) {
    return (
      <Card className="text-center">
        <CardContent className="py-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            🎉 Entretien simulé terminé !
          </h2>
          <p className="text-muted-foreground mb-6">
            Vous avez complété les 10 questions de simulation d'entretien.
            Continuez à vous entraîner pour être prêt le jour J !
          </p>
          <Button onClick={handleRestart} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Recommencer avec de nouvelles questions
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentIndex + 1} / 10</span>
          <span>{Math.round(progress)}% complété</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-primary" />
              <span className="font-medium">Question d'entretien</span>
            </div>
            <div className="flex items-center gap-2">
              <TextToSpeech 
                text={currentQuestion.question}
                variant="outline"
                size="sm"
                showLabel
              />
              <Badge className={difficultyColors[currentQuestion.niveauDifficulte]}>
                {difficultyLabels[currentQuestion.niveauDifficulte]}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-xl leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* User Answer */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Écrivez votre réponse ici :
            </label>
            <Textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Prenez le temps de formuler votre réponse comme si vous étiez en entretien..."
              className="min-h-[150px] resize-none"
            />
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  💡 Suggestions de réponse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  {currentQuestion.suggestions}
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="gap-2"
        >
          <Lightbulb className="w-4 h-4" />
          {showSuggestions ? "Masquer suggestions" : "Voir suggestions"}
        </Button>
        
        <Button onClick={handleNext} className="gap-2">
          {currentIndex < 9 ? (
            <>
              Suivant
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              Terminer
              <CheckCircle className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
