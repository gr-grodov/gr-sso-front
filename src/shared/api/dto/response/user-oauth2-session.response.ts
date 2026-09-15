export interface UsersOAuth2SessionResponse {
  users: UserOAuth2Session[],
  countUsers: number,
  totalPage: number
}

export interface UserOAuth2Session {
  userId: string;
  userEmail: string;
  userAvatarId: string;
  clients: OAuth2ClientSession[]
}

export interface OAuth2ClientSession {
  clientId: string;
  clientName: string;
  clientAvatarId: string;
  countSessions: number;
}