import { Navigate, Outlet, useLocation } from "react-router";
import { useEffect } from "react";

import Topbar from "../components/layout/Topbar";
import Sidebar from "../components/layout/Sidebar";
import BottomNav from "../components/layout/BottomNav";
import BackNav from "../components/layout/BackNav";

export default function ProtectedRoutes() {
  const isAuthenticated: boolean = true; // Replace with your authentication logic

  const location = useLocation();
  const isSettingsPage = location.pathname === "/settings";

  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0">
        {isSettingsPage ? <BackNav title="Settings" /> : <Topbar />}
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
