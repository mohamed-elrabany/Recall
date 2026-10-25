
import TagButton from "../components/ui/TagButton";
import BookmarkResults from "../components/layout/BookmarkResults";
import { useBookmarkResults } from "../hooks/useBookmarkResults";
import { useSearchParams } from "react-router";
import { useAppSelector } from "../store/hooks";
import { selectBookmarksByTag } from "../store/selectors/bookmarkSelectors";
import { selectTagsWithFrequency } from "../store/selectors/tagSelector";
import type { Tag } from "../types/tag";

export function Component() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tagsWithFrequency = useAppSelector(selectTagsWithFrequency);

  const selectedTagId = searchParams.get("tagId");

  const activeTag =
    tagsWithFrequency.find(({ tag }) => tag.id === selectedTagId)?.tag ?? null;

  const bookmarks = useAppSelector((state) =>
    selectBookmarksByTag(state, activeTag),
  );

  const { bookmarks: displayedBookmarks, isSearching, isLoading, searchError, isEmpty } = useBookmarkResults(bookmarks);


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
              isActive={activeTag?.id === tag.id}
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

      <BookmarkResults
        bookmarks={displayedBookmarks}
        isLoading={isLoading}
        error={searchError}
        isEmpty={isEmpty}
        emptyTitle={isSearching ? "No matching bookmarks found" : "No bookmarks yet"}
        emptyDescription={
          isSearching
            ? "Try different keywords or describe what you're looking for."
            : "Save your favorite links to Recall and organize them with tags."
        }
      />
    </div>
  );
}
