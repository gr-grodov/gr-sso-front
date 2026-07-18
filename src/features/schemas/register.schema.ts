import { z } from "zod";
import type { TFunction } from "i18next";

export const createRegisterSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .nonempty(t("errors.email.empty"))
      .email(t("errors.email.invalid")),

    password: z
      .string()
      .nonempty(t("errors.password.empty")),

    repeatPassword: z
      .string()
      .nonempty(t("errors.password.empty"))
  });

export type RegisterForm = z.infer<ReturnType<typeof createRegisterSchema>>;