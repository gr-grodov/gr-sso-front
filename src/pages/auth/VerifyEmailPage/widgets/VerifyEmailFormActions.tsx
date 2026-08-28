import { Button } from "@/components/ui/button";
import { TimerContainer } from "@/shared/components/TimerContainer";
import { useTranslation } from "react-i18next";

interface VerifyEmailFormActionsProps {
  refreshVerifyCode: () => void;
  cancelVerifyCode: () => void;
}

export function VerifyEmailFormActions({
  refreshVerifyCode,
  cancelVerifyCode
}: VerifyEmailFormActionsProps) {
  const { t } = useTranslation("auth", {keyPrefix: "verify_email"});

  return (
    <>
      <Button variant='outline' onClick={cancelVerifyCode}>
        {t("actions.cancel")}
      </Button>
      <TimerContainer seconds={60}>
        {({remaining, isRunning, restart}) =>
          <Button
            disabled={isRunning} 
            onClick={() => {
              refreshVerifyCode(); 
              restart();
            }}
          >
            {isRunning ? `${t("actions.load_to_refresh", {remaining: remaining})}` : `${t("actions.refresh")}`}
          </Button>
        }
      </TimerContainer>
    </>
  )
}
