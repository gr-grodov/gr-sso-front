import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth";

export interface RoleGuardProps {
  roles: string[]
}

export function RoleGuard({
  roles,
}: RoleGuardProps) {

    const { user } = useAuth();
    console.log(user);
    console.log(roles);
    
    

    if (!roles.includes((user?.role ?? ''))) {
      return <Navigate to="/403" replace />;
    }

    return <Outlet />;
}