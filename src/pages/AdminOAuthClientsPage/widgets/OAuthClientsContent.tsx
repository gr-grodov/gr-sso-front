import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { type OAuthClientShort } from '@/shared/api/dto/response/oauth-client-short-response';
import type { ComponentPropsWithoutRef } from 'react';
import { useTranslation } from 'react-i18next';
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