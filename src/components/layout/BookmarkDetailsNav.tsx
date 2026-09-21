import BackNav from "./BackNav";
import LinkButton from "../ui/LinkButton";
import { useNavigate } from "react-router";
import { selectBookmarkById } from "../../store/selectors/bookmarkSelectors";
import { useAppSelector } from "../../store/hooks";


import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";

export default function BookmarkDetailsNav({
  id= null
}: {
  id: string | null;
}) {
    const navigate = useNavigate();
    const bookmark = useAppSelector((state) =>
    id ? selectBookmarkById(state, id) : undefined,
  );
   
  return (
    <BackNav>
      <div className="flex items-center gap-2">
        <LinkButton
          key={id}
          target="_blank"
          rel="noopener noreferrer"
          to={ bookmark?.url || "#"}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <HiOutlineExternalLink className="w-5 h-5" />
          <p className="hidden md:block">Open Link</p>
        </LinkButton>
        <button className="flex items-center p-2 rounded-md bg-muted-foreground/10 text-muted-foreground hover:text-primary">
          {bookmark?.is_favorite ? (
            <MdFavorite className="w-4 h-4 text-primary" />
          ) : (
            <MdFavoriteBorder className="w-4 h-4" />
            )}
        </button>
        <button 
        onClick={() => navigate(`/bookmarks/edit/${bookmark?.id}`)}
        className="flex items-center p-2 rounded-md bg-muted-foreground/10 text-muted-foreground hover:text-foreground">
          <FiEdit3 className="w-4 h-4" />
        </button>
        <button className="flex items-center p-2 rounded-md bg-muted-foreground/10 text-muted-foreground hover:text-red-500">
          <RiDeleteBin6Line className="w-4 h-4" />
        </button>
      </div>
    </BackNav>
  );
}
