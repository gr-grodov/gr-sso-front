import type { RegisterRequest, LoginRequest, VerifyEmailRequest, RefreshVerifyCodeRequest } from "@/shared/api/dto/requests";
import { env } from "@/shared/config/env";
import { AuthApi } from "@/shared/api/auth.api";

export class AuthService {

  static async login(body: LoginRequest) {
    return AuthApi.login(body);
  }

  static async register(body: RegisterRequest) {
    return await AuthApi.register(body);
  }

  static async verifyEmail(body: VerifyEmailRequest) {
    return await AuthApi.verifyEmail(body);
  }

  static async refreshVerifyCodeEmail(body: RefreshVerifyCodeRequest) {
    return await AuthApi.refreshVerifyCodeEmail(body);
  }

  static async cancelVerifyCodeEmail(verifyId: string) {
    return await AuthApi.cancelVerifyCodeEmail(verifyId)
  }

  static async logout() {
    return AuthApi.logout();
  }

  static uriAuthByGoogle() {
    return `${env.apiUrl}/oauth2/authorization/google`
  }
}