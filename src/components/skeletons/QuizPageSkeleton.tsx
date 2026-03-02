import { Skeleton } from "@/components/ui/skeleton";

export function QuizPageSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Skeleton className="h-10 w-2/3 mx-auto mb-4" />
      <Skeleton className="h-5 w-1/2 mx-auto mb-8" />
      <div className="bg-card rounded-xl border p-6 mb-6">
        <Skeleton className="h-3 w-full rounded-full mb-6" />
        <Skeleton className="h-6 w-3/4 mb-6" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg mb-3" />
        ))}
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
}
