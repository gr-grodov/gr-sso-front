import { api } from "./config/api";
import type { UserInfo } from "./dto/user-info";

export class UserInfoApi {
  static async userInfo() {
    return api.get<UserInfo>("/api/user-info");
  }
}