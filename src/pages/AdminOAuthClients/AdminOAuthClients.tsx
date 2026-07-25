import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { OAuthClient } from "@/shared/api/dto/response/oauth-clients-response";
import { AdminContentBlock } from "@/shared/widgets/AdminContentBlock";
import { OAuthClientDialog } from "@/shared/widgets/OAuthClientDialog";
import { OAuthClientsTable } from "@/shared/widgets/OAuthClientsTable";
import { Input } from "@base-ui/react";
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
          <OAuthClientDialog/>
        </div>
      </div>
    </AdminContentBlock>
  )
}
