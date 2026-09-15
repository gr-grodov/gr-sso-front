export interface UserInfo {
  id: string;
  email: string;
  externalId: string;
  provider: string;
  role: 'ADMIN' | 'USER';
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  avatarId?: string;
}