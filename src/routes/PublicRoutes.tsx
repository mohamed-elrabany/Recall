// PublicRoutes.tsx
import { Navigate, Outlet } from "react-router";

export default function PublicRoutes() {
  const isAuthenticated: boolean = false; // Replace with your auth logic

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}