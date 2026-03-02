import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  gradient: 'blue' | 'green' | 'purple' | 'amber' | 'pink' | 'cyan';
  className?: string;
}

const gradientClasses = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-emerald-500 to-emerald-600',
  purple: 'from-purple-500 to-purple-600',
  amber: 'from-amber-500 to-amber-600',
  pink: 'from-pink-500 to-pink-600',
  cyan: 'from-cyan-500 to-cyan-600',
};

const shadowClasses = {
  blue: 'shadow-blue-500/20',
  green: 'shadow-emerald-500/20',
  purple: 'shadow-purple-500/20',
  amber: 'shadow-amber-500/20',
  pink: 'shadow-pink-500/20',
  cyan: 'shadow-cyan-500/20',
};

export const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  gradient,
  className 
}: StatCardProps) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-5 transition-all duration-300 hover:bg-slate-800/70 hover:border-slate-600/50",
      className
    )}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-10">
        <div className={cn(
          "w-full h-full rounded-full bg-gradient-to-br blur-2xl",
          gradientClasses[gradient]
        )} />
      </div>
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-slate-400 text-sm font-medium mb-1 truncate">{title}</p>
          <p className="text-white text-2xl sm:text-3xl font-bold truncate">{value}</p>
          {description && (
            <p className="text-slate-500 text-xs mt-1 truncate">{description}</p>
          )}
          {trend && (
            <div className={cn(
              "inline-flex items-center gap-1 mt-2 text-xs font-medium px-2 py-0.5 rounded-full",
              trend.value >= 0 
                ? "bg-emerald-500/10 text-emerald-400" 
                : "bg-red-500/10 text-red-400"
            )}>
              <span>{trend.value >= 0 ? '+' : ''}{trend.value}%</span>
              <span className="text-slate-500">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg flex-shrink-0",
          gradientClasses[gradient],
          shadowClasses[gradient]
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};
