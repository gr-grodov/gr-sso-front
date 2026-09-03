import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty'
import { useOAuthClientActions } from '../OAuthClientsContext'
import { Button } from '@/components/ui/button';
import { RefreshCcwIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export default function OAuthClientsEmpty() {
  const {t} = useTranslation("admin", {keyPrefix: "oauth_clients.item"})
  const {refresh} = useOAuthClientActions();

  return (
    <Card>
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyTitle>{t("empty_title")}</EmptyTitle>
          <EmptyDescription className="max-w-xs text-pretty">
            {t("empty_description")}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" onClick={() => refresh()}>
            <RefreshCcwIcon data-icon="inline-start" />
            {t("actions.refresh")}
          </Button>
        </EmptyContent>
      </Empty>
    </Card>
  )
}
