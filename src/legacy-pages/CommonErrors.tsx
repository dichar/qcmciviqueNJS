import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { AlertTriangle, TrendingDown, Lightbulb, Users } from "lucide-react";
import { QuizQuestion } from "@/data/quiz-questions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuestionError {
  question: QuizQuestion;
  totalAttempts: number;
  incorrectAttempts: number;
  errorRate: number;
}

type ExamTypeFilter = 'all' | 'general' | 'csp' | 'cr' | 'naturalisation';

const EXAM_TYPE_LABELS: Record<ExamTypeFilter, string> = {
  all: 'Tous les QCM',
  general: 'QCM Général',
  csp: 'CSP (Fondamental)',
  cr: 'CR (Intermédiaire)',
  naturalisation: 'Naturalisation (Approfondi)',
};

const CommonErrors = () => {
  const { toast } = useToast();
  const [commonErrors, setCommonErrors] = useState<QuestionError[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [examTypeFilter, setExamTypeFilter] = useState<ExamTypeFilter>('all');

  useEffect(() => {
    analyzeCommonErrors();
  }, [examTypeFilter]);

  const analyzeCommonErrors = async () => {
    setIsLoading(true);
    try {
      // Call the secure aggregate function with exam_type filter
      const { data, error } = await supabase.rpc("get_common_errors", {
        min_attempts: 5,
        min_error_rate: 0.7,
        p_exam_type: examTypeFilter === 'all' ? null : examTypeFilter,
      });

      if (error) throw error;

      if (!data || data.length === 0) {
        setCommonErrors([]);
        setIsLoading(false);
        return;
      }

      // Map the function results to our component format
      const errors: QuestionError[] = data.map((row: any) => ({
        question: {
          question: row.question_text,
          category: row.category,
          options: row.options,
          correctAnswer: row.correct_answer,
          explanation: row.explanation,
        } as QuizQuestion,
        totalAttempts: Number(row.total_attempts),
        incorrectAttempts: Number(row.incorrect_attempts),
        errorRate: Math.round(Number(row.error_rate) * 100),
      }));

      setCommonErrors(errors);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger l'analyse des erreurs",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <Navigation />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <p>Analyse des erreurs en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <AlertTriangle className="w-10 h-10 text-destructive" />
            Analyse des Erreurs Fréquentes
          </h1>
          <p className="text-lg text-muted-foreground">
            Les questions où la plupart des candidats se trompent, avec explications détaillées
          </p>
        </div>

        {/* Filter by exam type */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">Filtrer par type de QCM</label>
          <Select value={examTypeFilter} onValueChange={(v) => setExamTypeFilter(v as ExamTypeFilter)}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(EXAM_TYPE_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {commonErrors.length === 0 ? (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              Données insuffisantes pour l'analyse. Revenez plus tard quand davantage d'utilisateurs auront complété des tests.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            <Card className="p-6 bg-destructive/5 border-destructive/20">
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-destructive mt-1" />
                <div>
                  <h2 className="text-xl font-bold mb-2">Pourquoi ces questions sont difficiles ?</h2>
                  <p className="text-sm text-muted-foreground">
                    Ces questions piègent plus de 70% des candidats. Comprendre pourquoi vous aidera à éviter ces erreurs lors de l'examen officiel.
                  </p>
                </div>
              </div>
            </Card>

            {commonErrors.map((error, index) => (
              <Card key={index} className="p-6 border-l-4 border-l-destructive">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-semibold rounded">
                          #{index + 1}
                        </span>
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                          {error.question.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg">{error.question.question}</h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-3xl font-bold text-destructive">
                        {error.errorRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        d'erreurs
                      </div>
                    </div>
                  </div>

                  {/* Error Rate Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        <Users className="w-4 h-4 inline mr-1" />
                        {error.totalAttempts} personnes ont répondu
                      </span>
                      <span className="text-destructive font-medium">
                        <TrendingDown className="w-4 h-4 inline mr-1" />
                        {error.incorrectAttempts} se sont trompées
                      </span>
                    </div>
                    <Progress value={error.errorRate} className="h-2" />
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    <p className="font-semibold text-sm">Options de réponse :</p>
                    {error.question.options.map((option, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-3 rounded border-2 ${
                          optIdx === error.question.correctAnswer
                            ? 'bg-green-500/10 border-green-500/50'
                            : 'bg-muted/50 border-muted'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-sm mt-0.5">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="flex-1">{option}</span>
                          {optIdx === error.question.correctAnswer && (
                            <span className="text-green-600 font-semibold text-sm">
                              ✓ Correct
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm mb-2">💡 Pourquoi cette question est piégeante :</p>
                        <p className="text-sm leading-relaxed">{error.question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonErrors;
