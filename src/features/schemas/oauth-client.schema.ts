import { z } from "zod";
import { tError } from "@/shared/i18n";

export const oauthClientSchema = z.object({
  clientName: z
    .string()
    .nonempty({error: tError("oauth_client.clientName.empty")})
    .min(6, {error: tError("oauth_client.clientName.min")})
    .max(100, {error: tError("oauth_client.clientName.max")})
    .regex(/^[a-zA-z0-9- ]+$/, {error: tError("oauth_client.clientName.regex")}),

  authorizationGrantTypes: z
    .array(z.string())
    .min(1, {error: tError("oauth_client.authorizationGrantTypes.min")}),

  redirectUris: z
    .array(z.object({
      uri: z.url({error: tError("oauth_client.redirectUris.invalid")})
    }))
    .min(1, {error: tError("oauth_client.redirectUris.min")}),

  scopes: z
    .array(z.string())
    .min(1, {error: tError("oauth_client.scopes.min")})
});

export type OauthClientSchema = z.infer<typeof oauthClientSchema>;