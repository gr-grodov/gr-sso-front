import { api } from "./config/api";
import {type OAuthClientRequest} from "./dto/requests"
import type { OAuthClientSecretInfoResponse } from "./dto/response";

export class AdminApi {
  static async createOAuthClient(body: OAuthClientRequest) {
    return await api.post<OAuthClientSecretInfoResponse>(
      "/api/admin/oauth-client",
      body
    )
  }
}