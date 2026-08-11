export interface Oauth2ConsentRequest {
  clientId: string;
  state: string;
  scopes: string[];
}