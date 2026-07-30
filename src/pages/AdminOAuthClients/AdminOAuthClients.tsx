import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import type { OAuthClient } from "@/shared/api/dto/response/oauth-clients-response";
import { AdminContentBlock } from "@/shared/widgets/AdminContentBlock";
import { OAuthClientsTable } from "@/shared/widgets/OAuthClientsTable";
import { Plus } from "lucide-react";

const clients: OAuthClient[] = [
  {
    name: "Аналитика",
    clientID: "analytics-prod-a1b2c3",
    redirectURIs: ['https://example.com'],
    scopes: ['openid', 'profile', 'email'],
    status: "stop",
    created: new Date()
  }
]

export function AdminOAuthClients() {
  return (
    <AdminContentBlock title="AdminOAuthClients">
      <div className="flex flex-col justify-between h-full">
        <Card>
          <CardContent>
            <OAuthClientsTable clients={clients}/>
          </CardContent>
        </Card>

        <div className="flex flex-row-reverse">
          <LinkButton size="lg" to='new'>
            <Plus/>Добавить
          </LinkButton>
        </div>
      </div>
    </AdminContentBlock>
  )
}
