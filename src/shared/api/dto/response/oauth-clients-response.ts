export interface OAuthClientsResponse {
}

export interface OAuthClient {
  "name": string, 
  "clientID": string,
  "redirectURIs": string[],
  "scopes": string[],
  "status": "active" | "stop",
  "created": Date
}