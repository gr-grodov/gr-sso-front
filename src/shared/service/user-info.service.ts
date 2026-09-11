import type { ProfileInfoRequest } from "../api/dto/requests";
import { UserInfoApi } from "../api/user-info.api";

export class UserInfoService {
  static async userInfo() {
    return UserInfoApi.userInfo();
  }

    static async editProfile(body: ProfileInfoRequest) {
      return UserInfoApi.editProfile(body);
    }
}