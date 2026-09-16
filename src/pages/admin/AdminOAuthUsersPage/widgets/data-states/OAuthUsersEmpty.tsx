import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { RefreshCcwIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useOAuthUsersActions } from '../OAuthUsersContext';

export default function OAuthUsersEmpty() {
  const {t} = useTranslation("admin", {keyPrefix: "oauth_users.item"})
  const {refresh} = useOAuthUsersActions();

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
