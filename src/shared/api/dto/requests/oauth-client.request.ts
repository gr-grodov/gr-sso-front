export interface OAuthClientRequest {
  id?: string;
  clientName: string;
  authorizationGrantTypes: string[];
  clientAuthenticationMethods: string[];
  redirectUris: string[];
  scopes: string[];
  clientSettings: {
    requireAuthorizationConsent: boolean,
    requireProofKey: boolean,
    jwkSetUrl: string,
    oidcLogoutRedirectUri: string
  },
  tokenSettings: {
    authorizationCodeTimeToLive?: number | undefined,
    accessTokenTimeToLive: number,
    refreshTokenTimeToLive?: number | undefined,
    reuseRefreshTokens: boolean,
  },
}