import { CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function VerifyEmailLoading() {
  return (
    <>
      <CardHeader className="mt-10">
        <Skeleton className="h-9" />
        <Skeleton className="h-7" />
      </CardHeader>
        
      <CardContent>
        <Skeleton className="h-5" />
      
        <Skeleton className="h-9 mt-2" />
      </CardContent>

      <CardFooter className='grid grid-cols-2 gap-2'>
        <Skeleton className="h-7"/>
        <Skeleton className="h-7"/>
      </CardFooter>
    </>
  )
}
