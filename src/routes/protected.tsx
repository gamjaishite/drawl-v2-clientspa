import { useAuth } from "@/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  roles: string[];
}

export const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const protect = () => {
    if (roles.length > 0) {
      if (!auth.isLoggedIn || !auth.user) {
        navigate("/auth/login");
        return;
      }

      if (!roles.includes(auth.user.role)) {
        navigate("/");
        return;
      }
    }
  };

  useEffect(protect, [auth.isLoggedIn, auth.user, navigate, roles]);

  return <Outlet />;
};
