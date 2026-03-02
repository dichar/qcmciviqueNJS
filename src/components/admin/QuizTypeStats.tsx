import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Globe, Flag, Award, BarChart3 } from 'lucide-react';

type ExamType = 'all' | 'general' | 'csp' | 'cr' | 'naturalisation';

interface QuizTypeStatsData {
  examType: string;
  totalQuizzes: number;
  avgScore: number;
  passRate: number;
}

const EXAM_TYPE_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  general: { label: 'QCM Général', icon: FileText, color: 'bg-purple-500' },
  csp: { label: 'CSP', icon: Globe, color: 'bg-blue-500' },
  cr: { label: 'Carte Résident', icon: Flag, color: 'bg-orange-500' },
  naturalisation: { label: 'Naturalisation', icon: Award, color: 'bg-red-500' },
};

export const QuizTypeStats = () => {
  const [stats, setStats] = useState<QuizTypeStatsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<ExamType>('all');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('exam_type, score, total_questions');

      if (error) throw error;

      // Group by exam_type and calculate stats
      const grouped: Record<string, { total: number; scores: number[]; totalQuestions: number[] }> = {};
      
      data?.forEach((result) => {
        const type = result.exam_type || 'general';
        if (!grouped[type]) {
          grouped[type] = { total: 0, scores: [], totalQuestions: [] };
        }
        grouped[type].total++;
        grouped[type].scores.push(result.score);
        grouped[type].totalQuestions.push(result.total_questions);
      });

      const statsData: QuizTypeStatsData[] = Object.entries(grouped).map(([examType, data]) => {
        const avgScore = data.scores.reduce((a, b) => a + b, 0) / data.scores.length;
        const avgTotal = data.totalQuestions.reduce((a, b) => a + b, 0) / data.totalQuestions.length;
        const passCount = data.scores.filter((s, i) => (s / data.totalQuestions[i]) >= 0.8).length;
        
        return {
          examType,
          totalQuizzes: data.total,
          avgScore: Math.round((avgScore / avgTotal) * 100),
          passRate: Math.round((passCount / data.total) * 100),
        };
      });

      setStats(statsData);
    } catch (error) {
      console.error('Error fetching quiz type stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStats = selectedType === 'all' 
    ? stats 
    : stats.filter(s => s.examType === selectedType);

  const totalQuizzes = stats.reduce((sum, s) => sum + s.totalQuizzes, 0);

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="h-32 flex items-center justify-center">
            <div className="animate-pulse text-slate-400">Chargement...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-lg">Statistiques par Type de QCM</CardTitle>
              <p className="text-slate-400 text-sm">{totalQuizzes} quiz complétés au total</p>
            </div>
          </div>
          
          <Select value={selectedType} onValueChange={(v) => setSelectedType(v as ExamType)}>
            <SelectTrigger className="w-48 bg-slate-900/50 border-slate-700 text-white">
              <SelectValue placeholder="Filtrer par type" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-white hover:bg-slate-700">Tous les types</SelectItem>
              <SelectItem value="general" className="text-white hover:bg-slate-700">QCM Général</SelectItem>
              <SelectItem value="csp" className="text-white hover:bg-slate-700">CSP</SelectItem>
              <SelectItem value="cr" className="text-white hover:bg-slate-700">Carte Résident</SelectItem>
              <SelectItem value="naturalisation" className="text-white hover:bg-slate-700">Naturalisation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredStats.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            Aucune donnée disponible pour ce type de QCM
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredStats.map((stat) => {
              const config = EXAM_TYPE_CONFIG[stat.examType] || EXAM_TYPE_CONFIG.general;
              const Icon = config.icon;
              
              return (
                <div 
                  key={stat.examType}
                  className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg ${config.color} flex items-center justify-center`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {config.label}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Quiz complétés</span>
                      <span className="text-white font-medium">{stat.totalQuizzes}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Score moyen</span>
                      <span className={`font-medium ${stat.avgScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {stat.avgScore}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Taux de réussite</span>
                      <span className={`font-medium ${stat.passRate >= 50 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stat.passRate}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
