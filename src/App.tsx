import "./App.css";

import AppRoutes from "./routes/AppRoutes";

import { useAuthInit } from "./hooks/useAuthInit";
import { useTheme } from "./hooks/useTheme";
import { useBookmarks } from "./hooks/useBookmark";
import { useTags } from "./hooks/useTags";


function App() {
  useAuthInit();
  useTheme();
  useBookmarks();
  useTags();

  return <AppRoutes />;
}

export default App;
