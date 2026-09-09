import { Outlet, useMatches } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackNav from "../components/layout/BackNav";

export default function RootLayout() {
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const handle = current?.handle as { chrome?: "landing" | "auth" } | undefined;

  const isLanding = handle?.chrome === "landing";

  return (
    <div className="flex flex-col min-h-screen">
      {isLanding ? <Navbar /> : <BackNav />}
      <div className="flex-grow">
        <Outlet />
      </div>
      {isLanding && <Footer />}
    </div>
  );
}