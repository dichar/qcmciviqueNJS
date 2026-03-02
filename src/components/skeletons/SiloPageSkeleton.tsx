import { Skeleton } from "@/components/ui/skeleton";

export function SiloPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Skeleton className="h-10 w-3/4 mb-4" />
      <Skeleton className="h-5 w-1/2 mb-8" />
      {Array.from({ length: 3 }).map((_, i) => (
        <section key={i} className="mb-10">
          <Skeleton className="h-7 w-1/3 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/5 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        </section>
      ))}
    </div>
  );
}
