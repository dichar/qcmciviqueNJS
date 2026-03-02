import { Skeleton } from "@/components/ui/skeleton";

export function LegalPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Skeleton className="h-9 w-24 mb-6" />
      <article className="prose prose-slate max-w-none dark:prose-invert">
        <Skeleton className="h-10 w-3/4 mb-6" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="mb-8">
            <Skeleton className="h-7 w-1/3 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </article>
    </div>
  );
}
