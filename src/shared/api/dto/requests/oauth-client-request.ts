export interface OAuthClientRequest {
  clientName: string;
  authorizationGrantTypes: string[];
  redirectUris: string[];
  scopes: string[]
}