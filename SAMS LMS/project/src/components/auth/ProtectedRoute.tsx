import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { canAccessRoute, getDashboardRoute } from '../../utils/rbac';
import type { UserRole } from '../../utils/rbac';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has permission to access the route
  if (!canAccessRoute(user, location.pathname)) {
    // Redirect to user's default dashboard if they don't have access
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  // Check if user's role is allowed for this route
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return <>{children}</>;
}