import { tError } from "@/shared/i18n";
import { z } from "zod";

export const oauthConsentSchema = z.object({
    clientId: z.string(),
    state: z.string(),
    scopes: z.array(z.string())
  });

export type OAuthConsentSchema = z.infer<typeof oauthConsentSchema>;
