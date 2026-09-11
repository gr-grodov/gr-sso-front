import { api } from "./config/api";
import type { Oauth2ConsentRequest } from "./dto/requests";
import type { OAuthClientShort, RedirectResponse, SuccessResponse } from "./dto/response";

export class OAuth2FlowApi {
  static continue() {
    return api.get<RedirectResponse>("api/oauth2/continue");
  }

  static async consent(body: Oauth2ConsentRequest) {
    return api.post<SuccessResponse<any>>(
      "api/oauth2/consent",
      body
    );
  }

  static async clientInfo(clientId: string) {
    return api.get<OAuthClientShort>(`api/oauth2/client/${clientId}`);
  }
}