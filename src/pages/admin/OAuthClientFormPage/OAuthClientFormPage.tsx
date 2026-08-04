import { AdminContentBlock } from '@/shared/widgets/AdminContentBlock'
import { useState } from 'react'

import { OAuthClientForm, type OAuthClientFormSuccess } from './widgets/OAuthClientForm'
import OAuthClientSuccessDialog from './widgets/OAuthClientSuccessDialog'
import type { OAuthClientSecretInfoResponse } from '@/shared/api/dto/response';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

export function OAuthClientFormPage() {
  const navigate = useNavigate();
  const {t} = useTranslation("admin", {keyPrefix: "oauth_clients.form"})

  const { id } = useParams();
  const oAuthClientId = id !== "new" ? id : undefined;

  const [credentials, setCredentials] = useState<OAuthClientSecretInfoResponse | null>(null);

  function handleSuccess(formSuccess: OAuthClientFormSuccess) {
    switch (formSuccess.type) {
      case "created":
        setCredentials(formSuccess.credentials);
        return;

      case "updated":
        navigate("/admin/oauth-clients", {
          replace: true,
        });
        return;
    }
  }

  return (
    <AdminContentBlock 
      title={id ? t("title_edit_client") : t("title_create_client")}
      subtitle={t("subtitle")}
    >

      <OAuthClientForm 
        id={oAuthClientId} 
        onSuccess={handleSuccess}
      />

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
