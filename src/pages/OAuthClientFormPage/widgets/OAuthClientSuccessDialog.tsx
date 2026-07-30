import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Field, FieldGroup, FieldLegend } from '@/components/ui/field'
import type { OAuthClientSecretInfoResponse } from '@/shared/api/dto/response'
import { CopyableText } from '@/shared/components/CopyableText'
import { type ComponentPropsWithoutRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

interface OAuthClientSuccessDialogProps extends ComponentPropsWithoutRef<typeof AlertDialog> {
  credentials: OAuthClientSecretInfoResponse | null
}

export default function OAuthClientSuccessDialog({
  credentials,
  ...props
}: OAuthClientSuccessDialogProps) {
  const navigate = useNavigate();
  const {t} = useTranslation("admin", { keyPrefix: 'oauth_clients.form.success_dialog' });

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>

          <AlertDialogDescription>{t("subtitle")}</AlertDialogDescription>
        </AlertDialogHeader>

        <FieldGroup>
          <Field>
            <FieldLegend>{t("client_name")}</FieldLegend>
            <CopyableText
              variant='primary'
              value={credentials?.clientID ?? ""} 
            />
          </Field>

          <Field>
            <FieldLegend>{t("client_secret")}</FieldLegend>
            <CopyableText
              variant='primary' 
              value={credentials?.clientSecret ?? ""} 
            />
          </Field>
        </FieldGroup>
        
        <AlertDialogFooter>
          <AlertDialogAction
            className='w-full'
            variant='outline'
            onClick={() => navigate("/admin/oauth-clients", {replace: true})}
          >
            {t("actions.accept")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
