import type { OAuthAuthorizationGrantType, OAuthClientAuthenticationMethod, OAuthScope } from "@/shared/api/dto/response";
import type { CheckboxOption } from "@/shared/components/CheckboxGroupField/CheckboxGroupField";
import type { RadioGroupOption } from "@/shared/components/RadioGroupField";
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

export function authorizationCodeTimeToLives(t: TFunction): RadioGroupOption[] {
  const valueSeconds = [300, 900, 1800];
  return valueSeconds.map((seconds) => {
    return {
      value: seconds,
      label: t(`fields.tokenSettings.authorizationCodeTimeToLive.${seconds}_seconds`, {
        defaultValue: t("fields.tokenSettings.authorizationCodeTimeToLive.value_seconds", {seconds: seconds})
      })
    };
  });
} 

export function accessTokenTimeToLives(t: TFunction): RadioGroupOption[] {
  const valueSeconds = [300, 900, 1800, 3600, 21600];
  return valueSeconds.map((seconds) => {
    return {
      value: seconds,
      label: t(`fields.tokenSettings.accessTokenTimeToLive.${seconds}_seconds`, {
        defaultValue: t("fields.tokenSettings.accessTokenTimeToLive.value_seconds", {seconds: seconds})
      })
    };
  });
} 

export function refreshTokenTimeToLives(t: TFunction): RadioGroupOption[] {
  const valueSeconds = [3600, 86400, 604800, 1209600, 2592000, 7776000];
  return valueSeconds.map((seconds) => {
    return {
      value: seconds,
      label: t(`fields.tokenSettings.refreshTokenTimeToLive.${seconds}_seconds`, {
        defaultValue: t("fields.tokenSettings.refreshTokenTimeToLive.value_seconds", {seconds: seconds})
      })
    };
  });
}