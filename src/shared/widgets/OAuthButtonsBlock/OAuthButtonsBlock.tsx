import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {cn} from "@/lib/utils.ts";
import {GoogleIcon} from "@/shared/icons/GoogleIcon.tsx";
import { Link } from "react-router";

type OAuthButtonsBlockProps = React.ComponentProps<"div">;

export function OAuthButtonsBlock({className, ...props}: OAuthButtonsBlockProps) {
  const {t} = useTranslation("auth");

  return (
    <div className={cn("space-y-3 flex flex-col", className)} {...props}>
      <Button variant="outline">
        <GoogleIcon/>
        <Link to="http://localhost:9090/oauth2/authorization/google">{t("oauth.sign_google")}</Link>
      </Button>
      {/*<Button variant="outline" size="lg">{t("oauth.sign_github")}</Button>
      <Button variant="outline" size="lg">{t("oauth.sign_yandex")}</Button>*/}
    </div>
  );
}