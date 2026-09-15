import { Skeleton } from "@/components/ui/skeleton";

export function OAuthClientFormLoading() {
  return (
    <div className='flex flex-col justify-between h-full'>
      <div className="grid grid-cols-1 lg:grid-cols-3">

        <div className="flex flex-col gap-2 m-1">
          <Skeleton className="h-30" />
          <Skeleton className="h-25" />
          <Skeleton className="h-50" />
          <Skeleton className="h-35" />
          <Skeleton className="h-35" />
        </div>

        <div className="flex flex-col gap-2 m-1">
          <Skeleton className="h-50" />
          <Skeleton className="h-32" />
          <Skeleton className="h-25" />
          <Skeleton className="h-25" />
        </div>

        <div className="flex flex-col gap-2 m-1">
          <Skeleton className="h-25" />
          <Skeleton className="h-35" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <Skeleton className="h-7" />
        <Skeleton className="h-7" />
      </div>
    </div>
  );
}