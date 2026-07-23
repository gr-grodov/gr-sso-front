import { api } from "./config/api";

export class OAuth2Api {
  static oauthGoogle() {
    return api.get("/oauth2/authorization/google")
  }
}