
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: UserRole | UserRole[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole } = useAuth();

  // 如果用户未认证，重定向到登录页
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // 如果指定了角色要求，检查用户是否有权限
  if (roles && !hasRole(roles)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
