import { Skeleton } from "@/components/ui/skeleton";

export function OAuthClientFormLoading() {
  return (
    <div className="flex flex-col gap-2 w-xl">

      <Skeleton className="h-25" />

      <Skeleton className="h-50" />

      <Skeleton className="h-35" />

      <Skeleton className="h-29" />


      <Skeleton className="h-7" />
      <Skeleton className="h-7" />
    </div>
  );
}