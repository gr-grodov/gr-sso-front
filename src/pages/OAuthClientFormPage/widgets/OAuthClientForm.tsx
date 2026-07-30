import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type OauthClientSchema, oauthClientSchema } from '@/features/schemas/oauth2-client.schema'
import { FieldGroupForm } from '@/shared/components/FieldGroupForm'
import { InputField } from '@/shared/components/InputField'
import { ToggleGroupField } from '@/shared/components/ToggleGroupField'
import RedirectUrisField from '@/pages/OAuthClientFormPage/components/RedirectUrisField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { scopeTypes, authorizationGrantTypes } from "./OAuthClientForm.constant";
import { CheckboxGroupField } from '@/shared/components/CheckboxGroupField'
import { ArrowLeft } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { ErrorUtils } from '@/shared/api/utils/error-utils'
import { applyApiErrorsToForm } from '@/shared/api/utils/apply-errors-form'
import type { OAuthClientSecretInfoResponse } from '@/shared/api/dto/response'
import { LinkButton } from '@/components/ui/link-button'
import { AdminService as adminService } from '@/shared/service'

type OAuthClientFormProps = {
  onSuccess: (credentials: OAuthClientSecretInfoResponse) => void;
};

export function OAuthClientForm({
  onSuccess
}: OAuthClientFormProps) {
  const {t} = useTranslation("admin", { keyPrefix: 'oauth_clients.form' });
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<OauthClientSchema>({
    resolver: zodResolver(oauthClientSchema),

    defaultValues: {
      clientName: "",
      authorizationGrantTypes: [],
      redirectUris: [{uri: ""}],
      scopes: ["openid"],
    }
  });
  const {formState: { isSubmitting } } = form;

  async function onSubmit(data: OauthClientSchema) {
    setErrorMessage("");
    try {
      const response = await adminService.createOAuthClient(data);
      onSuccess(response.data);
    } catch(err) {
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrorsToForm(error, form.setError, setErrorMessage);
    }
  }

  return (
    <Card className='inline-flex'>

      <CardHeader>
        <CardTitle>
          <LinkButton size='icon' variant="ghost" to='/admin/oauth-clients'>
            <ArrowLeft/>
          </LinkButton>
          {t('title')}
          </CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="oauth-client-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroupForm errorMessage={errorMessage} className='w-xl'>

            <InputField
              control={form.control}
              name="clientName"
              label={t("fields.clientName.label")}
              placeholder={t("fields.clientName.hint")}
            />
            <CheckboxGroupField
              control={form.control}
              name='authorizationGrantTypes'
              options={authorizationGrantTypes}
              label={t("fields.authorizationGrantTypes.label")}
            />
            <RedirectUrisField control={form.control}/>
            <ToggleGroupField
              control={form.control}
              name="scopes"
              label={t("fields.scopes.label")}
              options={scopeTypes}
              showWithoutErrors
            />

            <Button type='submit' form='oauth-client-form' disabled={isSubmitting}>
              {t("actions.submit")}
              {isSubmitting && <Spinner data-icon="inline-start" />}
            </Button>

          </FieldGroupForm>
        </form>
      </CardContent>
    </Card>
  )
}
