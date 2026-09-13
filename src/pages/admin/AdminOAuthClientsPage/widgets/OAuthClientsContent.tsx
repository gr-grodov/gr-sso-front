import OAuthClientsLoading from './data-states/OAuthClientsLoading';
import OAuthClientsEmpty from './data-states/OAuthClientsEmpty';
import { OAuthClientsData } from './data-states/OAuthClientData';
import type { OAuthClient } from '@/shared/api/dto/response';

interface OAuthClientsContentProps {
  loading: boolean,
  clients: OAuthClient[];
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