import { Card } from '@/components/ui/card'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'
import { useTranslation } from 'react-i18next'

export default function OAuthClientsLoading() {
  const {t} = useTranslation("admin", {keyPrefix: "oauth_clients.item"})

  return (
    <Card>
      <Empty className="w-full">
        <EmptyHeader>
          <EmptyMedia>
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>{t("loading_title")}</EmptyTitle>
          <EmptyDescription>
            {t("loading_description")}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Card>
  )
}
