import { z } from "zod";
import { tError } from "@/shared/i18n";

export const oauthClientSchema = z.object({
  name: z
    .string()
    .nonempty({error: tError("oauth_client.name.empty")})
    .min(6, {error: tError("oauth_client.name.min")})
    .max(100, {error: tError("oauth_client.name.max")})
    .regex(/[a-z][A-Z] /, {error: tError("oauth_client.name.regex")}),
    
  clientID: z
    .string()
    .nonempty({error: tError("oauth_client.client_id.empty")})
    .min(6, {error: tError("oauth_client.client_id.min")})
    .max(100, {error: tError("oauth_client.client_id.max")})
    .regex(/[a-z][A-Z] /, {error: tError("oauth_client.client_id.regex")}),

  redirectUris: z
    .array(z.object({
      uri: z.url({error: tError("oauth_client.redirect_uri.invalid")})
    }))
    .min(1, {error: tError("oauth_client.redirect_uri.min")}),

  scopes: z
    .array(z.string())
    .min(1, {error: tError("oauth_client.scopes.min")})
});

export type OauthClientSchema = z.infer<typeof oauthClientSchema>;