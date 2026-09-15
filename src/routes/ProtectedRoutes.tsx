import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useMatches,
} from "react-router";
import { useEffect } from "react";
import type { Location } from "react-router";

import { useAppSelector } from "../store/hooks";
import lazyPage from "../utils/lazyPage";

import Topbar from "../components/layout/Topbar";
import Sidebar from "../components/layout/Sidebar";
import BottomNav from "../components/layout/BottomNav";
import BackNav from "../components/layout/BackNav";

const DashboardPage = lazyPage(() => import("../pages/Dashboard"));
const FavoritesPage = lazyPage(() => import("../pages/Favorites"));
const TagsPage = lazyPage(() => import("../pages/Tags"));
const SettingsPage = lazyPage(() => import("../pages/Settings"));
const BookmarkDetailsPage = lazyPage(
  () => import("../pages/BookmarkDetails")
);

export default function ProtectedRoutes() {

  const { isLoading, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const location = useLocation();
  const matches = useMatches();

  const backgroundLocation = (
    location.state as { backgroundLocation?: Location }
  )?.backgroundLocation;

  const current = matches[matches.length - 1];

  const handle = current?.handle as
    | {
        topbar?: "default" | "back" | "none";
        title?: string;
      }
    | undefined;


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  useEffect(() => {
    document.body.style.overflow = backgroundLocation
      ? "hidden"
      : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [backgroundLocation]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }


  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 pb-20 md:pb-0">
        {handle?.topbar === "back" ? (
          <BackNav title={handle.title} />
        ) : handle?.topbar === "none" ? null : (
          <Topbar />
        )}

        {/* Normal protected page OR background page behind modal */}
        {backgroundLocation ? (
          <Routes location={backgroundLocation}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="tags" element={<TagsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route
              path="bookmarks/:id"
              element={<BookmarkDetailsPage />}
            />
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