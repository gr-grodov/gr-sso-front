import type { OAuthClientStatus, OAuthScope } from ".";

export interface OAuthClientShort {
  id: string;
  clientId: string;
  clientName: string;
  redirectUris: string[];
  scopes: OAuthScope[];
  status: OAuthClientStatus;
  createdAt: string;
  updatedAt: string;
}