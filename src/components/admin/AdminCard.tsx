import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const AdminCard = ({ children, className, noPadding }: AdminCardProps) => {
  return (
    <Card className={cn(
      "bg-slate-800/50 border-slate-700/50 backdrop-blur-sm",
      className
    )}>
      {noPadding ? children : (
        <CardContent className="p-4 sm:p-6">
          {children}
        </CardContent>
      )}
    </Card>
  );
};

interface AdminCardHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const AdminCardHeader = ({ title, description, icon, action }: AdminCardHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          {description && (
            <p className="text-slate-400 text-sm">{description}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
};
