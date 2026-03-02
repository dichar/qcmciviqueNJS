import { Skeleton } from "@/components/ui/skeleton";

export function BlogPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Skeleton className="h-9 w-24 mb-6" />
      <Skeleton className="h-6 w-32 mb-4" />
      <Skeleton className="h-12 w-full mb-4" />
      <div className="flex gap-4 mb-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-64 w-full rounded-xl mb-8" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="mb-4">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}
