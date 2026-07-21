import { tError } from "@/shared/i18n";
import { z } from "zod";

export const registerSchema = z.object({
    email: z
      .string()
      .nonempty({error: tError("email.empty")})
      .email({error: tError("email.invalid")}),

    password: z
      .string()
      .nonempty({error: tError("password.empty")})
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
        {error: tError("password.invalid")}
      ),
  });

export type RegisterForm = z.infer<typeof registerSchema>;
