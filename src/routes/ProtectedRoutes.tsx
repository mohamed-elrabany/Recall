import { Navigate, Outlet, Routes, Route, useLocation, useMatches } from "react-router";
import { useEffect } from "react";
import type { Location } from "react-router";
import lazyPage from "../utils/lazyPage";

import Topbar from "../components/layout/Topbar";
import Sidebar from "../components/layout/Sidebar";
import BottomNav from "../components/layout/BottomNav";
import BackNav from "../components/layout/BackNav";

const DashboardPage = lazyPage(() => import("../pages/Dashboard"));
const FavoritesPage = lazyPage(() => import("../pages/Favorites"));
const TagsPage = lazyPage(() => import("../pages/Tags"));
const SettingsPage = lazyPage(() => import("../pages/Settings"));
const BookmarkDetailsPage = lazyPage(() => import("../pages/BookmarkDetails"));

export default function ProtectedRoutes() {
  const isAuthenticated: boolean = true;
  const location = useLocation();
  const backgroundLocation = (location.state as { backgroundLocation?: Location })
    ?.backgroundLocation;

  const matches = useMatches();
  const current = matches[matches.length - 1];
  const handle = current.handle as { topbar?: "default" | "back" | "none"; title?: string };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0">
        {handle?.topbar === "back" ? <BackNav title={handle.title} /> : <Topbar />}

        {backgroundLocation ? (
          <Routes location={backgroundLocation}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="tags" element={<TagsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="bookmarks/:id" element={<BookmarkDetailsPage />} />
          </Routes>
        ) : (
          <Outlet />
        )}
      </main>
      <BottomNav />

      {backgroundLocation && <Outlet />}
    </div>
  );
}