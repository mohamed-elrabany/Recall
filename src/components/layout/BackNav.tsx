import { IoIosArrowRoundBack } from "react-icons/io";
import { FaBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router";

export default function BackNav() {
  const navigate = useNavigate();

  function handleNavigation() {
    navigate(-1);
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

      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center bg-primary rounded-lg p-2">
          <FaBookmark className="w-4 h-4 text-white" />
        </div>

        <span className="text-foreground font-bold text-xl">
          Recall
        </span>
      </div>
    </header>
  );
}