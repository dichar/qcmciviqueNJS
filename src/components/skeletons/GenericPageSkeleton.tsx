import { Skeleton } from "@/components/ui/skeleton";

export function GenericPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Skeleton className="h-10 w-2/3 mb-4" />
      <Skeleton className="h-5 w-1/2 mb-8" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="mb-6">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ))}
    </div>
  );
}
