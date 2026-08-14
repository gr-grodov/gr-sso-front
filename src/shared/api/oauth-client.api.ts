import { api } from "./config/api";
import {type OAuthClientChangeStatusRequest, type OAuthClientRequest} from "./dto/requests"
import { type SuccessResponse, type OAuthClientSecretInfoResponse, type OAuthClientShort, type OAuthClient, type OAuthScope, type OAuthAuthorizationGrantType, type OAuthClientAuthenticationMethod } from "./dto/response";

export class OAuthClientApi {
  static async createOAuthClient(body: OAuthClientRequest) {
    return await api.post<OAuthClientSecretInfoResponse>(
      "/api/admin/oauth-client",
      body
    )
  }


  static async editOAuthClient(body: OAuthClientRequest) {
    return await api.patch<OAuthClient>(
      "/api/admin/oauth-client",
      body
    )
  }


  static async listOAuthClient() {
    return await api.get<OAuthClientShort[]>("/api/admin/oauth-client/list")
  }


  static async listScopes() {
    return await api.get<OAuthScope[]>("/api/admin/oauth-client/scopes")
  }


  static async listGrantTypes() {
    return await api.get<OAuthAuthorizationGrantType[]>("/api/admin/oauth-client/auth-grant-types")
  }


  static async listAuthMethods() {
    return await api.get<OAuthClientAuthenticationMethod[]>("/api/admin/oauth-client/auth-methods")
  }


  static async getOAuthClient(id: string) {
    return await api.get<OAuthClient>(`/api/admin/oauth-client/${id}`)
  }


  static async searchOAuthClient(clientId?: string) {
    return await api.get<OAuthClient>(
      '/api/admin/oauth-client/search', 
      { params: {clientId: clientId} }
    )
  }


  static async changeStatusOAuthClient(body: OAuthClientChangeStatusRequest) {
    return await api.patch<OAuthClientShort>(
      "/api/admin/oauth-client/status",
      body
    )
  }


  static async deleteOAuthClient(id: string) {
    return await api.delete<SuccessResponse<void>>(
      `/api/admin/oauth-client/${id}`
    )
  }
}