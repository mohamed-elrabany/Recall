import { IoIosArrowRoundBack } from "react-icons/io";
// import { FiEdit3 } from "react-icons/fi";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
// import { HiOutlineExternalLink } from "react-icons/hi";

import { useNavigate } from "react-router";

import Logo from "../ui/Logo";
// import Button from "../ui/Button";
// import LinkButton from "../ui/LinkButton";

export default function BackNav({ title= null }: { title?: string | null; }) {
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

      {/* {!title ? <Logo /> : (
        <div className="flex items-center gap-2">
          <LinkButton to={details ? `/bookmarks/${details}` : "/"} variant="secondary" className="flex items-center gap-2">
            <HiOutlineExternalLink className="w-5 h-5" />
            Open Link
          </LinkButton>
          <button className="flex items-center p-2 rounded-md bg-muted-foreground/10 text-muted-foreground hover:text-primary"><MdFavoriteBorder className="w-4 h-4" /></button>
          <button className="flex items-center p-2 rounded-md bg-muted-foreground/10 text-muted-foreground hover:text-foreground"><FiEdit3 className="w-4 h-4" /></button>
          <button className="flex items-center p-2 rounded-md bg-muted-foreground/10 text-muted-foreground hover:text-red-500"><RiDeleteBin6Line className="w-4 h-4" /></button>
        </div>
      )} */}
    </header>
  );
}