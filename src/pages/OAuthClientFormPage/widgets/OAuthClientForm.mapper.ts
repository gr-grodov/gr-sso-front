import type { OauthClientSchema } from "@/features/schemas/oauth2-client.schema";
import type { OAuthClient } from "@/shared/api/dto/response";

export function toOAuthClientForm(data: OAuthClient): OauthClientSchema {
  return {
    clientName: data.clientName,
    authorizationGrantTypes: data.authorizationGrantTypes,
    redirectUris: data.redirectUris.map(uri => ({
      uri,
    })),
    scopes: data.scopes,
  };
}

export function createEmptyOAuthClient(): OauthClientSchema {
  return {
    clientName: "",
    authorizationGrantTypes: [],
    redirectUris: [{ uri: "" }],
    scopes: ["openid"],
  };
}