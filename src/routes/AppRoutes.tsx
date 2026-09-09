import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./RootLayout";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, lazy: () => import("../pages/Landing"), handle: { chrome: "landing" } },
          { path: "login", lazy: () => import("../pages/Login"), handle: { chrome: "auth" } },
          { path: "register", lazy: () => import("../pages/Register"), handle: { chrome: "auth" } },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      { path: "dashboard", lazy: () => import("../pages/Dashboard"), handle: { topbar: "default" } },
      { path: "favorites", lazy: () => import("../pages/Favorites"), handle: { topbar: "default" } },
      { path: "tags", lazy: () => import("../pages/Tags"), handle: { topbar: "default" } },
      { path: "settings", lazy: () => import("../pages/Settings"), handle: { topbar: "back", title: "Settings" } },
      {
        path: "bookmarks",
        children: [
          { path: "add", lazy: () => import("../pages/AddBookmark"), handle: { topbar: "none" } },
          { path: "edit/:id", lazy: () => import("../pages/EditBookmark"), handle: { topbar: "none" } },
          { path: ":id", lazy: () => import("../pages/BookmarkDetails"), handle: { topbar: "back", title: "Bookmark Details" } },
        ],
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}