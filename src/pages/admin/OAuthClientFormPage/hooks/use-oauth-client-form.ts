import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type OauthClientSchema, oauthClientSchema } from "@/features/schemas/oauth-client.schema";
import { OAuthClientService } from "@/shared/service/oauth-client.service";
import { ErrorUtils } from "@/shared/api/utils/error-utils";
import { applyApiErrorsToForm } from "@/shared/api/utils/apply-errors-form";
import { createEmptyOAuthClient, toOAuthClientForm } from "../widgets/OAuthClientForm.mapper";
import { type OAuthClientAuthenticationMethod, type OAuthAuthorizationGrantType, type OAuthClientSecretInfoResponse, type OAuthScope } from "@/shared/api/dto/response";



export type OAuthClientFormSuccess = | {
  type: "created";
  credentials: OAuthClientSecretInfoResponse;
} | {
  type: "updated";
};


export function useOAuthClientForm(
  id: string | undefined,
  onSuccess: (result: OAuthClientFormSuccess) => void,
) {
  const [errorMessage, setErrorMessage] = useState("");
  const [scopes, setScopes] = useState<OAuthScope[]>([]);
  const [grantTypes, setGrantTypes] = useState<OAuthAuthorizationGrantType[]>([]);
  const [authMethods, setAuthMethods] = useState<OAuthClientAuthenticationMethod[]>([]);


  useEffect(() => {
    async function init() {
      try {
        const [scopes, grantTypes, authMethods] = await Promise.all([
          OAuthClientService.listScopes(),
          OAuthClientService.listGrantTypes(),
          OAuthClientService.listAuthMethods()
        ]);

        setScopes(scopes.data);
        setGrantTypes(grantTypes.data);
        setAuthMethods(authMethods.data);
      } catch (err) {
        console.log(err);
        
        const error = await ErrorUtils.getErrorResponse(err);
        applyApiErrorsToForm(error, form.setError, setErrorMessage);
      }
    }

    init();
  }, [])


  const form = useForm<OauthClientSchema>({
    resolver: zodResolver(oauthClientSchema),

    defaultValues: async () => {
      try {
        const response = await OAuthClientService.getOAuthClient(id);

        return toOAuthClientForm(response.data);
      } catch (err) {
        const error = await ErrorUtils.getErrorResponse(err);
        applyApiErrorsToForm(error, form.setError, setErrorMessage);

        return createEmptyOAuthClient();
      }
    },
  });


  async function submit(data: OauthClientSchema) {
    setErrorMessage("");

    try {
      if (id) {
        await OAuthClientService.editOAuthClient(id, data);

        onSuccess({ type: "updated" });
        return;
      }

      const response = await OAuthClientService.createOAuthClient(data);
      onSuccess({ type: "created", credentials: response.data });
    } catch (err) {
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrorsToForm(error, form.setError, setErrorMessage);
    }
  }


  return {
    form,
    scopes,
    grantTypes,
    authMethods,
    errorMessage,
    submit,
  };
}