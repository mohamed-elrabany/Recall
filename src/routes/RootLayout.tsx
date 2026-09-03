import { Outlet, useLocation, useNavigate } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackNav from "../components/layout/BackNav";

import { IoIosArrowRoundBack } from "react-icons/io";
import { FaBookmark } from "react-icons/fa6";


export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage: boolean = location.pathname === "/";

  function handleNaviagtion(){
    if(navigate.length > 0){
      navigate(-1);
    }else{
      navigate("/");
    }
  }

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
