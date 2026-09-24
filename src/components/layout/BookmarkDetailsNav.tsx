import BackNav from "./BackNav";
import LinkButton from "../ui/LinkButton";
import DeleteBookmark from "../modals/DeleteBookmark";
import { useState } from "react";
import { useNavigate } from "react-router";
import { selectBookmarkById } from "../../store/selectors/bookmarkSelectors";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  deleteBookmark,
  toggleBookmarkFavorite,
} from "../../services/bookmarkServices";
import { bookmarkActions } from "../../store/slices/bookmarkSlice";

import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";

export default function BookmarkDetailsNav({
  id = undefined,
}: {
  id: string | undefined;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const bookmark = useAppSelector((state) =>
    id ? selectBookmarkById(state, id) : undefined,
  );

  async function handleDeleteBookmark(id: string) {
    if (!id) return;

    setIsDeleting(true);

    try {
      await deleteBookmark(id);

      dispatch(bookmarkActions.removeBookmark(id));

      setIsDeleteModalOpen(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleToggleFavorite(id: string) {
    if (!bookmark) return;
    dispatch(bookmarkActions.toggleFavorite(id));
    try {
      await toggleBookmarkFavorite(id, !bookmark.is_favorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      dispatch(bookmarkActions.toggleFavorite(id));
    }
  }

  return (
    <>
      <BackNav>
        <div className="flex items-center gap-2">
          <LinkButton
            key={id}
            target="_blank"
            rel="noopener noreferrer"
            to={bookmark?.url || "#"}
            variant="secondary"
            className="flex items-center gap-2 cursor-alias"
          >
            <HiOutlineExternalLink className="w-5 h-5" />
            <p className="hidden md:block">Open Link</p>
          </LinkButton>
          <button
            onClick={() => handleToggleFavorite(bookmark?.id!)}
            className="flex items-center p-2 rounded-md bg-muted-foreground/10 text-muted-foreground hover:text-primary cursor-pointer"
          >
            {bookmark?.is_favorite ? (
              <MdFavorite className="w-4 h-4 text-primary" />
            ) : (
              <MdFavoriteBorder className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => navigate(`/bookmarks/edit/${bookmark?.id}`)}
            className="flex items-center p-2 rounded-md bg-muted-foreground/10 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <FiEdit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center p-2 rounded-md bg-muted-foreground/10 text-muted-foreground hover:text-red-500 cursor-pointer"
          >
            <RiDeleteBin6Line className="w-4 h-4" />
          </button>
        </div>
      </BackNav>
      <DeleteBookmark
        bookmark={bookmark!}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleting={isDeleting}
        onDelete={() => handleDeleteBookmark(bookmark?.id!)}
      />
    </>
  );
}
