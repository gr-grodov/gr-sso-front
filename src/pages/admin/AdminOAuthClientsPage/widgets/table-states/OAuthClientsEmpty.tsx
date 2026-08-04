import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty'
import { useOAuthClientActions } from '../OAuthClientsContext'
import { Button } from '@/components/ui/button';
import { RefreshCcwIcon } from 'lucide-react';

export default function OAuthClientsEmpty() {
  const {refresh} = useOAuthClientActions();

  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyTitle>OAuth клиенты не найдены</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          Обновить список клиентов?
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" onClick={() => refresh()}>
          <RefreshCcwIcon data-icon="inline-start" />
          Обновить
        </Button>
      </EmptyContent>
    </Empty>
  )
}
