
import Bookmark from "../components/ui/Bookmark";
import { useSemanticSearchContext } from "../context/SemanticSearchContext";
import { useLayout } from "../hooks/useLayout";
import { useAppSelector } from "../store/hooks";

export function Component() {
    const { layout } = useLayout();
    const { query, results, loading, error } = useSemanticSearchContext();
    const bookmarks = useAppSelector((state) => state.bookmarks);

    const displayedBookmarks = query.trim()
        ? results.map((result) => result)
        : bookmarks;

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

            {query.trim() && loading && (
                <p className="mt-6 text-sm text-muted-foreground">
                    Searching bookmarks...
                </p>
            )}

            {query.trim() && error && (
                <p className="mt-6 text-sm text-destructive">
                    {error}
                </p>
            )}

            {!(query.trim() && error) && (
                <div
                    className={`mt-6 grid gap-4 pb-8 md:pb-0 ${
                        layout === "grid"
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1"
                    }`}
                >
                    {displayedBookmarks.map((bookmark) => (
                        <Bookmark
                            key={bookmark.id}
                            bookmark={bookmark}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
