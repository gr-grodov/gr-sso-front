import type { OauthClientSchema } from "@/features/schemas/oauth-client.schema";
import type { OAuthClient } from "@/shared/api/dto/response";

export function toOAuthClientForm(data: OAuthClient): OauthClientSchema {
  const defaultValue = createEmptyOAuthClient();

  return {
    clientName: data.clientName ?? defaultValue.clientName,
    authorizationGrantTypes: data.authorizationGrantTypes ?? defaultValue.authorizationGrantTypes,
    clientAuthenticationMethods: data.clientAuthenticationMethods ?? defaultValue.clientAuthenticationMethods,
    redirectUris: data.redirectUris?.map(uri => ({
      uri,
    })) ?? defaultValue.redirectUris,
    scopes: data.scopes ?? defaultValue.scopes,
    clientSettings: {
      requireProofKey: data.clientSettings.requireProofKey
        ?? defaultValue.clientSettings.requireProofKey,
      requireAuthorizationConsent: data.clientSettings.requireAuthorizationConsent 
        ?? defaultValue.clientSettings.requireAuthorizationConsent,
      jwkSetUrl: data.clientSettings.jwkSetUrl 
        ?? defaultValue.clientSettings.jwkSetUrl,
      oidcLogoutRedirectUri: data.clientSettings.oidcLogoutRedirectUri 
        ?? defaultValue.clientSettings.oidcLogoutRedirectUri,
      tokenEndpointAuthenticationSigningAlgorithm: data.clientSettings.tokenEndpointAuthenticationSigningAlgorithm 
        ?? defaultValue.clientSettings.tokenEndpointAuthenticationSigningAlgorithm
    },
    tokenSettings: {
      authorizationCodeTimeToLive: data.tokenSettings.authorizationCodeTimeToLive
        ?? defaultValue.tokenSettings.authorizationCodeTimeToLive,
      accessTokenTimeToLive: data.tokenSettings.accessTokenTimeToLive
        ?? defaultValue.tokenSettings.accessTokenTimeToLive,
      refreshTokenTimeToLive: data.tokenSettings.refreshTokenTimeToLive
        ?? defaultValue.tokenSettings.refreshTokenTimeToLive,
      reuseRefreshTokens: data.tokenSettings.reuseRefreshTokens
        ?? defaultValue.tokenSettings.reuseRefreshTokens
    },
    avatarId: data.avatarId
  };
}

export function createEmptyOAuthClient(): OauthClientSchema {
  return {
    clientName: "",
    authorizationGrantTypes: [],
    clientAuthenticationMethods: [],
    redirectUris: [{ uri: "" }],
    clientSettings: {
      requireAuthorizationConsent: true,
      requireProofKey: true,
      jwkSetUrl: "",
      oidcLogoutRedirectUri: "",
      tokenEndpointAuthenticationSigningAlgorithm: "RS256"
    },
    tokenSettings: {
      authorizationCodeTimeToLive: 300,
      accessTokenTimeToLive: 300,
      refreshTokenTimeToLive: 2592000,
      reuseRefreshTokens: true
    },
    avatarId: null,
    scopes: ["OPEN_ID"],
  };
}