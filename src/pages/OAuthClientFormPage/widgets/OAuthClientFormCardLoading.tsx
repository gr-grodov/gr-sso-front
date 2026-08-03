import { CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OAuthClientFormCardLoading() {
  return (
    <>
      <CardHeader>
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-4 w-80" />
      </CardHeader>

      <CardContent>
         <div className="space-y-6 w-xl">

            {/* Client name */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-xl" />
              <Skeleton className="h-8 w-xl" />
            </div>

            {/* Grant types */}
            <div className="space-y-3 w-xl">
              <Skeleton className="h-4" />

              <div className="space-y-2">
                <Skeleton className="h-3" />
                <Skeleton className="h-3" />
                <Skeleton className="h-3" />
                <Skeleton className="h-3" />
                <Skeleton className="h-3" />
                <Skeleton className="h-3" />
              </div>
            </div>

            {/* Redirect URIs */}
            <div className="space-y-3">
              <Skeleton className="h-4" />
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />

              <Skeleton className="h-7" />
            </div>

            {/* Scopes */}
            <div className="space-y-3">
              <Skeleton className="h-4" />

              <div className="flex gap-2">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-7 w-20" />
              </div>
            </div>

            {/* Submit */}
            <Skeleton className="h-8" />
          </div>
      </CardContent>
    </>
  );
}