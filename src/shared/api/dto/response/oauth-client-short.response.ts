export const OAuthClientStatusVariant = {
  ACTIVE: "ACTIVE",
  DISABLED: "DISABLED",
  ARCHIVED: "ARCHIVED",
} as const;

export type OAuthClientStatus = typeof OAuthClientStatusVariant[keyof typeof OAuthClientStatusVariant];


export interface OAuthClientShort {
  id: string;
  clientId: string;
  clientName: string;
  redirectUris: string[];
  scopes: string[];
  status: OAuthClientStatus;
  createdAt: string;
  updatedAt: string;
}