import type { DeleteOAuth2SessionRequest } from "../api/dto/requests";
import { UserOAuth2SessionApi } from "../api/user-oauth2-session.api";

export class UserOAuth2SessionService {
  static async search(page: number, search?: string | null, pageSize?: number) {
    return UserOAuth2SessionApi.search(page, search, pageSize);
  }

  static async deleteSession(body: DeleteOAuth2SessionRequest) {
    return UserOAuth2SessionApi.deleteSession(body);
  }
}