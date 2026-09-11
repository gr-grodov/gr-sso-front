import type { Oauth2ConsentRequest } from "@/shared/api/dto/requests";
import { OAuth2FlowApi } from "@/shared/api/oauth2-flow.api"


export class OAuth2FlowService {
  static async continue() {
    return OAuth2FlowApi.continue();
  }

  static async consent(body: Oauth2ConsentRequest) {
    return OAuth2FlowApi.consent(body);
  }

  static async clientInfo(id: string) {
    return OAuth2FlowApi.clientInfo(id);
  }
}