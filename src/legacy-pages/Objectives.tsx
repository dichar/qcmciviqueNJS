import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/AppLayout";
import {
  Target,
  Trophy,
  Flame,
  Star,
  Crown,
  Zap,
  CheckCircle,
  Lock,
  BookOpen,
  TrendingUp,
} from "lucide-react";

interface Objective {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  icon: React.ElementType;
  reward: string;
  category: string;
}

const Objectives = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quizCount, setQuizCount] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [objectives, setObjectives] = useState<Objective[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }
      
      setUser(session.user);

      const { data: results } = await supabase
        .from("quiz_results")
        .select("score, total_questions")
        .eq("user_id", session.user.id);

      if (results) {
        setQuizCount(results.length);
        const best = results.reduce((max, r) => {
          const pct = Math.round((r.score / r.total_questions) * 100);
          return pct > max ? pct : max;
        }, 0);
        setBestScore(best);
        
        const avg = results.length > 0 
          ? Math.round(results.reduce((acc, r) => acc + (r.score / r.total_questions * 100), 0) / results.length)
          : 0;
        setAverageScore(avg);
      }

      setIsLoading(false);
    };

    fetchUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const newObjectives: Objective[] = [
      {
        id: "first_quiz",
        title: "Premier pas",
        description: "Terminer votre premier QCM civique",
        target: 1,
        current: Math.min(quizCount, 1),
        icon: Zap,
        reward: "🎯 Badge Débutant",
        category: "Progression",
      },
      {
        id: "five_quizzes",
        title: "Régularité",
        description: "Compléter 5 QCM pour établir une routine",
        target: 5,
        current: Math.min(quizCount, 5),
        icon: Flame,
        reward: "🔥 Badge Assidu",
        category: "Progression",
      },
      {
        id: "ten_quizzes",
        title: "Maîtrise",
        description: "Compléter 10 QCM pour consolider vos acquis",
        target: 10,
        current: Math.min(quizCount, 10),
        icon: Crown,
        reward: "👑 Badge Maître",
        category: "Progression",
      },
      {
        id: "twenty_quizzes",
        title: "Expert",
        description: "Compléter 20 QCM pour devenir expert",
        target: 20,
        current: Math.min(quizCount, 20),
        icon: Trophy,
        reward: "🏆 Badge Champion",
        category: "Progression",
      },
      {
        id: "score_60",
        title: "Premiers succès",
        description: "Obtenir un score d'au moins 60%",
        target: 60,
        current: bestScore,
        icon: TrendingUp,
        reward: "📈 Badge Prometteur",
        category: "Performance",
      },
      {
        id: "score_80",
        title: "Excellence",
        description: "Obtenir un score d'au moins 80% (seuil de réussite)",
        target: 80,
        current: bestScore,
        icon: Star,
        reward: "⭐ Badge Expert",
        category: "Performance",
      },
      {
        id: "score_90",
        title: "Perfection",
        description: "Obtenir un score d'au moins 90%",
        target: 90,
        current: bestScore,
        icon: Crown,
        reward: "💎 Badge Perfectionniste",
        category: "Performance",
      },
      {
        id: "score_100",
        title: "Sans faute",
        description: "Obtenir un score parfait de 100%",
        target: 100,
        current: bestScore,
        icon: Star,
        reward: "🌟 Badge Légende",
        category: "Performance",
      },
    ];
    setObjectives(newObjectives);
  }, [quizCount, bestScore]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center">
          <p>Chargement...</p>
        </div>
      </AppLayout>
    );
  }

  const completedObjectives = objectives.filter(o => o.current >= o.target).length;
  const totalProgress = objectives.length > 0 
    ? Math.round((completedObjectives / objectives.length) * 100) 
    : 0;

  const progressionObjectives = objectives.filter(o => o.category === "Progression");
  const performanceObjectives = objectives.filter(o => o.category === "Performance");

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Mes Objectifs</h1>
            <p className="text-muted-foreground">
              Suivez votre progression et débloquez des badges
            </p>
          </div>

          {/* Global Progress */}
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">Progression globale</h2>
                <p className="text-sm text-muted-foreground">
                  {completedObjectives} objectifs complétés sur {objectives.length}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">{totalProgress}%</p>
              </div>
            </div>
            <Progress value={totalProgress} className="h-3" />
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4 text-center">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{quizCount}</p>
              <p className="text-sm text-muted-foreground">QCM complétés</p>
            </Card>
            <Card className="p-4 text-center">
              <Star className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{bestScore}%</p>
              <p className="text-sm text-muted-foreground">Meilleur score</p>
            </Card>
            <Card className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{averageScore}%</p>
              <p className="text-sm text-muted-foreground">Score moyen</p>
            </Card>
          </div>

          {/* Progression Objectives */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-primary" />
              Objectifs de progression
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {progressionObjectives.map((objective) => {
                const isComplete = objective.current >= objective.target;
                const progress = Math.min((objective.current / objective.target) * 100, 100);
                const Icon = objective.icon;

                return (
                  <Card
                    key={objective.id}
                    className={`p-4 transition-all ${
                      isComplete
                        ? "bg-success/10 border-success/30"
                        : "hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full flex-shrink-0 ${
                        isComplete ? "bg-success/20" : "bg-muted"
                      }`}>
                        {isComplete ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{objective.title}</h3>
                          {isComplete && (
                            <Badge variant="secondary" className="text-xs">
                              {objective.reward}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {objective.description}
                        </p>
                        {!isComplete && (
                          <>
                            <Progress value={progress} className="h-2 mb-1" />
                            <p className="text-xs text-muted-foreground">
                              {objective.current}/{objective.target}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Performance Objectives */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Objectifs de performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {performanceObjectives.map((objective) => {
                const isComplete = objective.current >= objective.target;
                const progress = Math.min((objective.current / objective.target) * 100, 100);
                const Icon = objective.icon;

                return (
                  <Card
                    key={objective.id}
                    className={`p-4 transition-all ${
                      isComplete
                        ? "bg-success/10 border-success/30"
                        : "hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full flex-shrink-0 ${
                        isComplete ? "bg-success/20" : "bg-muted"
                      }`}>
                        {isComplete ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{objective.title}</h3>
                          {isComplete && (
                            <Badge variant="secondary" className="text-xs">
                              {objective.reward}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {objective.description}
                        </p>
                        {!isComplete && (
                          <>
                            <Progress value={progress} className="h-2 mb-1" />
                            <p className="text-xs text-muted-foreground">
                              {objective.current}% / {objective.target}%
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <Card className="p-6 text-center bg-primary/5 border-primary/20">
            <h3 className="text-lg font-bold mb-2">Prêt à progresser ?</h3>
            <p className="text-muted-foreground mb-4">
              Faites un nouveau QCM pour atteindre vos objectifs
            </p>
            <Button size="lg" onClick={() => navigate("/quiz")}>
              <BookOpen className="w-5 h-5 mr-2" />
              Commencer un QCM
            </Button>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Objectives;
