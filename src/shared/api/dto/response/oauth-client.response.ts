export type OAuthAuthorizationGrantType = 
  "AUTHORIZATION_CODE" |
  "REFRESH_TOKEN" |
  "CLIENT_CREDENTIALS" |
  "DEVICE_CODE" |
  "TOKEN_EXCHANGE";

export type OAuthClientAuthenticationMethod = 
  "CLIENT_SECRET_BASIC" | 
  "CLIENT_SECRET_POST" | 
  "CLIENT_SECRET_JWT" | 
  "PRIVATE_KEY_JWT" | 
  "TLS_CLIENT_AUTH" | 
  "SELF_SIGNED_TLS_CLIENT_AUTH" |
  "NONE";

export type OAuthClientStatus = "ACTIVE" | "DISABLED";

export type OAuthScope = string;


export interface OAuthClient {
  id: string;
  clientId: string;
  
  clientName: string;
  authorizationGrantTypes: OAuthAuthorizationGrantType[];
  clientAuthenticationMethods: OAuthClientAuthenticationMethod[];
  redirectUris: string[];
  postLogoutRedirectUris: string[];
  scopes: OAuthScope[];
  clientSettings: {
    requireAuthorizationConsent: boolean;
    requireProofKey: boolean;
    jwkSetUrl: string;
    oidcLogoutRedirectUri: string;
    tokenEndpointAuthenticationSigningAlgorithm: string;
  };
  tokenSettings: {
    authorizationCodeTimeToLive: number;
    accessTokenTimeToLive: number;
    refreshTokenTimeToLive: number;
    reuseRefreshTokens: boolean;
  };
  status: OAuthClientStatus;
  avatarId: string;
  createdAt: string;
  updatedAt: string;
}