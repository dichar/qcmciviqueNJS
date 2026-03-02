import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { z } from "zod";

// SECURITY: Schema validation for notes to prevent storage abuse
const notesSchema = z.string().max(5000, 'Les notes doivent faire moins de 5000 caractères').trim();
import { AppLayout } from "@/components/AppLayout";
import { SEO } from "@/components/SEO";
import { ProgressBadges } from "@/components/ProgressBadges";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import { 
  TrendingUp, Clock, CheckCircle, XCircle, Save, 
  BarChart3, Target, Calendar, AlertCircle, ChevronDown, ChevronUp
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QuizResult {
  id: string;
  score: number;
  total_questions: number;
  time_taken: number;
  created_at: string;
  notes?: string | null;
  category_scores?: any;
  answers: any;
  questions: any;
  user_id: string;
}

const Results = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<QuizResult | null>(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [currentNotes, setCurrentNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      await fetchResults(session.user.id);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchResults(session.user.id);
      } else {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchResults = async (userId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("quiz_results")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les résultats",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveNotes = async () => {
    if (!selectedResult) return;

    // SECURITY: Validate notes before saving
    const validationResult = notesSchema.safeParse(currentNotes);
    if (!validationResult.success) {
      toast({
        title: "Erreur de validation",
        description: validationResult.error.errors[0]?.message || "Notes invalides",
        variant: "destructive",
      });
      return;
    }

    const validatedNotes = validationResult.data;

    try {
      const { error } = await supabase
        .from("quiz_results")
        .update({ notes: validatedNotes })
        .eq("id", selectedResult.id);

      if (error) throw error;

      setResults(results.map(r => 
        r.id === selectedResult.id ? { ...r, notes: validatedNotes } : r
      ));
      setEditingNotes(false);
      
      toast({
        title: "Enregistré",
        description: "Vos notes ont été sauvegardées",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les notes",
        variant: "destructive",
      });
    }
  };

  const calculateCategoryPerformance = (result: QuizResult) => {
    const categoryStats: Record<string, { correct: number; total: number }> = {};
    
    result.questions.forEach((q, index) => {
      const category = q.category || "Autres";
      if (!categoryStats[category]) {
        categoryStats[category] = { correct: 0, total: 0 };
      }
      categoryStats[category].total++;
      if (result.answers[index] === q.correctAnswer) {
        categoryStats[category].correct++;
      }
    });

    return Object.entries(categoryStats).map(([category, stats]) => ({
      category,
      score: Math.round((stats.correct / stats.total) * 100),
      correct: stats.correct,
      total: stats.total
    }));
  };

  const getChartData = () => {
    // Reverse to get chronological order (oldest first) and use index+1 as session number
    return results.slice().reverse().map((result, index) => ({
      session: `Session ${index + 1}`,
      score: Math.round((result.score / result.total_questions) * 100),
      date: new Date(result.created_at).toLocaleDateString('fr-FR'),
      id: result.id
    }));
  };

  const getWeakAreas = () => {
    if (results.length === 0) return [];
    
    const allCategories: Record<string, { correct: number; total: number }> = {};
    
    results.slice(0, 5).forEach(result => {
      const categoryPerf = calculateCategoryPerformance(result);
      categoryPerf.forEach(cat => {
        if (!allCategories[cat.category]) {
          allCategories[cat.category] = { correct: 0, total: 0 };
        }
        allCategories[cat.category].correct += cat.correct;
        allCategories[cat.category].total += cat.total;
      });
    });

    return Object.entries(allCategories)
      .map(([category, stats]) => ({
        category,
        percentage: Math.round((stats.correct / stats.total) * 100)
      }))
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 3);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
          <div className="container mx-auto px-4 py-8 flex items-center justify-center">
            <p>{t('common.loading')}</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const chartData = getChartData();
  const weakAreas = getWeakAreas();
  const avgScore = results.length > 0 
    ? Math.round(results.reduce((acc, r) => acc + (r.score / r.total_questions * 100), 0) / results.length)
    : 0;
  const bestScore = results.length > 0 
    ? Math.round(Math.max(...results.map(r => r.score / r.total_questions * 100)))
    : 0;

  return (
    <AppLayout>
      <SEO 
        title="Mes Résultats – QCM Civique"
        description="Consultez votre historique de résultats et suivez votre progression."
        canonical="/results"
        noIndex={true}
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Stats */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Mon Historique de Résultats</h1>
          
          {/* Score Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Tests effectués</p>
                  <p className="text-2xl font-bold">{results.length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Score moyen</p>
                  <p className={`text-2xl font-bold ${avgScore >= 80 ? 'text-success' : avgScore >= 60 ? 'text-amber-500' : 'text-destructive'}`}>
                    {avgScore}%
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Meilleur score</p>
                  <p className={`text-2xl font-bold ${bestScore >= 80 ? 'text-success' : 'text-amber-500'}`}>
                    {bestScore}%
                  </p>
                </div>
              </div>
            </Card>
            <Card className={`p-6 ${bestScore >= 80 ? 'bg-success/10 border-success/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
              <div className="flex items-center gap-3">
                {bestScore >= 80 ? (
                  <CheckCircle className="w-8 h-8 text-success" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-amber-500" />
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Seuil de réussite</p>
                  <p className="text-lg font-bold">
                    {bestScore >= 80 ? 'Atteint ✓' : `${80 - avgScore}% à gagner`}
                  </p>
                  <p className="text-xs text-muted-foreground">80% requis (32/40)</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Progress Badges */}
        <div className="mb-8">
          <ProgressBadges 
            totalQuizzes={results.length}
            bestScore={bestScore}
            averageScore={avgScore}
          />
        </div>

        {/* Progress Chart */}
        {chartData.length > 0 && (
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Courbe d'évolution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="session" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      const data = payload[0].payload;
                      return (
                        <Card className="p-3">
                          <p className="font-medium">{data.session}</p>
                          <p className="text-sm text-muted-foreground">{data.date}</p>
                          <p className="text-lg font-bold text-primary">{data.score}%</p>
                        </Card>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ 
                    fill: "hsl(var(--primary))", 
                    r: 6,
                    cursor: "pointer",
                    onClick: (data: any) => {
                      const result = results.find(r => r.id === data.payload.id);
                      if (result) {
                        setSelectedResult(result);
                        setCurrentNotes(result.notes || "");
                      }
                    }
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Cliquez sur un point pour voir les détails
            </p>
          </Card>
        )}

        {/* Weak Areas Analysis */}
        {weakAreas.length > 0 && (
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Points à améliorer
            </h2>
            <p className="text-muted-foreground mb-4">
              Basé sur vos {Math.min(5, results.length)} derniers tests
            </p>
            <div className="space-y-3">
              {weakAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{area.category}</span>
                      <span className="text-sm text-muted-foreground">{area.percentage}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${area.percentage}%` }}
                      />
                    </div>
                  </div>
                  {area.percentage < 50 && (
                    <span className="text-xs text-destructive font-medium">À travailler</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Results List */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Tous mes résultats
          </h2>
          <div className="space-y-3">
            {results.map((result, index) => {
              const percentage = Math.round((result.score / result.total_questions) * 100);
              const passed = percentage >= 80;
              
              return (
                <div
                  key={result.id}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedResult(result);
                    setCurrentNotes(result.notes || "");
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-lg">Session {results.length - index}</span>
                        {passed ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(result.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      {result.notes && (
                        <p className="text-sm text-muted-foreground mt-2 italic">
                          {result.notes.substring(0, 100)}{result.notes.length > 100 ? '...' : ''}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{percentage}%</p>
                      <p className="text-sm text-muted-foreground">
                        {result.score}/{result.total_questions}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(result.time_taken)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Result Detail Dialog */}
      <Dialog open={!!selectedResult} onOpenChange={(open) => !open && setSelectedResult(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedResult && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Détails de la session
                </DialogTitle>
                <DialogDescription>
                  {new Date(selectedResult.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Score Summary */}
                <Card className={`p-4 ${
                  Math.round((selectedResult.score / selectedResult.total_questions) * 100) >= 80 
                    ? 'bg-success/10 border-success/30' 
                    : 'bg-destructive/10 border-destructive/30'
                }`}>
                  <div className="flex justify-around text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className={`text-3xl font-bold ${
                        Math.round((selectedResult.score / selectedResult.total_questions) * 100) >= 80 
                          ? 'text-success' 
                          : 'text-destructive'
                      }`}>
                        {Math.round((selectedResult.score / selectedResult.total_questions) * 100)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((selectedResult.score / selectedResult.total_questions) * 100) >= 80 
                          ? '✓ Réussi' 
                          : `${80 - Math.round((selectedResult.score / selectedResult.total_questions) * 100)}% manquants`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bonnes réponses</p>
                      <p className="text-3xl font-bold">
                        {selectedResult.score}/{selectedResult.total_questions}
                      </p>
                      <p className="text-xs text-muted-foreground">Seuil: 32/40</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Temps</p>
                      <p className="text-3xl font-bold">
                        {formatTime(selectedResult.time_taken)}
                      </p>
                      <p className="text-xs text-muted-foreground">Max: 45min</p>
                    </div>
                  </div>
                </Card>

                {/* Category Performance */}
                <div>
                  <h3 className="font-bold text-lg mb-3">Performance par thème</h3>
                  <div className="space-y-2">
                    {calculateCategoryPerformance(selectedResult).map((cat, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="text-sm flex-1">{cat.category}</span>
                        <span className="text-sm text-muted-foreground">
                          {cat.correct}/{cat.total}
                        </span>
                        <div className="w-24 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${cat.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{cat.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">Mes notes et remarques</h3>
                    {!editingNotes && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingNotes(true)}
                      >
                        Modifier
                      </Button>
                    )}
                  </div>
                  {editingNotes ? (
                    <div className="space-y-3">
                      <Textarea
                        value={currentNotes}
                        onChange={(e) => setCurrentNotes(e.target.value)}
                        placeholder="Ajoutez vos remarques, points à revoir, etc."
                        rows={5}
                      />
                      <div className="flex gap-2">
                        <Button onClick={saveNotes} size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Enregistrer
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingNotes(false);
                            setCurrentNotes(selectedResult.notes || "");
                          }}
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Card className="p-4 bg-secondary">
                      {selectedResult.notes ? (
                        <p className="text-sm whitespace-pre-wrap">{selectedResult.notes}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          Aucune note pour cette session
                        </p>
                      )}
                    </Card>
                  )}
                </div>

                {/* Questions List with Corrections */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">Questions et corrections</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const allExpanded = selectedResult.questions.every(
                          (_: any, i: number) => expandedQuestions[`${selectedResult.id}-${i}`]
                        );
                        const newExpanded: Record<string, boolean> = {};
                        selectedResult.questions.forEach((_: any, i: number) => {
                          newExpanded[`${selectedResult.id}-${i}`] = !allExpanded;
                        });
                        setExpandedQuestions(newExpanded);
                      }}
                    >
                      {selectedResult.questions.every(
                        (_: any, i: number) => expandedQuestions[`${selectedResult.id}-${i}`]
                      ) ? 'Tout réduire' : 'Tout développer'}
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {selectedResult.questions.map((q: any, idx: number) => {
                      const userAnswer = selectedResult.answers[idx];
                      const isCorrect = userAnswer === q.correctAnswer;
                      const questionKey = `${selectedResult.id}-${idx}`;
                      const isExpanded = expandedQuestions[questionKey];

                      return (
                        <Card 
                          key={idx} 
                          className={`p-3 cursor-pointer transition-colors ${
                            isCorrect 
                              ? 'border-success/30 bg-success/5' 
                              : 'border-destructive/30 bg-destructive/5'
                          }`}
                          onClick={() => setExpandedQuestions(prev => ({
                            ...prev,
                            [questionKey]: !prev[questionKey]
                          }))}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-success" />
                              ) : (
                                <XCircle className="w-5 h-5 text-destructive" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground">
                                  Question {idx + 1} • {q.category}
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                )}
                              </div>
                              <p className="text-sm font-medium mt-1 line-clamp-2">
                                {q.question}
                              </p>
                              
                              {isExpanded && (
                                <div className="mt-3 space-y-2 text-sm">
                                  <div className="space-y-1">
                                    {q.options.map((opt: string, optIdx: number) => (
                                      <div 
                                        key={optIdx}
                                        className={`p-2 rounded text-sm ${
                                          optIdx === q.correctAnswer
                                            ? 'bg-success/20 text-success font-medium'
                                            : optIdx === userAnswer && !isCorrect
                                            ? 'bg-destructive/20 text-destructive line-through'
                                            : 'bg-muted/50'
                                        }`}
                                      >
                                        {opt}
                                        {optIdx === q.correctAnswer && ' ✓'}
                                        {optIdx === userAnswer && !isCorrect && ' (votre réponse)'}
                                      </div>
                                    ))}
                                  </div>
                                  {q.explanation && (
                                    <div className="p-3 bg-primary/10 rounded-lg mt-2">
                                      <p className="text-xs font-medium text-primary mb-1">Explication :</p>
                                      <p className="text-sm text-muted-foreground">{q.explanation}</p>
                                    </div>
                                  )}
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
            </>
          )}
        </DialogContent>
      </Dialog>
      </div>
    </AppLayout>
  );
};

export default Results;