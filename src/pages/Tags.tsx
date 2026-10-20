import TagButton from "../components/ui/TagButton";
import Bookmark from "../components/ui/Bookmark";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { selectBookmarksByTag } from "../store/selectors/bookmarkSelectors";
import { selectTagsWithFrequency } from "../store/selectors/tagSelector";
import { useLayout } from "../hooks/useLayout";
import type { Tag } from "../types/tag";



export function Component() {
  const [activeTag, setActiveTag] = useState<Tag | null>(null);
  const { layout } = useLayout();
  const tagsWithFrequency = useAppSelector(selectTagsWithFrequency);
  const bookmarks = useAppSelector((state) =>
    selectBookmarksByTag(state, activeTag),
  );

  return (
    <div className="px-4 sm:px-6 pt-6 min-h-screen space-y-8">
      <div className="flex flex-col items-start justify-y-start gap-4">
        {activeTag ? (
          <div className="flex justify-between items-center gap-2 w-full">
              <div className="flex items-center gap-2">
              <button onClick={() => setActiveTag(null)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                Tags /
              </button>
                      
              <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
                #{activeTag.name}
              </h2>
            </div>
            <p>{bookmarks.length} {bookmarks.length === 1 ? "item" : "items"}</p>
          </div>
          

        ) : (
          <h2 className="text-2xl font-bold text-foreground">Browse by Tags</h2>
        )}
        <div className="flex flex-wrap gap-2">
          {tagsWithFrequency.map((tag, index) => (
            <TagButton
              key={index}
              label={tag.tag.name}
              count={tag.frequency}
              onClick={() => setActiveTag(tag.tag)}
            />
          ))}
        </div>
        {!activeTag && <p className="text-sm text-muted-foreground mt-4">Click a tag to see all items in that category.</p>}
      </div>
      <div className={`mt-6 grid gap-4 ${layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
        {bookmarks.map((bookmark) => (
          <Bookmark key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
}
