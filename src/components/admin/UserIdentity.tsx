import { cn } from '@/lib/utils';

interface UserIdentityProps {
  name?: string | null;
  email?: string | null;
  className?: string;
  size?: 'sm' | 'md';
}

/**
 * Displays user identity with name (priority) and email below
 * If no name, shows email alone
 * Never shows "N/A" or "Inconnu"
 */
export function UserIdentity({ name, email, className, size = 'md' }: UserIdentityProps) {
  const displayName = name?.trim() || null;
  const displayEmail = email?.trim() || null;
  
  // If neither name nor email, show nothing meaningful
  if (!displayName && !displayEmail) {
    return (
      <div className={cn("min-w-0", className)}>
        <p className={cn(
          "text-muted-foreground truncate",
          size === 'sm' ? "text-sm" : ""
        )}>
          —
        </p>
      </div>
    );
  }

  // If only email, show it as the main identifier
  if (!displayName && displayEmail) {
    return (
      <div className={cn("min-w-0", className)}>
        <p className={cn(
          "text-white font-medium truncate",
          size === 'sm' ? "text-sm" : ""
        )}>
          {displayEmail}
        </p>
      </div>
    );
  }

  // Name exists, show name + email below
  return (
    <div className={cn("min-w-0", className)}>
      <p className={cn(
        "text-white font-medium truncate",
        size === 'sm' ? "text-sm" : ""
      )}>
        {displayName}
      </p>
      {displayEmail && (
        <p className={cn(
          "text-muted-foreground truncate",
          size === 'sm' ? "text-xs" : "text-sm"
        )}>
          {displayEmail}
        </p>
      )}
    </div>
  );
}
