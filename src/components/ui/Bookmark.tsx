import type { BookMark } from "../../types/bookmark";
import { HiOutlineExternalLink } from "react-icons/hi";
import { MdFavorite, MdOutlineCalendarToday } from "react-icons/md";

import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { getBookmarkStatusStyle } from "../../utils/bookmarkStatus";

export default function Bookmark({ bookmark }: { bookmark: BookMark }) {
  const navigate = useNavigate();
  const statusStyle = getBookmarkStatusStyle(bookmark?.status);
  return (
    <motion.div
      onClick={() => navigate(`/bookmarks/${bookmark?.id}`)}
      whileHover={{ y: -2 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        ease: "easeInOut",
        duration: 0.15,
      }}
      className="space-y-2 p-4 rounded-2xl shadow-lg bg-card group cursor-pointer"
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

          {bookmark.status === "failed" && (
            <button
              type="button"
              className="cursor-pointer text-primary transition-all duration-150 ease-in-out hover:underline"
            >
              Retry
            </button>
          )}

          {bookmark.status === "manual" && (
            <button
              type="button"
              className="cursor-pointer text-primary transition-all duration-150 ease-in-out hover:underline"
            >
              Complete
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
