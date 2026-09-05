import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";

import Logo from "../ui/Logo";

export default function BackNav() {
  const navigate = useNavigate();

  function handleNavigation(){
    if(navigate.length > 0){
      navigate(-1);
    }else{
      navigate("/");
    }
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 flex-shrink-0 bg-background/90 border-b border-border/60 backdrop-blur-md">
      <button
        onClick={handleNavigation}
        className="flex items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
      >
        <IoIosArrowRoundBack className="mr-2 w-6 h-6" />
        <span>Back</span>
      </button>

      <Logo />
    </header>
  );
}