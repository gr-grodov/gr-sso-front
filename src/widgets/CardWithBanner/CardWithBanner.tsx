import {Card} from "@/components/ui/card.tsx";
import styles from "./CardWithBanner.module.css";
import banner from "@/assets/images/sso-banner.svg";
import { useTranslation } from "react-i18next";
import {OAuthButtonsBlock} from "@/widgets/OAuthButtonsBlock/OAuthButtonsBlock.tsx";
import {Field, FieldDescription, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";

export function CardWithBanner() {
  const {t} = useTranslation("auth");

  return (
    <Card className={styles.card}>
      <div>
        <img src={banner}/>
      </div>
      <div>

      </div>
      <div>
        <h2>{t("login.title")}</h2>
        <p className="text-gray-500 pb-4">{t("login.subtitle")}</p>

        <OAuthButtonsBlock></OAuthButtonsBlock>
        <Separator className="mt-4 mb-4"/>

        <FieldSet className="w-full max-w-xs">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" type="text" placeholder="Max Leiter" />
              <FieldDescription>
                Choose a unique username for your account.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              <Input id="password" type="password" placeholder="••••••••" />
            </Field>
          </FieldGroup>

          <Button size="lg">{t("oauth.sign_google")}</Button>
        </FieldSet>
      </div>
    </Card>
  );
}