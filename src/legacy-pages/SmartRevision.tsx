import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { Brain, Target, TrendingUp, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getAllAvailableQuestions, QuizQuestion } from "@/data/quiz-questions";

interface CategoryWeakness {
  category: string;
  percentage: number;
  totalQuestions: number;
}

const SmartRevision = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [weakCategories, setWeakCategories] = useState<CategoryWeakness[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuthAndAnalyze();
  }, []);

  const checkAuthAndAnalyze = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);
    await analyzeWeaknesses(session.user.id);
  };

  const analyzeWeaknesses = async (userId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("quiz_results")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      if (!data || data.length === 0) {
        setWeakCategories([]);
        setIsLoading(false);
        return;
      }

      // Analyze category performance across recent attempts
      const categoryStats: Record<string, { correct: number; total: number }> = {};

      data.forEach(result => {
        const questions = result.questions as unknown as QuizQuestion[];
        const answers = result.answers as unknown as number[];

        questions.forEach((q, idx) => {
          if (!categoryStats[q.category]) {
            categoryStats[q.category] = { correct: 0, total: 0 };
          }
          categoryStats[q.category].total++;
          if (answers[idx] === q.correctAnswer) {
            categoryStats[q.category].correct++;
          }
        });
      });

      // Calculate percentages and sort by weakness
      const weaknesses = Object.entries(categoryStats)
        .map(([category, stats]) => ({
          category,
          percentage: Math.round((stats.correct / stats.total) * 100),
          totalQuestions: stats.total
        }))
        .sort((a, b) => a.percentage - b.percentage);

      setWeakCategories(weaknesses);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible d'analyser vos résultats",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startTargetedRevision = (category: string) => {
    // Get all questions from this category using the full pool
    const allQuestions = getAllAvailableQuestions();
    const categoryQuestions = allQuestions.filter(q => q.category === category);

    // Store in sessionStorage for the quiz page to use
    sessionStorage.setItem('revisionMode', 'true');
    sessionStorage.setItem('revisionCategory', category);
    sessionStorage.setItem('revisionQuestions', JSON.stringify(categoryQuestions));

    navigate('/qcm-citoyennete-francaise');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <Navigation />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <p>Analyse en cours...</p>
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
            <Brain className="w-10 h-10 text-primary" />
            Mode Révision Intelligent
          </h1>
          <p className="text-lg text-muted-foreground">
            Révisez efficacement en ciblant vos points faibles
          </p>
        </div>

        {weakCategories.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Complétez au moins un quiz pour accéder à l'analyse personnalisée et aux recommandations de révision.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Vos Thèmes à Renforcer
              </h2>
              <p className="text-muted-foreground mb-6">
                Basé sur l'analyse de vos 10 derniers tests, voici les thèmes où vous pouvez vous améliorer :
              </p>
              
              <div className="space-y-4">
                {weakCategories.map((weakness, index) => (
                  <Card key={index} className="p-4 border-l-4" style={{
                    borderLeftColor: weakness.percentage < 60 ? 'rgb(239 68 68)' : 
                                    weakness.percentage < 75 ? 'rgb(251 146 60)' : 
                                    'rgb(34 197 94)'
                  }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{weakness.category}</h3>
                        <p className="text-sm text-muted-foreground">
                          {weakness.totalQuestions} questions analysées
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{
                          color: weakness.percentage < 60 ? 'rgb(239 68 68)' : 
                                weakness.percentage < 75 ? 'rgb(251 146 60)' : 
                                'rgb(34 197 94)'
                        }}>
                          {weakness.percentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">de réussite</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${weakness.percentage}%`,
                            backgroundColor: weakness.percentage < 60 ? 'rgb(239 68 68)' : 
                                          weakness.percentage < 75 ? 'rgb(251 146 60)' : 
                                          'rgb(34 197 94)'
                          }}
                        />
                      </div>

                      <Button 
                        onClick={() => startTargetedRevision(weakness.category)}
                        className="w-full"
                        variant={weakness.percentage < 60 ? "default" : "outline"}
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Réviser ce thème
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Revision Tips */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="text-xl font-bold mb-4">💡 Conseils de Révision</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Concentrez-vous d'abord sur les thèmes avec un score inférieur à 60%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Révisez régulièrement les mêmes thèmes pour ancrer vos connaissances</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Prenez le temps de lire les explications détaillées après chaque question</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Visez un score minimum de 80% sur chaque thème avant l'examen officiel</span>
                </li>
              </ul>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartRevision;
