import { oauthConsentSchema, type OAuthConsentSchema } from "@/features/schemas/oauth2-consent.schema";
import type { ErrorResponse, OAuthClient } from "@/shared/api/dto/response";
import { AppError } from "@/shared/api/utils/app-error";
import { applyApiErrorToToast } from "@/shared/api/utils/apply-errors-toast";
import { ErrorUtils } from "@/shared/api/utils/error-utils";
import { OAuthClientService } from "@/shared/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

export function useConsentForm(failInitForm: (error: ErrorResponse) => void) {
  const [searchParams] = useSearchParams();
  const scopes = searchParams.get("scope")?.split(" ") ?? [];
  const oauthClientId = searchParams.get("client_id") ?? '';
  const state = searchParams.get("state") ?? '';

  const [oauthClient, setOAuthClient] = useState<OAuthClient | null>(null);
  const form = useForm<OAuthConsentSchema>({
    resolver: zodResolver(oauthConsentSchema),
    defaultValues: {
      clientId: oauthClientId,
      state: state,
      scopes: scopes
    },
  });
  
  useEffect(() => {
    async function init() {
      try {
        if (!oauthClientId) {
          throw new AppError("oauth_client_not_found");
        }
        const response = await OAuthClientService.searchOAuthClient(oauthClientId);
        setOAuthClient(response.data);
      } catch(err) {
        failInitForm(await ErrorUtils.getErrorResponse(err));
      }
    }
    
    init();
  }, [oauthClientId]);

  return {form, oauthClient, scopes};
}