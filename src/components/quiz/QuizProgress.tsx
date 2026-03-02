import { Progress } from "@/components/ui/progress";
import { CheckCircle, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizProgressProps {
  current: number;
  total: number;
  answeredCount: number;
  streak: number;
  showStreak?: boolean;
}

const QuizProgress = ({ 
  current, 
  total, 
  answeredCount, 
  streak,
  showStreak = true 
}: QuizProgressProps) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="space-y-3">
      {/* Progress info */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-muted-foreground">Progression</p>
          <p className="text-xl md:text-2xl font-bold">
            {current + 1} / {total}
          </p>
          <p className="text-xs text-muted-foreground">
            {answeredCount} répondue{answeredCount > 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Streak indicator */}
        {showStreak && streak >= 2 && (
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300",
            streak >= 5 ? "bg-orange-500/20 text-orange-600 dark:text-orange-400 animate-pulse" :
            streak >= 3 ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" :
            "bg-green-500/20 text-green-600 dark:text-green-400"
          )}>
            <Flame className={cn(
              "w-5 h-5",
              streak >= 5 && "animate-bounce"
            )} />
            <span className="font-bold text-lg">{streak}</span>
            <span className="text-xs hidden sm:inline">
              {streak >= 5 ? "En feu !" : streak >= 3 ? "Bien joué !" : "Série"}
            </span>
          </div>
        )}
      </div>
      
      {/* Progress bar with animation */}
      <div className="relative">
        <Progress 
          value={progress} 
          className="h-3 transition-all duration-500" 
        />
        {/* Milestone markers */}
        <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
          {[25, 50, 75].map((milestone) => (
            <div
              key={milestone}
              className={cn(
                "w-2 h-2 rounded-full transition-colors duration-300",
                progress >= milestone ? "bg-primary-foreground" : "bg-muted-foreground/30"
              )}
              style={{ marginLeft: `${milestone - 1}%` }}
            />
          ))}
        </div>
      </div>
      
      {/* Milestone badges */}
      {progress >= 100 && (
        <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Quiz terminé !</span>
        </div>
      )}
    </div>
  );
};

export default QuizProgress;
