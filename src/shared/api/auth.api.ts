import { AxiosError } from "axios";
import { api } from "./config/api";

import type { LoginRequest } from "./dto/requests/login-request";
import type { RegisterRequest } from "./dto/requests/register-request";
import type { SuccessResponse } from "./dto/response/success-response";
import type { UserInfo } from "./dto/user-info";

export class AuthApi {

  static async login(body: LoginRequest) {
    return api.post<UserInfo>(
      "/api/auth/login",
      body
    );
  }

  static async register(body: RegisterRequest) {
    const response = await api.post<SuccessResponse<any>>(
      "/api/auth/register",
      body
    );

    if (!response.data.success) {
      throw new AxiosError();
    }

    return response.data;
  }

  static async logout() {
    return api.post("/api/v1/auth/logout");
  }

  static async me() {
    return api.get("/api/v1/users/me");
  }
}