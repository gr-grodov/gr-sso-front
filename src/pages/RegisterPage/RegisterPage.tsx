import { AppContentBlock } from "@/shared/widgets/AppContentBlock";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FormInput } from "@/shared/components/FormInput/FormInput.tsx";
import {
  registerSchema,
  type RegisterForm,
} from "@/features/schemas/register.schema.ts";
import { PasswordField } from "@/shared/components/PasswordRulesInput";
import { passwordRules } from "@/features/rules/register-password.rules";
import { Link } from "react-router";
import { AuthApi as authApi } from "@/shared/api/auth.api";
import { ErrorUtils } from "@/shared/api/utils/error-utils";
import { useState } from "react";
import { applyApiErrors } from "@/shared/api/utils/apply-errors-form";
import { FieldGroupForm } from "@/shared/components/FieldGroupForm";
import { Spinner } from "@/components/ui/spinner";

export function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const rules = passwordRules(t);
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {formState: { isSubmitting } } = form;

  async function onSubmit(data: RegisterForm) {
    try {
      await authApi.register(data);
      navigate("/login", {replace: true,});
    } catch(err) {
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrors(error, form.setError, setErrorMessage)
    }
  }

  return (
    <AppContentBlock
      title={t("register.title")}
      subtitle={t("register.subtitle")}
    >
      <CardContent>
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroupForm errorMessage={errorMessage}>
            <FormInput
              control={form.control}
              name="email"
              label={t("register.fields.email.label")}
              placeholder={t("register.fields.email.hint")}
              showWithoutErrors={true}
            />
            <PasswordField
              control={form.control}
              name="password"
              label={t("register.fields.password.label")}
              placeholder={t("register.fields.password.hint")}
              showWithoutErrors={true}
              rules={rules}
            />
          </FieldGroupForm>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col">
        <Button size="lg" className="w-full" form="register-form" type="submit" disabled={isSubmitting}>
          {t("register.actions.submit")}
          {isSubmitting && <Spinner data-icon="inline-start" />}
        </Button>
        <Button size="lg" className="w-full" variant="link">
          <Link to="/login">{t("register.actions.login")}</Link>
        </Button>
      </CardFooter>
    </AppContentBlock>
  );
}
