import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EllipsisVertical, RefreshCcwDot, SquarePen, Trash } from 'lucide-react';
import { useOAuthClientActions } from '../OAuthClientsContext';
import { type OAuthClient } from '@/shared/api/dto/response';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface OAuthClientActionMenuProps {
  client: OAuthClient
}

export function OAuthClientActionMenu({client}: OAuthClientActionMenuProps) {
  const {t} = useTranslation("admin", {keyPrefix: "oauth_clients.item.actions"})
  const { edit, changeStatus, remove } = useOAuthClientActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size='icon-sm' variant='ghost'>
          <EllipsisVertical size={12}/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => edit(client)}>
            <SquarePen/>Редактировать
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeStatus(client)}>
            <RefreshCcwDot/>{client.status === "ACTIVE" ? t("disable") : t("active")}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => remove(client)} variant='destructive'>
            <Trash/>Удалить
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
