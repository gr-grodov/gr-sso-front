import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'

export default function OAuthClientsLoading() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia>
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Загружаем список OAuth клиентов</EmptyTitle>
        <EmptyDescription>
          Пожалуйста, подождите ответа. Не обновляйте страницу
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
