import { useAppSelector } from "../store/hooks";
import { useBookmarkResults } from "../hooks/useBookmarkResults";
import BookmarkResults from "../components/layout/BookmarkResults";

export function Component() {
  const allBookmarks = useAppSelector((state) => state.bookmarks);
  const { bookmarks: displayedBookmarks, isSearching, isLoading, searchError, isEmpty } = useBookmarkResults(allBookmarks);

  return (
    <div className="px-4 sm:px-6 pt-6 min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Dashboard
        </h2>

        <span className="text-sm text-muted-foreground">
          {displayedBookmarks.length} items
        </span>
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
