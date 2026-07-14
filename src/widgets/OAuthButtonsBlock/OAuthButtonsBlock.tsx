import { Button } from "@/components/ui/button";
import styles from "./OAuthButtonsBlock.module.css"
import { useTranslation } from "react-i18next";

export function OAuthButtonsBlock() {
  const {t} = useTranslation("auth");

  return (
    <div className={`${styles.oauthButton} space-y-3`}>
      <Button variant="outline" size="lg">{t("oauth.sign_google")}</Button>
      <Button variant="outline" size="lg">{t("oauth.sign_github")}</Button>
      <Button variant="outline" size="lg">{t("oauth.sign_yandex")}</Button>
    </div>
  );
}