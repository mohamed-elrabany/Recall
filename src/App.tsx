import "./App.css";

import AppRoutes from "./routes/AppRoutes";

import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import { useBookmarks } from "./hooks/useBookmark";


function App() {
  useAuth();
  useTheme();
  useBookmarks();

  return <AppRoutes />;
}

export default App;
