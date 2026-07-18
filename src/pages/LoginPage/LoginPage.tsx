import {AppContentBlock} from "@/widgets/AppContentBlock";
import {useTranslation} from "react-i18next";
import {createLoginSchema, type LoginForm} from "@/features/schemas/login.schema.ts";
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import {FieldGroup} from "@/components/ui/field";
import * as z from "zod"
import {CardContent, CardFooter} from "@/components/ui/card.tsx";
import {OAuthButtonsBlock} from "@/widgets/OAuthButtonsBlock/indexe.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FormInput} from "@/shared/components/FormInput/FormInput.tsx";



export function LoginPage() {
  const { t } = useTranslation("auth");
  const form = useForm<LoginForm>({
    resolver: zodResolver(createLoginSchema(t)),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  function onSubmit(data: z.infer<typeof createLoginSchema>) {
    data
  }

  return (
    <>
      <AppContentBlock title={t("login.title")} subtitle={t("login.subtitle")}>
        <CardContent>
          <OAuthButtonsBlock className="pb-4"/>
          <Separator className="mb-4"/>

          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormInput
                control={form.control}
                name="email"
                label={t("login.fields.email.label")}
                placeholder={t("login.fields.email.hint")}
                showWithoutErrors={true}
              />
              <FormInput
                control={form.control}
                name="password"
                type="password"
                label={t("login.fields.password.label")}
                placeholder={t("login.fields.password.hint")}
                showWithoutErrors={true}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col">
          <div className="flex flex-row-reverse w-full">
            <Button variant="link">{t("login.actions.recover")}</Button>
          </div>
          <Button size="lg" className="w-full" form="login-form" type="submit">{t("login.actions.submit")}</Button>
          <div className="flex flex-row">
            <span className="pt-2">{t("login.actions.register_hint")}</span>
            <Button className="pt-1 px-0.5" variant="link">{t("login.actions.register")}</Button>
          </div>
        </CardFooter>
      </AppContentBlock>
    </>
  );
}