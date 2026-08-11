import type { OAuthClientStatus } from "../response";

export interface OAuthClientChangeStatusRequest {
  id: string,
  status: OAuthClientStatus
}