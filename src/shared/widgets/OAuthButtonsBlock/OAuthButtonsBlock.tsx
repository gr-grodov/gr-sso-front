import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {cn} from "@/lib/utils.ts";
import {GoogleIcon} from "@/shared/icons/GoogleIcon.tsx";
import { Link } from "react-router";
import { LinkButton } from "@/components/ui/link-button";

type OAuthButtonsBlockProps = React.ComponentProps<"div">;

export function OAuthButtonsBlock({className, ...props}: OAuthButtonsBlockProps) {
  const {t} = useTranslation("auth");

  return (
    <div className={cn("space-y-3 flex flex-col", className)} {...props}>
      <LinkButton variant="outline" to="http://localhost:9090/oauth2/authorization/google">
        <GoogleIcon/>
        {t("oauth.sign_google")}
      </LinkButton>
      {/*<Button variant="outline" size="lg">{t("oauth.sign_github")}</Button>
      <Button variant="outline" size="lg">{t("oauth.sign_yandex")}</Button>*/}
    </div>
  );
}