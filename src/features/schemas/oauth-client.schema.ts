import { z } from "zod";
import { tError } from "@/shared/i18n";

export const oauthClientSchema = z.object({
  clientName: z
    .string()
    .nonempty({error: tError("clientName.empty")})
    .min(6, {error: tError("clientName.min")})
    .max(100, {error: tError("clientName.max")})
    .regex(/^[a-zA-z0-9- ]+$/, {error: tError("clientName.regex")}),

  authorizationGrantTypes: z
    .array(z.string())
    .min(1, {error: tError("authorizationGrantTypes.min")}),

  clientAuthenticationMethods: z
    .array(z.string())
    .min(1, {error: tError("clientAuthenticationMethods.min")}),

  redirectUris: z
    .array(z.object({
      uri: z.url({error: tError("redirectUris.invalid")})
    }))
    .min(1, {error: tError("redirectUris.min")}),

  scopes: z
    .array(z.string())
    .min(1, {error: tError("scopes.min")}),

  clientSettings: z.object({
    requireAuthorizationConsent: z.boolean(),
    requireProofKey: z.boolean(),
    jwkSetUrl: z
      .string()
      .nonempty({error: tError("jwkSetUrl.empty")})
      .url({error: tError("jwkSetUrl.invalid")}),
    oidcLogoutRedirectUri: z
      .string()
      .nonempty({error: tError("jwkSetUrl.empty")})
      .url({error: tError("oidcLogoutRedirectUri.empty")}),
    tokenEndpointAuthenticationSigningAlgorithm: z
      .string()
  }),

  tokenSettings: z.object({
    authorizationCodeTimeToLive: z
      .number({error: tError("authorizationCodeTimeToLive.empty")})
      .optional(),
    accessTokenTimeToLive: z
      .number({error: tError("accessTokenTimeToLive.empty")})
      .min(5, {error: tError("accessTokenTimeToLive.min")}),
    refreshTokenTimeToLive: z
      .number()
      .optional(),
    reuseRefreshTokens: z.boolean(),
  }),

  avatarId: z
    .string()
    .uuid()
    .optional()
    .nullable(),
}).superRefine((data, ctx) => {
  if (data.authorizationGrantTypes.includes("REFRESH_TOKEN")) {
    if (!data.tokenSettings.refreshTokenTimeToLive) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: tError("refreshTokenTimeToLive.empty"),
        path: ["tokenSettings", "refreshTokenTimeToLive"]
      });
    } else if (data.tokenSettings.refreshTokenTimeToLive && data.tokenSettings.refreshTokenTimeToLive < 300) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: tError("refreshTokenTimeToLive.min"),
        path: ["tokenSettings", "refreshTokenTimeToLive"]
      });
    }
  }

  if (data.authorizationGrantTypes.includes("AUTHORIZATION_CODE")) {
    if (!data.tokenSettings.authorizationCodeTimeToLive) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: tError("authorizationCodeTimeToLive.empty"),
        path: ["tokenSettings", "authorizationCodeTimeToLive"]
      });
    } else if (data.tokenSettings.authorizationCodeTimeToLive && data.tokenSettings.authorizationCodeTimeToLive < 300) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: tError("authorizationCodeTimeToLive.min"),
        path: ["tokenSettings", "authorizationCodeTimeToLive"]
      });
    }
  }

  if (data.clientAuthenticationMethods.includes("NONE")) {
    if (!data.clientSettings.requireProofKey) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: tError("requireProofKey.requred"),
        path: ["clientSettings", "requireProofKey"]
      });
    }
  }

});

export type OauthClientSchema = z.infer<typeof oauthClientSchema>;