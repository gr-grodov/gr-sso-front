import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { AdminContentBlock } from "@/shared/widgets/AdminContentBlock";
import { Plus } from "lucide-react";
import { OAuthClientActionsProvider } from "./widgets";
import { OAuthClientsContent } from "./widgets/OAuthClientsContent";
import { useOAuthClients } from "./hooks/useOAuthClients";


export function AdminOAuthClientsPage() {
  const {
    clients,
    loading,
    refresh,
    edit,
    changeStatus,
    remove,
  } = useOAuthClients()

  return (
    <AdminContentBlock title="AdminOAuthClients">
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
