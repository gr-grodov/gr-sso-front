import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type OauthClientSchema, oauthClientSchema } from "@/features/schemas/oauth2-client.schema";
import { AdminService } from "@/shared/service";
import { ErrorUtils } from "@/shared/api/utils/error-utils";
import { applyApiErrorsToForm } from "@/shared/api/utils/apply-errors-form";
import { applyApiErrorToToast } from "@/shared/api/utils/apply-errors-toast";
import { createEmptyOAuthClient, toOAuthClientForm } from "../widgets/OAuthClientForm.mapper";
import type { OAuthClientSecretInfoResponse } from "@/shared/api/dto/response";



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

  const form = useForm<OauthClientSchema>({
    resolver: zodResolver(oauthClientSchema),

    defaultValues: async () => {
      if (!id) {
        return createEmptyOAuthClient();
      }

      try {
        const response = await AdminService.getOAuthClient(id);

        return toOAuthClientForm(response.data);
      } catch (err) {
        const error = await ErrorUtils.getErrorResponse(err);
        applyApiErrorToToast(error);

        return createEmptyOAuthClient();
      }
    },
  });


  async function submit(data: OauthClientSchema) {
    setErrorMessage("");

    try {
      if (id) {
        await AdminService.editOAuthClient(id, data);

        onSuccess({ type: "updated" });
        return;
      }

      const response = await AdminService.createOAuthClient(data);
      onSuccess({ type: "created", credentials: response.data });
    } catch (err) {
      const error = await ErrorUtils.getErrorResponse(err);

      applyApiErrorsToForm(
        error,
        form.setError,
        setErrorMessage,
      );
    }
  }


  return {
    form,
    errorMessage,
    submit,
  };
}