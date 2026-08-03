import type { CheckboxOption } from "@/shared/components/CheckboxGroupField/CheckboxGroupField";
import type { ToggleOption } from "@/shared/components/ToggleGroupField/ToggleGroupField";

export const authorizationGrantTypes: CheckboxOption[] = [
  { value: "AUTHORIZATION_CODE",  label: "Authorization Code" },
  { value: "REFRESH_TOKEN",       label: "Refresh Token" },
  { value: "CLIENT_CREDENTIALS",  label: "Client Credentials" },
  { value: "JWT_BEARER",          label: "JWT Bearer" },
  { value: "DEVICE_CODE",         label: "Device Code" },
  { value: "TOKEN_EXCHANGE",      label: "Token Exchange" }
];

export const scopeTypes: ToggleOption[] = [
  { value: "openid",  label: "OpenID" },
  { value: "email",   label: "Email" },
  { value: "profile", label: "Profile" },
]