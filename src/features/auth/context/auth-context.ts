import type { UserInfo } from "@/shared/api/dto/user-info";
import { createContext } from "react";

export interface AuthContextType {
  loading: boolean;
  authenticated: boolean;
  user: UserInfo | null;

  login: () => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);