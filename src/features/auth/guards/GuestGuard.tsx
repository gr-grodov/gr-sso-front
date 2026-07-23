import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth";

export function GuestGuard() {
    const { loading, authenticated } = useAuth();

    if (loading)
      return null;

    if (authenticated)
      return <Navigate to="/" replace />;

    return <Outlet />;
}