import { AdminApi } from "@/shared/api/admin.api";
import type { OauthClientSchema } from "@/features/schemas/oauth2-client.schema";
import type { OAuthClientStatus } from "../api/dto/response";

export class AdminService {

  static async createOAuthClient(data: OauthClientSchema) {
    const body = {
      ...data,
      redirectUris: data.redirectUris.map(v => v.uri)
    };

    return AdminApi.createOAuthClient(body);
  }

  static async editOAuthClient(id: string, data: OauthClientSchema) {
    const body = {
      id: id,
      ...data,
      redirectUris: data.redirectUris.map(v => v.uri)
    };

    return AdminApi.editOAuthClient(body);
  }

  static async listOAuthClients() {
    return AdminApi.listOAuthClient();
  }

  static async getOAuthClient(id: string) {
    return await AdminApi.getOAuthClient(id);
  }

  static async changeStatusOAuthClient(id: string, status: OAuthClientStatus) {
    return await AdminApi.changeStatusOAuthClient({
      id: id,
      status: status
    })
  }

  static async deleteOAuthClient(id: string) {
    return await AdminApi.deleteOAuthClient(id);
  }
}