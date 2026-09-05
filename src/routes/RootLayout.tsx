import { Outlet, useLocation, useNavigate } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackNav from "../components/layout/BackNav";


export default function RootLayout() {
  const location = useLocation();
  const isLandingPage: boolean = location.pathname === "/";


  return (
    <>
      {isLandingPage ? (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Outlet />
          </div>
          <Footer />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <BackNav />
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
