import type { Oauth2ConsentRequest } from "@/shared/api/dto/requests";
import { OAuth2FlowApi } from "@/shared/api/oauth2-flow.api"


export class OAuth2FlowService {
  static continue() {
    return OAuth2FlowApi.continue();
  }

  static consent(body: Oauth2ConsentRequest) {
    return OAuth2FlowApi.consent(body);
  }
}