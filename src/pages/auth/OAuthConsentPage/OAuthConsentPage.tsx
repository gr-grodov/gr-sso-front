import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner';
import { oauth2FlowContinue } from '@/features/oauth2/oauth2-flow-continue';
import { type OAuthConsentSchema } from '@/features/schemas/oauth2-consent.schema';
import { applyApiErrorToToast } from '@/shared/api/utils/apply-errors-toast';
import { ErrorUtils } from '@/shared/api/utils/error-utils';
import { CheckboxGroupField, } from '@/shared/components/CheckboxGroupField';
import { FieldGroupForm } from '@/shared/components/FieldGroupForm';
import { OAuth2FlowService } from '@/shared/service';
import { AppCardBlock } from '@/shared/widgets/AppCardBlock'
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { useConsentForm } from './hooks/use-consent-form';
import { OAuthConsentLoading } from './widgets/OAuthConsentLoading';

export function OAuthConsentPage() {
  const { t } = useTranslation("auth", {keyPrefix: "consent"});
  const navigate = useNavigate();

  const {form, oauthClient, scopes} = useConsentForm((error) => {
    applyApiErrorToToast(error);
    navigate("/register", {replace: true})
  });
  const {formState: { isSubmitting } } = form;

  async function submit(data: OAuthConsentSchema) {
    try {
      await OAuth2FlowService.consent(data);
      await oauth2FlowContinue(() => navigate("/", {replace: true}));
    } catch(err) {
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrorToToast(error);
    }
  }

  async function deny() {
    try {
      await OAuth2FlowService.consent({ ...form.getValues(), scopes: [] });
      await oauth2FlowContinue(() => navigate("/", { replace: true }));
    } catch (err) {
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrorToToast(error);
    }
  }

  return (
    <AppCardBlock>
      {!oauthClient ? <OAuthConsentLoading/> : 
      <>
        <CardHeader className="mt-10">
          <h3 className="font-semibold">{t("title")} <span className='text-accent'>{oauthClient.clientName}</span></h3>
        </CardHeader>
          
        <CardContent>
          <p>{t("description", {clientName: oauthClient.clientName})}</p>
          <form id="oauth2-consent-form" onSubmit={form.handleSubmit(submit)} className='flex'>
            <FieldGroupForm className='w-xl justify-between flex'>
              <CheckboxGroupField
                control={form.control}
                name='scopes'
                options={scopes.filter(value => value != 'openid').map(value => { return {
                  value: value,
                  label: t(`fields.scope.${value}`)
                }})}
              />
            </FieldGroupForm>
          </form>
        </CardContent>

        <CardFooter className='grid grid-cols-2 gap-2'>
          <p className='col-span-2'>
            {t("actions.account_hint")} <Link className='text-primary' to='/'>{t("actions.account")}</Link>
          </p>
          <Button variant='outline' onClick={() => deny()}>
            {t("actions.deny")}
          </Button>
          <Button type='submit' disabled={isSubmitting} form='oauth2-consent-form'>
            {t("actions.submit")}
            {isSubmitting && <Spinner data-icon="inline-start" />}
          </Button>
        </CardFooter>
      </>}
    </AppCardBlock>
  )
}
