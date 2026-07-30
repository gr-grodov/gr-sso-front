const OAuthAuthorizationGrantType = {
  AUTHORIZATION_CODE: "authorization_code",
  REFRESH_TOKEN: "refresh_token",
  CLIENT_CREDENTIALS: "client_credentials",
  DEVICE_CODE: "urn:ietf:params:oauth:grant-type:device_code",
  TOKEN_EXCHANGE: "urn:ietf:params:oauth:grant-type:token-exchange",
} as const;

export type OAuthAuthorizationGrantType = typeof OAuthAuthorizationGrantType[keyof typeof OAuthAuthorizationGrantType];


const OAuthClientStatus = {
  ACTIVE: "ACTIVE",
  DISABLED: "DISABLED",
  ARCHIVED: "ARCHIVED",
} as const;

export type OAuthClientStatus = typeof OAuthClientStatus[keyof typeof OAuthClientStatus];


export interface OAuthClientShort {
  id: string;
  clientId: string;
  clientName: string;
  authorizationGrantTypes: OAuthAuthorizationGrantType[];
  redirectUris: string[];
  scopes: string[];
  status: OAuthClientStatus;
  createdAt: string;
  updatedAt: string;
}