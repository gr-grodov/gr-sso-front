import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FieldGroupForm } from '@/shared/components/FieldGroupForm'
import { InputField } from '@/shared/components/InputField'
import { ToggleGroupField } from '@/shared/components/ToggleGroupField'
import RedirectUrisField from '@/pages/admin/OAuthClientFormPage/components/RedirectUrisField'
import { useTranslation } from 'react-i18next'
import { scopeTypes, authorizationGrantTypes } from "./OAuthClientForm.constant";
import { CheckboxGroupField } from '@/shared/components/CheckboxGroupField'
import { Spinner } from '@/components/ui/spinner'
import type { OAuthClientSecretInfoResponse } from '@/shared/api/dto/response'
import { LinkButton } from '@/components/ui/link-button'
import { OAuthClientFormLoading } from './OAuthClientFormLoading'
import { useOAuthClientForm } from '../hooks/use-oauth-client-form'

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

  const {form, errorMessage, submit} = useOAuthClientForm(id, onSuccess);
  const {formState: { isSubmitting, isLoading } } = form;

  return (
    <div className='flex-col'>
      {isLoading ? <OAuthClientFormLoading/> : 
        <form id="oauth-client-form" onSubmit={form.handleSubmit(submit)} className='flex'>
          <FieldGroupForm errorMessage={errorMessage} className='w-xl justify-between flex'>

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
                options={authorizationGrantTypes}
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
              options={scopeTypes}
              showWithoutErrors/>
            </Card>
            
            <Button type='submit' disabled={isSubmitting}>
              {t("actions.submit")}
              {isSubmitting && <Spinner data-icon="inline-start" />}
            </Button>
            <LinkButton variant='outline' to='/admin/oauth-clients'>
              {t("actions.cancel")}
            </LinkButton>
          </FieldGroupForm>
        </form>
      }
    </div>
  )
}
