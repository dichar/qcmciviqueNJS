import { Award, Trophy, Star, Medal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProgressBadgesProps {
  totalQuizzes: number;
  bestScore: number;
  averageScore: number;
}

export const ProgressBadges = ({ totalQuizzes, bestScore, averageScore }: ProgressBadgesProps) => {
  const badges: {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
  }[] = [];

  // Badge basé sur le nombre de quiz
  if (totalQuizzes >= 1) {
    badges.push({
      icon: Star,
      title: "Premier Pas",
      description: "Premier quiz complété",
      color: "bg-amber-500/10 text-amber-500 border-amber-500/20"
    });
  }
  if (totalQuizzes >= 5) {
    badges.push({
      icon: Award,
      title: "Apprenti",
      description: "5 quiz complétés",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    });
  }
  if (totalQuizzes >= 10) {
    badges.push({
      icon: Medal,
      title: "Assidu",
      description: "10 quiz complétés",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    });
  }

  // Badge basé sur le meilleur score
  if (bestScore >= 80) {
    badges.push({
      icon: Trophy,
      title: "Prêt pour l'examen",
      description: "Score ≥ 80%",
      color: "bg-green-500/10 text-green-500 border-green-500/20"
    });
  }
  if (bestScore >= 90) {
    badges.push({
      icon: Trophy,
      title: "Expert",
      description: "Score ≥ 90%",
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    });
  }
  if (bestScore === 100) {
    badges.push({
      icon: Trophy,
      title: "Parfait",
      description: "Score parfait (100%)",
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    });
  }

  // Badge basé sur la régularité
  if (averageScore >= 70 && totalQuizzes >= 3) {
    badges.push({
      icon: Star,
      title: "Régulier",
      description: "Moyenne ≥ 70%",
      color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
    });
  }

  if (badges.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-primary" />
        Vos Badges de Progression
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-4 rounded-lg border ${badge.color}`}
          >
            <badge.icon className="w-6 h-6 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm">{badge.title}</div>
              <div className="text-xs opacity-80">{badge.description}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
