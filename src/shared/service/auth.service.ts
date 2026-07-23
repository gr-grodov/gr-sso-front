import type { RegisterRequest, LoginRequest } from "@/shared/api/dto/requests";
import { AuthApi } from "@/shared/api/auth.api";
import { AxiosError } from "axios";

export class AuthService {

  static async login(body: LoginRequest) {
    return AuthApi.login(body);
  }

  static async register(body: RegisterRequest) {
    const response = await AuthApi.register(body);

    if (!response.success) {
      throw new AxiosError();
    }

    return response.data;
  }

  static async logout() {
    return AuthApi.logout();
  }

  static async userInfo() {
    return AuthApi.userInfo();
  }
}