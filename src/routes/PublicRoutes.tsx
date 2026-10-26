import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store/hooks";
import LoadingPage from "../pages/LoadingPage";

export default function PublicRoutes() {

  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}