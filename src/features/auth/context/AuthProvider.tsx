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
import { ConfigApi } from "@/shared/api/config.api";
import { UserInfoService } from "@/shared/service/user-info.service";

export function AuthProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);

  const refreshCSRF = useCallback(async () => {
    try {
      await ConfigApi.csrf();
    } catch {}
  }, [])


  const refresh = useCallback(async () => {
    try {
      const response = await UserInfoService.userInfo();
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);


  const login = useCallback(async () => {
    await refresh();
    refreshCSRF();
  }, [refresh, refreshCSRF]);


  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
    } finally {
      setUser(null);
      refreshCSRF();
    }
  }, [refreshCSRF]);


  useEffect(() => {
    refresh();
    refreshCSRF();
  }, [refresh, refreshCSRF]);


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