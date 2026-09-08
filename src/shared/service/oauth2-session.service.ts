import { OAuth2SessionApi } from "../api/oauth2-session.api";

export class OAuth2SessionService {
  static async list() {
    return OAuth2SessionApi.list();
  }

  static async delete(sid: string) {
    return OAuth2SessionApi.delete(sid);
  }
}