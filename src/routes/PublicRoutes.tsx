// PublicRoutes.tsx
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store/hooks";

export default function PublicRoutes() {

  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}