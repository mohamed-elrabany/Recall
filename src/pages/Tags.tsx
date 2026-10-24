
import TagButton from "../components/ui/TagButton";
import Bookmark from "../components/ui/Bookmark";
import { useSemanticSearchContext } from "../context/SemanticSearchContext";
import { useSearchParams } from "react-router";
import { useAppSelector } from "../store/hooks";
import { selectBookmarksByTag } from "../store/selectors/bookmarkSelectors";
import { selectTagsWithFrequency } from "../store/selectors/tagSelector";
import { useLayout } from "../hooks/useLayout";
import type { Tag } from "../types/tag";

export function Component() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { layout } = useLayout();
  const { query, results, loading, error } = useSemanticSearchContext();

  const tagsWithFrequency = useAppSelector(selectTagsWithFrequency);

  const selectedTagId = searchParams.get("tagId");

  const activeTag =
    tagsWithFrequency.find(
      ({ tag }) => tag.id === selectedTagId,
    )?.tag ?? null;

  const bookmarks = useAppSelector((state) =>
    selectBookmarksByTag(state, activeTag),
  );

  const displayedBookmarks = query.trim()
    ? results.map((result) => result)
    : bookmarks;

  const handleTagSelect = (tag: Tag) => {
    setSearchParams({ tagId: tag.id });
  };

  const handleClearTag = () => {
    setSearchParams({});
  };

  return (
    <div className="px-4 sm:px-6 pt-6 min-h-screen space-y-8">
      <div className="flex flex-col items-start justify-start gap-4">
        {activeTag ? (
          <div className="flex justify-between items-center gap-2 w-full">
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearTag}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                Tags /
              </button>

              <h2
                className="text-xl font-bold text-foreground"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                #{activeTag.name}
              </h2>
            </div>

            <p className="text-sm text-muted-foreground">
              {displayedBookmarks.length}{" "}
              {displayedBookmarks.length === 1 ? "item" : "items"}
            </p>
          </div>
        ) : (
          <h2 className="text-2xl font-bold text-foreground">
            Browse by Tags
          </h2>
        )}

        <div className="flex flex-wrap gap-2">
          {tagsWithFrequency.map(({ tag, frequency }) => (
            <TagButton
              key={tag.id}
              label={tag.name}
              count={frequency}
              onClick={() => handleTagSelect(tag)}
            />
          ))}
        </div>

        {!activeTag && (
          <p className="text-sm text-muted-foreground mt-4">
            Click a tag to see all items in that category.
          </p>
        )}
      </div>

      {query.trim() && loading && (
        <p className="text-sm text-muted-foreground">
          Searching bookmarks...
        </p>
      )}

      {query.trim() && error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <>
          <div
            className={`grid gap-4 ${
              layout === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {displayedBookmarks.map((bookmark) => (
              <Bookmark key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>

          {query.trim() &&
            !loading &&
            displayedBookmarks.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No matching bookmarks found.
              </p>
            )}
        </>
      )}
    </div>
  );
}
