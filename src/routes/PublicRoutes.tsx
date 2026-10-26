import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store/hooks";
import { useRouteTitle } from "../hooks/useRouteTitle";
import LoadingPage from "../pages/LoadingPage";

export default function PublicRoutes() {
  useRouteTitle();
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}