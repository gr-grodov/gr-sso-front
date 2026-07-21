import {AppContentBlock} from "@/shared/widgets/AppContentBlock";
import {useTranslation} from "react-i18next";
import {loginSchema, type LoginForm} from "@/features/schemas/login.schema.ts";
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import {FieldGroup} from "@/components/ui/field";
import * as z from "zod"
import {CardContent, CardFooter} from "@/components/ui/card.tsx";
import {OAuthButtonsBlock} from "@/shared/widgets/OAuthButtonsBlock/indexe";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FormInput} from "@/shared/components/FormInput/FormInput.tsx";
import { Link } from "react-router";



export function LoginPage() {
  const { t } = useTranslation("auth");
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log(data)
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
          <Button variant="link">
            <Link to="/register">{t("login.actions.register")}</Link>
          </Button>
        </CardFooter>
      </AppContentBlock>
    </>
  );
}