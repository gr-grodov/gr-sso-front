import type { OAuthAuthorizationGrantType, OAuthClientAuthenticationMethod, OAuthScope } from "@/shared/api/dto/response";
import type { CheckboxOption } from "@/shared/components/CheckboxGroupField/CheckboxGroupField";
import type { ToggleOption } from "@/shared/components/ToggleGroupField/ToggleGroupField";
import type { TFunction } from "i18next";

export function authorizationGrantTypes(types: OAuthAuthorizationGrantType[], t: TFunction): CheckboxOption[] {
  return types.map(type => {
    return {
      value: type,
      label: t(`fields.authorizationGrantTypes.${type}.label`),
      description: t(`fields.authorizationGrantTypes.${type}.description`)
    }
  })
}

export function clientAuthenticationMethods(methods: OAuthClientAuthenticationMethod[], t: TFunction): CheckboxOption[] {
  return methods.map(method => {
    return {
      value: method,
      label: t(`fields.clientAuthenticationMethods.${method}.label`),
      description: t(`fields.clientAuthenticationMethods.${method}.description`)
    }
  })
}

export function scopeTypes(scopes: OAuthScope[], t: TFunction): ToggleOption[] {
  return scopes.filter(scope => scope != 'OPEN_ID').map(scope => {
    return {
      value: scope,
      label: t(`fields.scopes.${scope}`, {defaultValue: scope})
    }
  });
}