import { Alert, AlertTitle } from '@/components/ui/alert';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { type VerifyEmailForm } from '@/features/schemas/verify-email.schema';
import { applyApiErrorsToForm } from '@/shared/api/utils/apply-errors-form';
import { applyApiErrorToToast } from '@/shared/api/utils/apply-errors-toast';
import { ErrorUtils } from '@/shared/api/utils/error-utils';
import { FieldGroupForm } from '@/shared/components/FieldGroupForm';
import { InputOTPField } from '@/shared/components/InputOTPField';
import { AuthService } from '@/shared/service';
import { AppCardBlock } from '@/shared/widgets/AppCardBlock'
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useVerifyEmailForm, type VerifyEmailInitState } from './hooks/use-verify-email-form';
import { VerifyEmailLoading } from './widgets/VerifyEmailLoading';
import { AppError } from '@/shared/api/utils/app-error';
import { VerifyEmailFormActions } from './widgets/VerifyEmailFormActions';

function existVerifyEmailInfo(verifyEmailInfo: VerifyEmailInitState | null): VerifyEmailInitState{
  if (!verifyEmailInfo) {
    throw new AppError("verify_email_init_not_found");
  }
  return verifyEmailInfo;
} 

export function VerifyEmailPage() {
  const { t } = useTranslation("auth", {keyPrefix: "verify_email"});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {form, verifyEmailInfo} = useVerifyEmailForm((error) => {
    applyApiErrorToToast(error);
    navigate("/register", {replace: true})
  });
  const {formState: { isSubmitting } } = form;


  async function refreshVerifyCode() {
    setErrorMessage("");
    form.reset();
    try {
      await AuthService.refreshVerifyCodeEmail({
        verifyId: existVerifyEmailInfo(verifyEmailInfo).verifyId
      })
    } catch(err) {
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrorToToast(error);
      navigate("/register", {replace: true})
    }
  }

  async function cancelVerifyCode() {
    if (!!verifyEmailInfo?.verifyId) {
      await AuthService.cancelVerifyCodeEmail(verifyEmailInfo.verifyId);  
    }
    navigate("/login", {replace: true})
  }
  

  async function onSubmit(data: VerifyEmailForm) {
    setErrorMessage("");
    try {
      await AuthService.verifyEmail({
        ...data,
        verifyId: existVerifyEmailInfo(verifyEmailInfo).verifyId, 
      });
      navigate("/login", {replace: true});
    } catch(err) {
      form.reset();
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrorsToForm(error, form.setError, setErrorMessage);
    }
  }


  return (
    <AppCardBlock>
      {!verifyEmailInfo ? <VerifyEmailLoading/> : 
      <>
        <CardHeader className="mt-10">
          <h3 className="font-semibold">{t("title")}</h3>
          <p>{t("subtitle", {userEmail: verifyEmailInfo.userEmail})}</p>
        </CardHeader>

        <CardContent>
          <Alert variant="allowed" className='mb-4'>
            <CircleCheck/>
            <AlertTitle>{t("alert_dialog")}</AlertTitle>
          </Alert>
          <form id="verify-email-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroupForm errorMessage={errorMessage} className='items-center'>
              <InputOTPField
                onSubmit={form.handleSubmit(onSubmit)}
                disabled={isSubmitting || !!errorMessage}
                control={form.control}
                name='verifyCode'
                pattern="d*d*d*d*d*d"
                label={t("fiedls.verifyCode.label")}
                size='lg'
              />
              <div className='flex flex-row items-center gap-1'>
                {isSubmitting && <><Spinner/><p>{t("loading")}</p></>}
              </div>
            </FieldGroupForm>
          </form>
        </CardContent>

        <CardFooter className='grid grid-cols-2 gap-2 mt-8'>
          <VerifyEmailFormActions refreshVerifyCode={refreshVerifyCode} cancelVerifyCode={cancelVerifyCode}/>
        </CardFooter>
      </>
      }
    </AppCardBlock>
  )
}
