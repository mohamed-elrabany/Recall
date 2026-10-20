import "./App.css";

import AppRoutes from "./routes/AppRoutes";

import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import { useBookmarks } from "./hooks/useBookmark";
import { useTags } from "./hooks/useTags";


function App() {
  useAuth();
  useTheme();
  useBookmarks();
  useTags();

  return <AppRoutes />;
}

export default App;
