import { z } from "zod";
import { tError } from "@/shared/i18n";

export const oauthClientSchema = z.object({
  clientName: z
    .string()
    .nonempty({error: tError("clientName.empty")})
    .min(6, {error: tError("clientName.min")})
    .max(100, {error: tError("clientName.max")})
    .regex(/^[a-zA-z0-9- ]+$/, {error: tError("clientName.regex")}),

  authorizationGrantTypes: z
    .array(z.string())
    .min(1, {error: tError("authorizationGrantTypes.min")}),

  clientAuthenticationMethods: z
    .array(z.string())
    .min(1, {error: tError("clientAuthenticationMethods.min")}),

  redirectUris: z
    .array(z.object({
      uri: z.url({error: tError("redirectUris.invalid")})
    }))
    .min(1, {error: tError("redirectUris.min")}),

  scopes: z
    .array(z.string())
    .min(1, {error: tError("scopes.min")})
});

export type OauthClientSchema = z.infer<typeof oauthClientSchema>;