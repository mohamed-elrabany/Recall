import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./RootLayout";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    HydrateFallback: LoadingPage,
    ErrorBoundary: ErrorPage,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          {
            element: <RootLayout />,
            children: [
              {
                index: true,
                lazy: () => import("../pages/Landing"),
                handle: {
                  chrome: "landing",
                  documentTitle: "Recall — Save Links, Find Them by Meaning",
                },
              },
              {
                path: "login",
                lazy: () => import("../pages/Login"),
                handle: { chrome: "auth", documentTitle: "Log in — Recall" },
              },
              {
                path: "register",
                lazy: () => import("../pages/Register"),
                handle: {
                  chrome: "auth",
                  documentTitle: "Create account — Recall",
                },
              },
              {
                path: "verify-email",
                lazy: () => import("../pages/VerifyEmail"),
                handle: {
                  chrome: "auth",
                  documentTitle: "Verify your email — Recall",
                },
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "dashboard",
            lazy: () => import("../pages/Dashboard"),
            handle: { topbar: "default", documentTitle: "Dashboard — Recall" },
          },
          {
            path: "favorites",
            lazy: () => import("../pages/Favorites"),
            handle: { topbar: "default", documentTitle: "Favorites — Recall" },
          },
          {
            path: "tags",
            lazy: () => import("../pages/Tags"),
            handle: { topbar: "default", documentTitle: "Tags — Recall" },
          },
          {
            path: "settings",
            lazy: () => import("../pages/Settings"),
            handle: {
              topbar: "back",
              title: "Settings",
              documentTitle: "Settings — Recall",
            },
          },
          {
            path: "bookmarks",
            children: [
              {
                path: "add",
                lazy: () => import("../pages/AddBookmark"),
                handle: {
                  topbar: "none",
                  documentTitle: "Add Bookmark — Recall",
                },
              },
              {
                path: "edit/:bookmarkId",
                lazy: () => import("../pages/EditBookmark"),
                handle: {
                  topbar: "none",
                  documentTitle: "Edit Bookmark — Recall",
                },
              },
              {
                path: ":bookmarkId",
                lazy: () => import("../pages/BookmarkDetails"),
                handle: {
                  topbar: "bookmark",
                  documentTitle: "Bookmark Details — Recall",
                },
              },
            ],
          },
        ],
      },
      {
        path: "*",
        Component: ErrorPage,
        handle: { documentTitle: "Page not found — Recall" },
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
