import { Skeleton } from '@/components/ui/skeleton'
import { FieldGroupForm } from '@/shared/components/FieldGroupForm'

export function ProfileFormLoading() {
  return (
    <FieldGroupForm>
      <Skeleton className='h-5'/>
      <Skeleton className='h-8 mb-5'/>

      <Skeleton className='h-5'/>
      <Skeleton className='h-8 mb-5'/>

      <Skeleton className='h-5'/>
      <Skeleton className='h-8 mb-5'/>
    </FieldGroupForm>
  )
}
