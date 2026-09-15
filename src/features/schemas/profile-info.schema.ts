import { tError } from "@/shared/i18n";
import { z } from "zod";

export const profileInfo = z.object({
  avatarId: z
    .string()
    .uuid()
    .optional()
    .nullable(),
  firstName: z
    .union([
      z.null(),
      z.literal(""),
      z.string().regex(/^\p{L}[\p{L}\s]*\p{L}$/u, { error: tError("firstName.invalid") }),
    ])
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  lastName: z
    .union([
      z.null(),
      z.literal(""),
      z.string().regex(/^\p{L}[\p{L}\s]*\p{L}$/u, { error: tError("lastName.invalid") }),
    ])
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  patronymic: z
    .union([
      z.null(),
      z.literal(""),
      z.string().regex(/^\p{L}[\p{L}\s]*\p{L}$/u, { error: tError("patronymic.invalid") }),
    ])
    .transform((v) => (v === "" ? undefined : v))
    .optional()
});

export type ProfileInfoSchema = z.infer<typeof profileInfo>;