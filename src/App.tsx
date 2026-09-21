import "./App.css";

import AppRoutes from "./routes/AppRoutes";

import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import { useBookmark } from "./hooks/useBookmark";


function App() {
  useAuth();
  useTheme();
  useBookmark();

  return <AppRoutes />;
}

export default App;
