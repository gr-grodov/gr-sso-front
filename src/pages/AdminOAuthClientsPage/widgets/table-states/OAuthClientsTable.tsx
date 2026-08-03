import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { OAuthClientStatusVariant, type OAuthClientShort } from '@/shared/api/dto/response'
import { CopyableText } from '@/shared/components/CopyableText'
import { OAuthClientActionMenu } from './OAuthClientActions'
import { DateUtils } from '@/shared/utils'
import { useTranslation } from 'react-i18next'

interface OAuthClientsTableProps {
  clients: OAuthClientShort[]
}

export default function OAuthClientsData({
  clients
}: OAuthClientsTableProps) {
  const {t} = useTranslation("admin")

  return (
    <Table 
      divClassname='max-h-[calc(80vh)] overflow-y-scroll'
      className="w-full relative"
    >
      <TableHeader className="sticky top-0 bg-card">
        <TableRow>
          <TableHead className="font-semibold">{t('oauth_clients.headers.app_name')}</TableHead>
          <TableHead className="font-semibold">{t('oauth_clients.headers.client_id')}</TableHead>
          <TableHead className="font-semibold">{t('oauth_clients.headers.redirect_uri')}</TableHead>
          <TableHead className="font-semibold">{t('oauth_clients.headers.scopes')}</TableHead>
          <TableHead className="font-semibold w-28">{t('oauth_clients.headers.status')}</TableHead>
          <TableHead className="font-semibold">{t('oauth_clients.headers.created')}</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-y-auto">
        {clients.map((client) => (
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
              {client.status === OAuthClientStatusVariant.ACTIVE
                ? <Badge variant='secondary'>Активен</Badge> 
                : <Badge variant='outline'>Отключён</Badge>
              }
            </TableCell>
            <TableCell>{DateUtils.formatDate(client.createdAt)}</TableCell>
            <TableCell>
              <OAuthClientActionMenu client={client}/>
            </TableCell>
          </TableRow>
        ))} 
      </TableBody>
    </Table>
  )
}
