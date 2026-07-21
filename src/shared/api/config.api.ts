import { api } from "./config/api";

export class ConfigApi {
  static csrf() {
    return api.get("/api/config/csrf")
  }
}