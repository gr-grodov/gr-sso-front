import type { OAuthClientStatus } from ".";

export const OAuthAuthorizationGrantTypeVariant = {
  AUTHORIZATION_CODE:     "authorization_code",
  REFRESH_TOKEN:          "refresh_token",
  CLIENT_CREDENTIALS:     "client_credentials",
  DEVICE_CODE:            "urn:ietf:params:oauth:grant-type:device_code",
  TOKEN_EXCHANGE:         "urn:ietf:params:oauth:grant-type:token-exchange",
} as const;

export type OAuthAuthorizationGrantType = typeof OAuthAuthorizationGrantTypeVariant[keyof typeof OAuthAuthorizationGrantTypeVariant];

export const OAuthClientAuthenticationMethodVariant = {
  CLIENT_SECRET_BASIC:          "client_secret_basic",
  CLIENT_SECRET_POST:           "client_secret_post",
  CLIENT_SECRET_JWT:            "client_secret_jwt",
  PRIVATE_KEY_JWT:              "private_key_jwt",
  TLS_CLIENT_AUTH:              "client_secret_jwt",
  SELF_SIGNED_TLS_CLIENT_AUTH:  "self_signed_tls_client_auth",
  NONE:                         "none",
} as const;

export type OAuthClientAuthenticationMethod = typeof OAuthClientAuthenticationMethodVariant[keyof typeof OAuthClientAuthenticationMethodVariant];


export interface OAuthClient {
  id: string;
  clientId: string;
  clientName: string;
  authorizationGrantTypes: OAuthAuthorizationGrantType[];
  clientAuthenticationMethods: OAuthClientAuthenticationMethod[];
  redirectUris: string[];
  postLogoutRedirectUris: string[];
  scopes: string[];
  status: OAuthClientStatus;
  createdAt: string;
  updatedAt: string;
}