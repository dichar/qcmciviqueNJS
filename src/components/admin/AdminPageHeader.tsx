import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  onRefresh?: () => void;
  onExport?: () => void;
  onAdd?: () => void;
  addLabel?: string;
  children?: ReactNode;
  loading?: boolean;
}

export const AdminPageHeader = ({
  title,
  description,
  onRefresh,
  onExport,
  onAdd,
  addLabel = 'Ajouter',
  children,
  loading
}: AdminPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
        {description && (
          <p className="text-slate-400 text-sm sm:text-base mt-1">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {onRefresh && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRefresh}
            disabled={loading}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
            Actualiser
          </Button>
        )}
        {onExport && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onExport}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        )}
        {onAdd && (
          <Button 
            size="sm"
            onClick={onAdd}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            {addLabel}
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};
