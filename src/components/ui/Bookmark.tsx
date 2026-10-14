import type { BookMark } from "../../types/bookmark";
import { HiOutlineExternalLink } from "react-icons/hi";
import { MdFavorite, MdOutlineCalendarToday } from "react-icons/md";

import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/hooks";

import { getBookmarkStatusStyle, canRetry } from "../../utils/bookmarkStatus";
import { retryEmbedding } from "../../services/bookmarkServices";
import { bookmarkActions } from "../../store/slices/bookmarkSlice";

export default function Bookmark({ bookmark }: { bookmark: BookMark }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const statusStyle = getBookmarkStatusStyle(bookmark?.status);

  async function handleRetry(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!bookmark?.id) return;
    try {
      const processing = await retryEmbedding(bookmark.id, (final) =>
        dispatch(bookmarkActions.updateBookmark(final)),
      );
      dispatch(bookmarkActions.updateBookmark(processing)); // banner shows "processing"
    } catch (err) {
      console.error(err); // e.g. already processing
    }
  }

  
  return (
<motion.div
  onClick={() => navigate(`/bookmarks/${bookmark?.id}`)}
  whileHover={{ y: -3 }}
  whileTap={{ scale: 0.99 }}
  transition={{
    type: "tween",
    duration: 0.2,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="space-y-2 p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 bg-card group cursor-pointer"
>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0 flex-1">
          <span className="text-xs bg-muted p-2 rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
            <img
              className="w-full h-full object-cover"
              src={bookmark?.icon}
              alt="snippet icon"
            />
          </span>

          <div className="min-w-0 flex-1">
            <p className={`"font-medium min-w-0 truncate ${bookmark?.title ? "text-foreground" : "text-muted-foreground"} transition-colors duration-150"`}
            style={{ fontFamily: "Manrope, sans-serif" }}>
              {bookmark?.title || bookmark?.url || "Untitled Bookmark"}
            </p>

            <p className="text-[10px] text-muted-foreground flex items-center gap-1 min-w-0">
              <span className="truncate">{bookmark?.url}</span>

              <HiOutlineExternalLink className="text-[10px] shrink-0" />
            </p>
          </div>
        </div>

        {bookmark?.is_favorite && (
          <MdFavorite className="text-primary w-4 h-4 shrink-0" />
        )}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
        {bookmark?.snippet || "No summary yet"}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 flex-wrap">
          {bookmark?.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-primary/10 text-primary px-2 py-1 font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
          <MdOutlineCalendarToday className="w-3 h-3" />
          {bookmark?.created_at &&
            new Date(bookmark.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
        </div>
      </div>
      {bookmark?.status !== "done" && (
        <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-2 text-[10px] font-semibold">
          <div className={`flex items-center gap-1.5 ${statusStyle.color}`}>
            <span
              className={`h-1.5 w-1.5 rounded-full bg-current ${statusStyle.dot}`}
            />

            <p>{statusStyle.label}</p>
          </div>

          {canRetry(bookmark) && (
            <button
              type="button"
              onClick={(e) => handleRetry(e)}
              className="cursor-pointer text-primary transition-all duration-150 ease-in-out hover:underline p-1"
            >
              Retry
            </button>
          )}

          {bookmark.status === "manual" && (
            <button
            onClick={(e)=> {
              e.stopPropagation();
              navigate(`/bookmarks/edit/${bookmark.id}`)
            }}
              type="button"
              className="cursor-pointer text-primary transition-all duration-150 ease-in-out hover:underline p-1"
            >
              Complete
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
