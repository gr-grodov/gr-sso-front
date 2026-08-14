import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { OAuthClientService } from "@/shared/service";
import {  type OAuthClientShort, type OAuthClientStatus } from "@/shared/api/dto/response";

import { ErrorUtils } from "@/shared/api/utils/error-utils";
import { applyApiErrorToToast } from "@/shared/api/utils/apply-errors-toast";



export function useOAuthClients() {
  const navigate = useNavigate();

  const [clients, setClients] = useState<OAuthClientShort[]>([]);
  const [loading, setLoading] = useState(true);

  const edit = useCallback((client: OAuthClientShort) => {
    navigate(client.id);
  }, [navigate]);



  const updateClient = useCallback((updatedClient: OAuthClientShort) => {
    setClients((clients) =>
      clients.map((client) => client.id === updatedClient.id ? updatedClient : client)
    );
  }, []);

  const changeStatus = useCallback(async (client: OAuthClientShort) => {
    try {
      const status: OAuthClientStatus = client.status === "ACTIVE" ? "DISABLED" : "ACTIVE";
      const response = await OAuthClientService.changeStatusOAuthClient(client.id, status);

      updateClient(response.data);
    } catch (err) {
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrorToToast(error)
    }
  }, [updateClient]);



  const removeClient = useCallback((id: string) => {
    setClients((clients) =>
      clients.filter((client) => client.id !== id)
    );
  }, []);

  const remove = useCallback(async (client: OAuthClientShort) => {
    try {
      await OAuthClientService.deleteOAuthClient(client.id);

      removeClient(client.id);
    } catch (err) {
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrorToToast(error)
    }
  }, [removeClient]);



  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      const response = await OAuthClientService.listOAuthClients();
      setClients(response.data);
    } catch (err) {
      const error = await ErrorUtils.getErrorResponse(err);
        applyApiErrorToToast(error)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);



  return {
    clients,
    loading,
    refresh,
    edit,
    changeStatus,
    remove,
  };
}