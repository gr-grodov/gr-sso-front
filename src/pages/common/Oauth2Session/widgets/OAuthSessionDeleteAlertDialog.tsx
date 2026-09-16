import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import type { OAuth2Session } from '@/shared/api/dto/response';
import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next';

interface OAuthSessionDeleteAlertDialogProps {
  session: OAuth2Session;
  submit: () => void;
  triggerDialog: ReactElement;
}

export function OAuthSessionDeleteAlertDialog({
  session,
  submit,
  triggerDialog
}: OAuthSessionDeleteAlertDialogProps) {
  const {t} = useTranslation("common", {keyPrefix: "session.item"})

  return (
    <AlertDialog>
      <AlertDialogTrigger render={triggerDialog} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("dialog_delete.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("dialog_delete.description")} <span className='text-accent'>{session.clientName} </span> 
            {t("dialog_delete.description_device", {
              os: session.deviceInfo.operationSystem, 
              browser: session.deviceInfo.agentNameVersion
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("dialog_delete.actions.cancel")}</AlertDialogCancel>
          <AlertDialogAction variant='destructive' onClick={submit}>
            {t("dialog_delete.actions.submit")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
