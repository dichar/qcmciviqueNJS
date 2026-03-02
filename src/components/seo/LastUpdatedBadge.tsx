import { Calendar } from "lucide-react";

interface LastUpdatedBadgeProps {
  date: string;
  className?: string;
}

export const LastUpdatedBadge = ({ date, className = "" }: LastUpdatedBadgeProps) => {
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      <Calendar className="w-4 h-4" />
      <span>Mis à jour le {formatDate(date)}</span>
    </div>
  );
};
