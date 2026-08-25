import { tError } from "@/shared/i18n";
import { z } from "zod";

export const verifyEmailShema = z.object({
    verifyCode: z
      .string()
      .nonempty({error: tError("verifyCode.empty")})
  });

export type VerifyEmailForm = z.infer<typeof verifyEmailShema>;
