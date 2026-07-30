import { AdminApi } from "@/shared/api/admin.api";
import type { OauthClientSchema } from "@/features/schemas/oauth2-client.schema";

export class AdminService {

  static async createOAuthClient(data: OauthClientSchema) {
    const body = {
      ...data,
      "redirectUris": data.redirectUris.map(v => v.uri)
    };

    return AdminApi.createOAuthClient(body);
  }


  static async list() {
    return AdminApi.listOAuthClient();
  }
}