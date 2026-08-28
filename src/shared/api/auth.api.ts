import { api } from "./config/api";

import type { RegisterRequest, LoginRequest, VerifyEmailRequest, RefreshVerifyCodeRequest } from "./dto/requests";
import { type VerifyEmailResponse, type RegisterResponse, type SuccessResponse } from "./dto/response";

export class AuthApi {

  static async login(body: LoginRequest) {
    return api.post<SuccessResponse<any>>(
      "/api/auth/login",
      body
    );
  }

  static async register(body: RegisterRequest) {
    return await api.post<RegisterResponse>(
      "/api/auth/register",
      body
    );
  }

  static async verifyEmail(body: VerifyEmailRequest) {
    return await api.post<SuccessResponse<any>>(
      "/api/auth/verify-email",
      body
    )
  }

  static async refreshVerifyCodeEmail(body: RefreshVerifyCodeRequest) {
    return await api.post<SuccessResponse<any>>(
      "api/auth/refresh-verify-code",
      body
    )
  }

  static async cancelVerifyCodeEmail(verifyId: String) {
    return await api.delete<SuccessResponse<any>>(
      `api/auth/cancel-verify-code/${verifyId}`
    );
  }

  static async logout() {
    return api.post("/api/auth/logout");
  }
}