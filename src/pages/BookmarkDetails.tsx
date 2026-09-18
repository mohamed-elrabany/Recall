import { bookmarks } from "../types/bookmark";
import Bookmark from "../components/ui/Bookmark";
import Button from "../components/ui/Button";

import { RiGlobalLine } from "react-icons/ri";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FiTag, FiEdit3 } from "react-icons/fi";
import { IoSparkles } from "react-icons/io5";
import { getBookmarkStatusStyle } from "../utils/bookmarkStatus";

export function Component() {
  const bookmark = bookmarks[4];
  const statusStyle = getBookmarkStatusStyle(bookmark?.status);

  if (!bookmark) return null;

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {bookmark?.status !== "done" && (
        <div
          className={`mb-4 text-sm flex items-center justify-between gap-4 rounded-xl p-4 ${statusStyle.bgColor} ${statusStyle.color}`}
        >
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={`h-2 w-2 shrink-0 rounded-full bg-current ${statusStyle.dot}`}
            />

            <p className="min-w-0 flex-1 leading-relaxed line-clamp-2">
              {statusStyle.details}
            </p>
          </div>

          {bookmark.status === "failed" && (
            <button
              type="button"
              className="shrink-0 cursor-pointer text-primary transition-all duration-150 ease-in-out hover:underline"
            >
              Retry
            </button>
          )}

          {bookmark.status === "manual" && (
            <button
              type="button"
              className="shrink-0 cursor-pointer transition-all duration-150 ease-in-out hover:underline"
            >
              Complete
            </button>
          )}
        </div>
      )}

{/* Bookmark Info */}
<div className="pb-6 border-b border-border overflow-hidden">
  <div className="flex items-start gap-3 min-w-0">
    <span className="text-xs bg-muted p-2 rounded-xl w-16 h-16 flex items-center justify-center shrink-0">
      <img
        className="w-full h-full object-cover"
        src={bookmark.icon}
        alt="snippet icon"
      />
    </span>

    {/* IMPORTANT: w-0 allows this flex item to actually shrink */}
    <div className="min-w-0 w-0 flex-1 space-y-2">
      {/* URL + Date */}
      <div className="flex min-w-0 max-w-full items-center gap-x-4 gap-y-2 text-[10px] text-muted-foreground flex-wrap">
        {/* URL */}
        <div className="flex min-w-0 max-w-full flex-1 items-center gap-1 overflow-hidden">
          <RiGlobalLine className="w-3 h-3 shrink-0" />

          <span className="min-w-0 truncate">
            {bookmark.url}
          </span>
        </div>

        {/* Date */}
        <div className="flex shrink-0 items-center gap-1">
          <MdOutlineCalendarToday className="w-3 h-3 shrink-0" />

          <span className="whitespace-nowrap">
            Saved on{" "}
            {bookmark?.created_at &&
              new Date(bookmark.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
          </span>
        </div>
      </div>

      {/* Title */}
      <p
        className={`min-w-0 max-w-full text-xl font-bold ${
          bookmark?.title
            ? "text-foreground break-words"
            : "text-muted-foreground break-all"
        }`}
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {bookmark?.title || bookmark?.url || "Untitled Bookmark"}
      </p>
    </div>
  </div>

  {/* Tags */}
  {bookmark.tags && bookmark.tags.length > 0 && (
    <div className="flex items-center gap-2 flex-wrap mt-4">
      {bookmark.tags.map((tag) => (
        <span
          key={tag}
          className="text-sm bg-primary/10 text-primary px-2 py-1 font-medium rounded-full"
        >
          <FiTag className="w-3 h-3 inline-block mr-1" />
          {tag}
        </span>
      ))}
    </div>
  )}
</div>

      {/* Summary */}
      <div className="py-6 border-b border-border">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
          Auto-Generated Summary
        </h2>

        <p className="text-base text-foreground leading-relaxed">
          {bookmark?.snippet || "No summary available for this bookmark."}
        </p>
      </div>

      {/* Notes */}
      <div className="py-6 border-b border-border">
        {bookmark.notes ? (
          <div>
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
              Your Notes
            </h2>

            <div className="p-4 bg-muted/60 rounded-xl border border-border/50">
              <p className="text-sm text-foreground leading-relaxed">
                {bookmark.notes}
              </p>
            </div>
          </div>
        ) : (
          <Button variant="primary" className="w-full">
            <FiEdit3 size={14} />
            Add a note to this save
          </Button>
        )}
      </div>

      {/* Related Bookmarks */}
      <div className="pt-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <IoSparkles className="w-4 h-4 text-primary shrink-0" />

            <h2 className="text-lg font-bold text-foreground">
              You might also want this
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">
            Semantically similar to what you're reading now.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bookmarks.slice(0, 2).map((relatedBookmark) => (
            <Bookmark key={relatedBookmark.id} bookmark={relatedBookmark} />
          ))}
        </div>
      </div>
    </section>
  );
}