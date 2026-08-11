export interface OAuthClientRequest {
  id?: string;
  clientName: string;
  authorizationGrantTypes: string[];
  redirectUris: string[];
  scopes: string[]
}