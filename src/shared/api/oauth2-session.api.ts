import { api } from "./config/api";
import { type SuccessResponse, type OAuth2SessionResponse } from "./dto/response";

export class OAuth2SessionApi {
  static async list() {
    return api.get<OAuth2SessionResponse>("/api/oauth2-session/list");
  }

  static async delete(sid: string) {
    return api.delete<SuccessResponse<any>>(
      `api/oauth2-session/${sid}`
    )
  }
}