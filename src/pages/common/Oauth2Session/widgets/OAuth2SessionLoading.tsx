import { Skeleton } from "@/components/ui/skeleton";

export function OAuth2SessionLoading() {
  return (
    <>
      <Skeleton className="h-9 my-1"/>
      <Skeleton className="h-15"/>

      <br/>

      <Skeleton className="h-9 my-1"/>
      <Skeleton className="h-15"/>
    </>
  )
}
