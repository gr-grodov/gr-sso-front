import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { AdminContentBlock } from "@/shared/widgets/AdminContentBlock";
import { Plus } from "lucide-react";
import { OAuthClientActionsProvider } from "./widgets";
import { OAuthClientsContent } from "./widgets/OAuthClientsContent";
import { useOAuthClients } from "./hooks/useOAuthClients";
import { useTranslation } from "react-i18next";
import { OAuthClientStatusVariant } from "@/shared/api/dto/response";


export function AdminOAuthClientsPage() {
  const {
    clients,
    loading,
    refresh,
    edit,
    changeStatus,
    remove,
  } = useOAuthClients()

  const {t} = useTranslation("admin", {keyPrefix: "oauth_clients"});
  const activeClientCount = clients.filter((cl) => cl.status == OAuthClientStatusVariant.ACTIVE).length;

  return (
    <AdminContentBlock 
      title={t("title")} 
      subtitle={t("subtitle", {activeCount: activeClientCount, allCount: clients.length})}
    >
      <Card>
        <CardContent>
          <OAuthClientActionsProvider 
            edit={edit}
            changeStatus={changeStatus} 
            remove={remove}
            refresh={refresh} >
            <OAuthClientsContent loading={loading} clients={clients}/>
          </OAuthClientActionsProvider>
        </CardContent>
      </Card>

      <LinkButton size="lg" to='new' className="fixed right-4 bottom-4 z-50">
        <Plus/>Добавить
      </LinkButton>
    </AdminContentBlock>
  )
}
