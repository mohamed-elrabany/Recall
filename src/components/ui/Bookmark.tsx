import type { BookMark } from "../../types/bookmark";
import { HiOutlineExternalLink } from "react-icons/hi";
import { MdFavorite, MdOutlineCalendarToday } from "react-icons/md";

import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function Bookmark({ bookmark }: { bookmark: BookMark }) {
  const navigate = useNavigate();
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
              src={bookmark?.snippet}
              alt="snippet icon"
            />
          </span>

          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-150 truncate">
              {bookmark?.title}
            </p>

            <p className="text-[10px] text-muted-foreground flex items-center gap-1 min-w-0">
              <span className="truncate">{bookmark?.url}</span>

              <HiOutlineExternalLink className="text-[10px] shrink-0" />
            </p>
          </div>
        </div>

        {bookmark?.isFavorite && (
          <MdFavorite className="text-primary w-4 h-4 shrink-0" />
        )}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3">
        {bookmark?.description}
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
          {bookmark?.createdAt?.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    </motion.div>
  );
}
