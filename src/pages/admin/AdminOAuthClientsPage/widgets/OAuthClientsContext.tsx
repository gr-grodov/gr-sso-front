import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";

import type { OAuthClientShort } from "@/shared/api/dto/response";

interface OAuthClientActionsContextValue {
  edit: (client: OAuthClientShort) => void;
  changeStatus: (client: OAuthClientShort) => void;
  remove: (client: OAuthClientShort) => void;
  refresh: () => void;
}

const OAuthClientActionsContext = createContext<OAuthClientActionsContextValue | null>(null);

export function OAuthClientActionsProvider({
  edit,
  changeStatus,
  remove,
  refresh,
  children,
}: PropsWithChildren<OAuthClientActionsContextValue>) {

  const value = useMemo(() => ({
    edit,
    changeStatus,
    remove,
    refresh,
  }), [edit, changeStatus, remove, refresh]);


  return (
    <OAuthClientActionsContext.Provider value={value}>
      {children}
    </OAuthClientActionsContext.Provider>
  );
}

export function useOAuthClientActions() {
  const context = useContext(OAuthClientActionsContext);

  if (!context) {
    throw new Error(
      "useOAuthClients must be used within OAuthClientsProvider"
    );
  }

  return context;
}