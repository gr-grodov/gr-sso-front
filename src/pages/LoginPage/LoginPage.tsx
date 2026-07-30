import {AppContentBlock} from "@/shared/widgets/AppContentBlock";
import {useTranslation} from "react-i18next";
import {loginSchema, type LoginForm} from "@/features/schemas/login.schema.ts";
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import { AuthService as authService } from "@/shared/service/auth.service";
import {CardContent, CardFooter} from "@/components/ui/card.tsx";
import {OAuthButtonsBlock} from "@/shared/widgets/OAuthButtonsBlock/indexe";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {InputField} from "@/shared/components/InputField/InputField";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { FieldGroupForm } from "@/shared/components/FieldGroupForm";
import { ErrorUtils } from "@/shared/api/utils/error-utils";
import { applyApiErrorsToForm } from "@/shared/api/utils/apply-errors-form";
import { useAuth } from "@/features/auth";
import { Spinner } from "@/components/ui/spinner";



export function LoginPage() {
  const navigate = useNavigate();
  const {login} = useAuth();
  const { t } = useTranslation("auth");
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });
  const {formState: { isSubmitting } } = form;

  async function onSubmit(data: LoginForm) {
    try {
      setErrorMessage("");

      await authService.login(data);
      login();

      navigate("/", {replace: true});
    } catch(err) {
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrorsToForm(error, form.setError, setErrorMessage)
    }
  }

  return (
    <AppContentBlock title={t("login.title")} subtitle={t("login.subtitle")}>
      <CardContent>
        <OAuthButtonsBlock className="pb-4"/>
        <Separator className="mb-4"/>

        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroupForm errorMessage={errorMessage}>
            <InputField
              control={form.control}
              name="email"
              label={t("login.fields.email.label")}
              placeholder={t("login.fields.email.hint")}
              showWithoutErrors={true}
            />
            <InputField
              control={form.control}
              name="password"
              type="password"
              label={t("login.fields.password.label")}
              placeholder={t("login.fields.password.hint")}
              showWithoutErrors={true}
            />
          </FieldGroupForm>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col">
        <div className="flex flex-row-reverse w-full">
          <Button variant="link">{t("login.actions.recover")}</Button>
        </div>

        <Button className="w-full" form="login-form" type="submit" disabled={isSubmitting}>
          {t("login.actions.submit")}
          {isSubmitting && <Spinner data-icon="inline-start" />}
        </Button>

        <Button variant="link">
          <Link to="/register">{t("login.actions.register")}</Link>
        </Button>
      </CardFooter>
    </AppContentBlock>
  );
}