import { api } from "./config/api";
import type { ProfileInfoRequest } from "./dto/requests";
import type { UserInfo } from "./dto/user-info";

export class UserInfoApi {
  static async userInfo() {
    return api.get<UserInfo>("/api/user-info");
  }

  static async editProfile(body: ProfileInfoRequest) {
    return api.patch<UserInfo>(
      "/api/user-info/profile",
      body
    );
  }
}