import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";

import Logo from "../ui/Logo";

export default function BackNav({ title= null }: { title?: string | null }) {
  const navigate = useNavigate();

  function handleNavigation(){
    if(navigate.length > 0){
      navigate(-1);
    }else{
      navigate("/");
    }
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-background/70 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3">
      <button
        onClick={handleNavigation}
        className="flex items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
      >
        <IoIosArrowRoundBack className="mr-2 w-6 h-6" />
        <span>Back</span>
      </button>

      {title && (
        <h4
          style={{ fontFamily: "Manrope, sans-serif" }}
          className="text-lg font-semibold text-foreground"
        >
          {title}
        </h4>
      )}

      <Logo />
    </header>
  );
}