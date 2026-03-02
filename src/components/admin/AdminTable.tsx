import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface AdminTableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

export const AdminTable = ({ headers, children, className }: AdminTableProps) => {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700/50 hover:bg-transparent">
            {headers.map((header, i) => (
              <TableHead 
                key={i} 
                className="text-slate-400 font-medium text-xs uppercase tracking-wider"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </div>
  );
};

interface AdminTableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const AdminTableRow = ({ children, className, onClick }: AdminTableRowProps) => {
  return (
    <TableRow 
      className={cn(
        "border-slate-700/50 hover:bg-slate-800/50 transition-colors",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </TableRow>
  );
};

interface AdminTableCellProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}

export const AdminTableCell = ({ children, className, colSpan }: AdminTableCellProps) => {
  return (
    <TableCell className={cn("text-slate-300 py-4", className)} colSpan={colSpan}>
      {children}
    </TableCell>
  );
};

export const AdminTableEmpty = ({ message = "Aucune donnée", colSpan = 1 }: { message?: string; colSpan?: number }) => {
  return (
    <TableRow>
      <TableCell 
        colSpan={colSpan} 
        className="text-center text-slate-500 py-12"
      >
        {message}
      </TableCell>
    </TableRow>
  );
};
