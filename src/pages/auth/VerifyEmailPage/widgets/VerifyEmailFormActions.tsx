import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { TimerContainer } from "@/shared/components/TimerContainer";
import { useTranslation } from "react-i18next";

interface VerifyEmailFormActionsProps {
  refreshVerifyCode: () => void;
}

export function VerifyEmailFormActions({
  refreshVerifyCode
}: VerifyEmailFormActionsProps) {
  const { t } = useTranslation("auth", {keyPrefix: "verify_email"});

  return (
    <>
      <LinkButton variant='outline' to="/login" replace={true}>
        {t("actions.cancel")}
      </LinkButton>
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
