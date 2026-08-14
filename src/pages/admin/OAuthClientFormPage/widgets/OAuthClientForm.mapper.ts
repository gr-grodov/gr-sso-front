import type { OauthClientSchema } from "@/features/schemas/oauth-client.schema";
import type { OAuthClient } from "@/shared/api/dto/response";

export function toOAuthClientForm(data: OAuthClient): OauthClientSchema {
  return {
    clientName: data.clientName,
    authorizationGrantTypes: data.authorizationGrantTypes,
    clientAuthenticationMethods: data.clientAuthenticationMethods,
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
    clientAuthenticationMethods: [],
    redirectUris: [{ uri: "" }],
    scopes: ["OPEN_ID"],
  };
}