import { AppContentBlock } from "@/widgets/AppContentBlock";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@/components/ui/field";
import * as z from "zod";
import { CardContent, CardFooter } from "@/components/ui/card.tsx";
import { OAuthButtonsBlock } from "@/widgets/OAuthButtonsBlock/indexe.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FormInput } from "@/shared/components/FormInput/FormInput.tsx";
import {
  createRegisterSchema,
  type RegisterForm,
} from "@/features/schemas/register.schema.ts";
import { PasswordField } from "@/shared/components/PasswordRulesInput";
import { passwordRules } from "@/features/rules/register.rules.password";

export function RegisterPage() {
  const { t } = useTranslation("auth");
  const form = useForm<RegisterForm>({
    resolver: zodResolver(createRegisterSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof createRegisterSchema>) {
    data;
  }

  const rules = passwordRules(t);

  return (
    <>
      <AppContentBlock
        title={t("register.title")}
        subtitle={t("register.subtitle")}
      >
        <CardContent>
          <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col">
          <Button size="lg" className="w-full" form="register-form" type="submit">
            {t("register.actions.submit")}
          </Button>
          <Button size="lg" className="w-full" variant="link">
            {t("register.actions.login")}
          </Button>
        </CardFooter>
      </AppContentBlock>
    </>
  );
}
