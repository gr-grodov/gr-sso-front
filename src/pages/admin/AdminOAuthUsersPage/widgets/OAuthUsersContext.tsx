import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";

interface OAuthUsersActionsContextValue {
  deleteClientSessions: (userId: string, clientId: string) => void;
  refresh: () => void;
}

const OAuthUsersActionsContext = createContext<OAuthUsersActionsContextValue | null>(null);

export function OAuthUsersActionsProvider({
  deleteClientSessions,
  refresh,
  children,
}: PropsWithChildren<OAuthUsersActionsContextValue>) {

  const value = useMemo(() => ({
    deleteClientSessions,
    refresh
  }), [deleteClientSessions, refresh]);


  return (
    <OAuthUsersActionsContext.Provider value={value}>
      {children}
    </OAuthUsersActionsContext.Provider>
  );
}

export function useOAuthUsersActions() {
  const context = useContext(OAuthUsersActionsContext);

  if (!context) {
    throw new Error(
      "useOAuthUsersActions must be used within OAuthUsersActionsProvider"
    );
  }

  return context;
}