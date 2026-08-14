import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EllipsisVertical, RefreshCcwDot, SquarePen, Trash } from 'lucide-react';
import { useOAuthClientActions } from '../OAuthClientsContext';
import { type OAuthClientShort } from '@/shared/api/dto/response';

export interface OAuthClientActionMenuProps {
  client: OAuthClientShort
}

export function OAuthClientActionMenu({
  client
}: OAuthClientActionMenuProps) {
  const { edit, changeStatus, remove } = useOAuthClientActions();


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical size={12}/>
      </DropdownMenuTrigger>

      <DropdownMenuContent>

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => edit(client)}>
            <SquarePen/>Редактировать
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeStatus(client)}>
            <RefreshCcwDot/>{client.status === "ACTIVE" ? "Отключить" : "Активировать"}
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
