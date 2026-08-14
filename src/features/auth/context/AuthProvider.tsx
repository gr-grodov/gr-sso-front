import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService } from "@/shared/service/auth.service";
import type { UserInfo } from "@/shared/api/dto/user-info";
import { AuthContext } from "@/features/auth";

export function AuthProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);

  const refresh = useCallback(async () => {
    try {
      const response = await AuthService.userInfo();
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect refresh");
    refresh();
  }, [refresh]);

  const login = useCallback(async () => {
    await refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(() => ({
    loading,
    authenticated: user !== null,
    user,

    refresh,
    login,
    logout,
  }), [loading, user, refresh, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}