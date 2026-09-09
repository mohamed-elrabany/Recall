import { bookmarks } from "../types/bookmark";
import Bookmark from "../components/ui/Bookmark";
import Button from "../components/ui/Button";

import { RiGlobalLine } from "react-icons/ri";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FiTag, FiEdit3 } from "react-icons/fi";
import { IoSparkles } from "react-icons/io5";

export function Component() {
  const bookmark = bookmarks[0];

  if (!bookmark) return null;

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Bookmark Info */}
      <div className="pb-6 border-b border-border">
        <div className="flex items-start gap-3 min-w-0">
          <span className="text-xs bg-muted p-2 rounded-xl w-16 h-16 flex items-center justify-center shrink-0">
            <img
              className="w-full h-full object-cover"
              src={bookmark.snippet}
              alt="snippet icon"
            />
          </span>

          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-x-4 gap-y-2 text-[10px] flex-wrap text-muted-foreground">
              <div className="flex items-center gap-1 min-w-0">
                <RiGlobalLine className="w-3 h-3 shrink-0" />

                <span className="truncate">
                  {bookmark.url}
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <MdOutlineCalendarToday className="w-3 h-3" />

                <span>
                  Saved on{" "}
                  {bookmark.createdAt?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <p className="font-bold text-foreground text-xl">
              {bookmark.title}
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
          {bookmark.description}
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
            <Bookmark
              key={relatedBookmark.id}
              bookmark={relatedBookmark}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

