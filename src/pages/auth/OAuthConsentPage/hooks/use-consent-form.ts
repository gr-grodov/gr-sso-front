import { oauthConsentSchema, type OAuthConsentSchema } from "@/features/schemas/oauth2-consent.schema";
import type { ErrorResponse, OAuthClientShort } from "@/shared/api/dto/response";
import { AppError } from "@/shared/api/utils/app-error";
import { ErrorUtils } from "@/shared/api/utils/error-utils";
import { OAuth2FlowService } from "@/shared/service/oauth2-flow.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

export function useConsentForm(failInitForm: (error: ErrorResponse) => void) {
  const [searchParams] = useSearchParams();
  const scopes = searchParams.get("scope")?.split(" ") ?? [];
  const oauthClientId = searchParams.get("client_id") ?? '';
  const state = searchParams.get("state") ?? '';

  const [oauthClient, setOAuthClient] = useState<OAuthClientShort | null>(null);
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
        const response = await OAuth2FlowService.clientInfo(oauthClientId);
        setOAuthClient(response.data);
      } catch(err) {
        failInitForm(await ErrorUtils.getErrorResponse(err));
      }
    }
    
    init();
  }, [oauthClientId]);

  return {form, oauthClient, scopes};
}