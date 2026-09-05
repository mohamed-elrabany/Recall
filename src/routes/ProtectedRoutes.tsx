import { Navigate, Outlet, useLocation } from "react-router";
import { useEffect } from "react";

import Sidebar from "../components/layout/Sidebar";
import BottomNav from "../components/layout/BottomNav";

export default function ProtectedRoutes() {
  const isAuthenticated: boolean = true; // Replace with your authentication logic

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF] dark:from-[#0A0E27] dark:via-[#161A41] dark:to-[#1F1A5F]">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
