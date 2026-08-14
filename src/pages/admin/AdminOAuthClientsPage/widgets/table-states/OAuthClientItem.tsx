import { TableCell, TableRow } from '@/components/ui/table'
import { CopyableText } from '@/shared/components/CopyableText'
import { memo } from 'react'
import { OAuthClientActionMenu } from './OAuthClientActions'
import { Badge } from '@/components/ui/badge'
import { type OAuthClientShort } from '@/shared/api/dto/response'
import { DateUtils } from '@/shared/utils'

export interface OAuthClientItemProps {
  client: OAuthClientShort
}

export const OAuthClientItem = memo(function OAuthClientItem({
  client
}: OAuthClientItemProps) {
  return (
    <TableRow key={client.clientId}>
      <TableCell>{client.clientName}</TableCell>
      <TableCell>
        <CopyableText value={client.clientId}></CopyableText>
      </TableCell>
      <TableCell>
        {client.redirectUris.map((uri) => (
          <div key={uri}>{uri}</div>
        ))}
      </TableCell>
      <TableCell>
        {client.scopes.map((scope) => (
          <Badge key={scope} className='mr-1'>{scope}</Badge>
        ))}
      </TableCell>
      <TableCell>
        {client.status === "ACTIVE"
          ? <Badge variant='secondary'>Активен</Badge> 
          : <Badge variant='outline'>Отключён</Badge>
        }
      </TableCell>
      <TableCell>{DateUtils.formatDate(client.createdAt)}</TableCell>
      <TableCell>
        <OAuthClientActionMenu client={client}/>
      </TableCell>
    </TableRow>
  )
});
