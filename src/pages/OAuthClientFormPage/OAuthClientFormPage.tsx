import { AdminContentBlock } from '@/shared/widgets/AdminContentBlock'
import { useState } from 'react'

import { OAuthClientForm } from './widgets/OAuthClientForm'
import OAuthClientSuccessDialog from './widgets/OAuthClientSuccessDialog'
import type { OAuthClientSecretInfoResponse } from '@/shared/api/dto/response';

export function OAuthClientFormPage() {
  const [credentials, setCredentials] = useState<OAuthClientSecretInfoResponse | null>(null);

  return (
    <AdminContentBlock title="AdminOAuthClients">

      <OAuthClientForm onSuccess={data => setCredentials(data)}/>

      <OAuthClientSuccessDialog
        credentials={credentials} 
        open={credentials != null} 
        onOpenChange={(open) => {
          if (!open) {
            setCredentials(null);
          }
        }}
      />

    </AdminContentBlock>
  )
}
