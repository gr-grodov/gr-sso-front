import { OAuthClientApi } from "@/shared/api/oauth-client.api";
import type { OauthClientSchema } from "@/features/schemas/oauth-client.schema";
import type { OAuthClientStatus } from "../api/dto/response";

export class OAuthClientService {

  static async createOAuthClient(data: OauthClientSchema) {
    const body = {
      ...data,
      redirectUris: data.redirectUris.map(v => v.uri)
    };

    return OAuthClientApi.createOAuthClient(body);
  }

  static async editOAuthClient(id: string, data: OauthClientSchema) {
    const body = {
      id: id,
      ...data,
      redirectUris: data.redirectUris.map(v => v.uri)
    };

    return OAuthClientApi.editOAuthClient(body);
  }

  static async listOAuthClients() {
    return OAuthClientApi.listOAuthClient();
  }

  static async getOAuthClient(id: string) {
    return await OAuthClientApi.getOAuthClient(id);
  }

  static async searchOAuthClient(clientId?: string) {
    return await OAuthClientApi.searchOAuthClient(clientId);
  }

  static async changeStatusOAuthClient(id: string, status: OAuthClientStatus) {
    return await OAuthClientApi.changeStatusOAuthClient({
      id: id,
      status: status
    })
  }

  static async deleteOAuthClient(id: string) {
    return await OAuthClientApi.deleteOAuthClient(id);
  }
}