import type { PasswordRule } from "@/shared/components/PasswordRulesInput";
import type { TFunction } from "i18next";

export const passwordRules = (t: TFunction): PasswordRule[] => [
  {
    id: "length",
    message: t("password_rules.length"),
    test: (password: string) => password.length >= 8,
  },
  {
    id: "uppercase",
    message: t("password_rules.uppercase"),
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    message: t("password_rules.lowercase"),
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    id: "digit",
    message: t("password_rules.digit"),
    test: (password: string) => /\d/.test(password),
  },
  {
    id: "special",
    message: t("password_rules.special"),
    test: (password: string) =>
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  },
];
