import "./App.css";

import AppRoutes from "./routes/AppRoutes";

import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";


function App() {
  useAuth();
  useTheme();

  return <AppRoutes />;
}

export default App;
