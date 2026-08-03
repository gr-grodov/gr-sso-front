import { type OAuthClientShort } from '@/shared/api/dto/response/oauth-client-short-response';
import OAuthClientsLoading from './table-states/OAuthClientsLoading';
import OAuthClientsEmpty from './table-states/OAuthClientsEmpty';
import OAuthClientsData from './table-states/OAuthClientsTable';

interface OAuthClientsContentProps  {
  loading: boolean,
  clients: OAuthClientShort[];
}

export function OAuthClientsContent({
  loading,
  clients
}: OAuthClientsContentProps) {

  return (
    <>
      {loading ? <OAuthClientsLoading/> : clients.length == 0 
        ? <OAuthClientsEmpty/>
        : <OAuthClientsData clients={clients}/>
      }
    </>
  )
}