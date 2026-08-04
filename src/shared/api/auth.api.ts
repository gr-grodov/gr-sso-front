import { AxiosError } from "axios";
import { api } from "./config/api";

import type { RegisterRequest, LoginRequest } from "./dto/requests";
import type { SuccessResponse } from "./dto/response";
import type { UserInfo } from "./dto/user-info";

export class AuthApi {

  static async login(body: LoginRequest) {
    return api.post<SuccessResponse<any>>(
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
    return api.post("/api/auth/logout");
  }

  static async userInfo() {
    return api.get<UserInfo>("/api/auth/user-info");
  }
}