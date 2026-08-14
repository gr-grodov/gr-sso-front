import type { OAuthAuthorizationGrantType, OAuthClientAuthenticationMethod, OAuthScope } from "../response";

export interface OAuthClientRequest {
  id?: string;
  clientName: string;
  authorizationGrantTypes: string[];
  clientAuthenticationMethods: string[];
  redirectUris: string[];
  scopes: string[]
}