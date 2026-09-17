import { useTranslation } from "react-i18next";
import {cn} from "@/lib/utils.ts";
import {GoogleIcon} from "@/shared/icons/GoogleIcon.tsx";
import { LinkButton } from "@/components/ui/link-button";
import { AuthService } from "@/shared/service/auth.service";

type OAuthButtonsBlockProps = React.ComponentProps<"div">;

export function OAuthButtonsBlock({className, ...props}: OAuthButtonsBlockProps) {
  const {t} = useTranslation("auth");
  const uriAuthByGoogle = AuthService.uriAuthByGoogle();

  return (
    <div className={cn("space-y-3 flex flex-col", className)} {...props}>
      <LinkButton variant="outline" to={uriAuthByGoogle}>
        <GoogleIcon/>
        {t("oauth.sign_google")}
      </LinkButton>
    </div>
  );
}