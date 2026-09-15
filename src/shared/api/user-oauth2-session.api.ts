import { api } from "./config/api";
import type { DeleteOAuth2SessionRequest } from "./dto/requests";
import type { SuccessResponse, UsersOAuth2SessionResponse } from "./dto/response";

export class UserOAuth2SessionApi {
  static async search(page: number, search?: string | null, pageSize?: number) {
    return api.get<UsersOAuth2SessionResponse>(
      "/api/admin/oauth-session/search",
      {params: {search: search, page: page, size: pageSize}}
    );
  }

  static async deleteSession(body: DeleteOAuth2SessionRequest) {
    return api.delete<SuccessResponse<any>>(
      "/api/admin/oauth-session",
      {data: body}
    );
  }
}