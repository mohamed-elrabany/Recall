// components/layout/BookmarkResults.tsx
import Bookmark from "../ui/Bookmark";
import BookmarkStates from "./BookmarkStates";
import { useLayout } from "../../hooks/useLayout";
import type { BookMark } from "../../types/bookmark";

type BookmarkResultsProps = {
  bookmarks: BookMark[];
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyTitle: string;
  emptyDescription: string;
};

export default function BookmarkResults({
  bookmarks,
  isLoading,
  error,
  isEmpty,
  emptyTitle,
  emptyDescription,
}: BookmarkResultsProps) {
  const { layout } = useLayout();
  const hasState = isLoading || Boolean(error) || isEmpty;

  return (
    <>
      <BookmarkStates
        layout={layout}
        loading={isLoading}
        error={error}
        errorTitle="Failed to fetch search results."
        errorDescription="Something went wrong while searching your bookmarks. Please try again in a moment."
        isEmpty={isEmpty}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
      />

      {!hasState && (
        <div
          className={`mt-6 grid gap-4 pb-8 md:pb-0 ${
            layout === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {bookmarks.map((bookmark) => (
            <Bookmark key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      )}
    </>
  );
}