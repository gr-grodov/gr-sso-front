import { z } from "zod";
import type { TFunction } from "i18next";

export const createLoginSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .nonempty(t("errors.email.empty"))
      .email(t("errors.email.invalid")),

    password: z
      .string()
      .nonempty(t("errors.password.empty"))
      .min(8, t("errors.password.min", { min: 8 })),
  });

export type LoginForm = z.infer<ReturnType<typeof createLoginSchema>>;