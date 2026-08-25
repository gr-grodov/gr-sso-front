import { UserInfoApi } from "../api/user-info.api";

export class UserInfoService {
  static async userInfo() {
    return UserInfoApi.userInfo();
  }
}