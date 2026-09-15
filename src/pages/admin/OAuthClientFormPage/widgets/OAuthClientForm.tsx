import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FieldGroupForm } from '@/shared/components/FieldGroupForm'
import { InputField } from '@/shared/components/InputField'
import { ToggleGroupField } from '@/shared/components/ToggleGroupField'
import RedirectUrisField from '@/pages/admin/OAuthClientFormPage/components/RedirectUrisField'
import { useTranslation } from 'react-i18next'
import { scopeTypes, authorizationGrantTypes, clientAuthenticationMethods, accessTokenTimeToLives, refreshTokenTimeToLives, authorizationCodeTimeToLives } from "./OAuthClientForm.constant";
import { CheckboxGroupField } from '@/shared/components/CheckboxGroupField'
import { Spinner } from '@/components/ui/spinner'
import type { OAuthClientSecretInfoResponse } from '@/shared/api/dto/response'
import { LinkButton } from '@/components/ui/link-button'
import { OAuthClientFormLoading } from './OAuthClientFormLoading'
import { useOAuthClientForm } from '../hooks/use-oauth-client-form'
import { FieldGroup, FieldLegend } from '@/components/ui/field'
import { LogicalCheckboxField } from '@/shared/components/LogicalCheckboxField'
import { RadioGroupField } from '@/shared/components/RadioGroupField'
import { AppAvatarUploaderField } from '@/shared/components/AppAvatarUploaderField'

export type OAuthClientFormSuccess = | {
  type: "created";
  credentials: OAuthClientSecretInfoResponse;
} | {
  type: "updated";
};

type OAuthClientFormProps = {
  id: string | undefined; 
  onSuccess: (formSuccess: OAuthClientFormSuccess) => void;
};

export function OAuthClientForm({id, onSuccess}: OAuthClientFormProps) {
  const {t} = useTranslation("admin", { keyPrefix: 'oauth_clients.form' });

  const {form, scopes, grantTypes, authMethods, errorMessage, submit} = useOAuthClientForm(id, onSuccess);
  const {formState: { isSubmitting, isLoading } } = form;

  return (
    <div className='flex-col h-full'>
      {isLoading ? <OAuthClientFormLoading/> : 
        <form 
          id="oauth-client-form" 
          onSubmit={form.handleSubmit(submit)}
          className='flex flex-col justify-between h-full'
        >
          <FieldGroupForm errorMessage={errorMessage} className='grid grid-cols-1 lg:grid-cols-3'>

            <div className="flex flex-col gap-2">
              <Card className='p-4'>
                <AppAvatarUploaderField
                  control={form.control}
                  name='avatarId'
                  label={t("fields.avatar.label")}
                  fallbackAvatar={form.getValues('clientName')}
                />
              </Card>

              <Card className='p-4'>
                <InputField
                  control={form.control}
                  name="clientName"
                  label={t("fields.clientName.label")}
                  placeholder={t("fields.clientName.hint")}/>
              </Card>
            
              <Card className='p-4'>
                <CheckboxGroupField
                  control={form.control}
                  name='authorizationGrantTypes'
                  options={authorizationGrantTypes(grantTypes, t)}
                  label={t("fields.authorizationGrantTypes.label")}/>
              </Card>

              <Card className='p-4'>
                <RedirectUrisField control={form.control}/>
              </Card>

              <Card className='p-4'>
                <ToggleGroupField
                  control={form.control}
                  name="scopes"
                  label={t("fields.scopes.label")}
                  options={scopeTypes(scopes, t)}
                  showWithoutErrors/>
              </Card>
            </div>

            <div className="flex flex-col gap-2">
              <Card className='p-4'>
                <CheckboxGroupField
                  control={form.control}
                  name='clientAuthenticationMethods'
                  options={clientAuthenticationMethods(authMethods, t)}
                  label={t("fields.clientAuthenticationMethods.label")}/>
              </Card>
              <Card className='p-4'>
                <FieldLegend>{t("fields.clientSettings.label")}</FieldLegend>
                <FieldGroup>
                  <LogicalCheckboxField
                    control={form.control}
                    name='clientSettings.requireAuthorizationConsent'
                    checkboxLabel={t("fields.clientSettings.requireAuthorizationConsent.label")}/>
                  <LogicalCheckboxField
                    control={form.control}
                    name='clientSettings.requireProofKey'
                    checkboxLabel={t("fields.clientSettings.requireProofKey.label")}/>
                </FieldGroup>
              </Card>
              <Card className='p-4'>
                <InputField
                  control={form.control}
                  name='clientSettings.jwkSetUrl'
                  label={t("fields.clientSettings.jwkSetUrl.label")}
                  placeholder={t("fields.clientSettings.jwkSetUrl.placeholder")}/>
              </Card>
              <Card className='p-4'>
                <InputField
                  control={form.control}
                  name='clientSettings.oidcLogoutRedirectUri'
                  label={t("fields.clientSettings.oidcLogoutRedirectUri.label")}
                  placeholder={t("fields.clientSettings.oidcLogoutRedirectUri.placeholder")}/>
              </Card>
            </div>

            <div className="flex flex-col gap-2">
              <Card className='p-4'>
                <FieldLegend>{t("fields.tokenSettings.label")}</FieldLegend>
                <FieldGroup>
                  <LogicalCheckboxField
                    control={form.control}
                    name='tokenSettings.reuseRefreshTokens'
                    checkboxLabel={t("fields.tokenSettings.reuseRefreshTokens.label")}/>
                </FieldGroup>
              </Card>
              <Card className='p-4'>
                <RadioGroupField
                  control={form.control}
                  name='tokenSettings.authorizationCodeTimeToLive'
                  label={t("fields.tokenSettings.authorizationCodeTimeToLive.label")}
                  clearable={true}
                  options={authorizationCodeTimeToLives(t)}
                  customOption={{label: t("fields.tokenSettings.authorizationCodeTimeToLive.custom_value_label"), type: "number"}}/>
              </Card>
              <Card className='p-4'>
                <RadioGroupField
                  control={form.control}
                  name='tokenSettings.accessTokenTimeToLive'
                  label={t("fields.tokenSettings.accessTokenTimeToLive.label")}
                  options={accessTokenTimeToLives(t)}
                  customOption={{label: t("fields.tokenSettings.accessTokenTimeToLive.custom_value_label"), type: "number"}}/>
              </Card>
              <Card className='p-4'>
                <RadioGroupField
                  control={form.control}
                  name='tokenSettings.refreshTokenTimeToLive'
                  label={t("fields.tokenSettings.refreshTokenTimeToLive.label")}
                  clearable={true}
                  options={refreshTokenTimeToLives(t)}
                  customOption={{label: t("fields.tokenSettings.refreshTokenTimeToLive.custom_value_label"), type: "number"}}/>
              </Card>
            </div>
          </FieldGroupForm>
          <div className='mt-4 grid grid-cols-1 lg:grid-cols-3 gap-2'>
            <LinkButton variant='outline' to='/admin/oauth-clients'>
              {t("actions.cancel")}
            </LinkButton>
            <Button type='submit' disabled={isSubmitting}>
              {t("actions.submit")}
              {isSubmitting && <Spinner data-icon="inline-start" />}
            </Button>
          </div>
        </form>
      }
    </div>
  )
}
