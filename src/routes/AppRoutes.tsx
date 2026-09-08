import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./RootLayout";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

// Lazy-loaded pages
const LandingPage = lazy(() => import("../pages/Landing"));
const LoginPage = lazy(() => import("../pages/Login"));
const RegisterPage = lazy(() => import("../pages/Register"));
const DashboardPage = lazy(() => import("../pages/Dashboard"));
const FavoritesPage = lazy(() => import("../pages/Favorites"));
const TagsPage = lazy(() => import("../pages/Tags"));
const SettingsPage = lazy(() => import("../pages/Settings"));
const AddBookmarkPage = lazy(() => import("../pages/AddBookmark"));
const BookmarkDetailsPage = lazy(() => import("../pages/BookmarkDetails"));
const EditBookmarkPage = lazy(() => import("../pages/EditBookmark"));

const lazyLoad = (Component: React.ComponentType) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <PublicRoutes />, // auth guard: kick out logged-in users
    children: [
      {
        element: <RootLayout />, // visual shell: navbar/footer or backnav
        children: [
          { index: true, element: lazyLoad(LandingPage) },
          { path: "login", element: lazyLoad(LoginPage) },
          { path: "register", element: lazyLoad(RegisterPage) },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      { path: "dashboard", element: lazyLoad(DashboardPage) },
      { path: "favorites", element: lazyLoad(FavoritesPage) },
      { path: "tags", element: lazyLoad(TagsPage) },
      { path: "settings", element: lazyLoad(SettingsPage) },
      {
        path: "bookmarks",
        children: [
          { path: "add", element: lazyLoad(AddBookmarkPage) },
          { path: "edit/:id", element: lazyLoad(EditBookmarkPage) },
          { path: ":id", element: lazyLoad(BookmarkDetailsPage) }
        ],
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
