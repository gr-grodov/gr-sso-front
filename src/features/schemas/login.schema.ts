import { z } from "zod";
import { tError } from "@/shared/i18n";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({error: tError("email.empty")})
    .email({error: tError("email.invalid")}),

  password: z
    .string()
    .nonempty({error: tError("password.empty")})
    .min(8, {error: tError("password.min")}),
});

export type LoginForm = z.infer<typeof loginSchema>;