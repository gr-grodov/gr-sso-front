import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { OAuthClientShort, OAuthClientStatus } from '@/shared/api/dto/response';
import type { OAuthClient } from '@/shared/api/dto/response/oauth-clients-response';
import { CopyableText } from '@/shared/components/CopyableText';
import type { ComponentPropsWithoutRef } from 'react';
import { useTranslation } from 'react-i18next';

interface OAuthClientsTableProps extends ComponentPropsWithoutRef<typeof Table> {
  clients: OAuthClientShort[];
}

export function OAuthClientsTable({
  clients,
  ...props
}: OAuthClientsTableProps) {
  const {t} = useTranslation("admin")

  return (
    <Table {...props}>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">{t('oauth_clients.headers.app_name')}</TableHead>
          <TableHead className="font-semibold">{t('oauth_clients.headers.client_id')}</TableHead>
          <TableHead className="font-semibold">{t('oauth_clients.headers.redirect_uri')}</TableHead>
          <TableHead className="font-semibold">{t('oauth_clients.headers.scopes')}</TableHead>
          <TableHead className="font-semibold">{t('oauth_clients.headers.status')}</TableHead>
          <TableHead className="font-semibold">{t('oauth_clients.headers.created')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.clientId}>
            <TableCell>{client.clientName}</TableCell>
            <TableCell>
              <CopyableText value={client.clientId}></CopyableText>
            </TableCell>
            <TableCell>
              {client.redirectUris.map((uri) => (
                <span>{uri}</span>
              ))}
            </TableCell>
            <TableCell>
              {client.scopes.map((scope) => (
                <Badge className='mr-1'>{scope}</Badge>
              ))}
            </TableCell>
            <TableCell>
              {/* {client.status == OAuthClientStatus.ACTIVE
                ? <Badge>Активен</Badge> 
                : <Badge variant='outline'>Отключён</Badge>
              } */}
            </TableCell>
            <TableCell>{Date.parse(client.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
