export interface UserInfo {
  id: number;
  email: string;
  enabled: boolean;
  externalId: string;
  provider: string;
  role: string;
}