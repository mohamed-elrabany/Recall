
import { LuInfo } from "react-icons/lu";
import { GoBookmarkSlashFill } from "react-icons/go";
import BookmarkSkeleton from "../ui/BookmarkSkeleton";

type BookmarkStatesProps = {
  loading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  layout?: "grid" | "list";

  emptyTitle?: string;
  emptyDescription?: string;

  errorTitle?: string;
  errorDescription?: string;
};

export default function BookmarkStates({
  loading = false,
  error = null,
  isEmpty = false,
  layout = "grid",

  emptyTitle = "No bookmarks yet",
  emptyDescription = "Save your favorite links to keep everything organized and searchable in one place.",

  errorTitle = "Something went wrong.",
  errorDescription = "We couldn't load your bookmarks. Please try again in a moment.",
}: BookmarkStatesProps) {
  if (loading) {
    return (
      <div
        className={`mt-6 grid gap-4 pb-8 md:pb-0 ${
          layout === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
        aria-label="Loading bookmarks"
        aria-busy="true"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <BookmarkSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="
          mt-6 flex items-start gap-2.5
          rounded-xl border border-red-500/20
          bg-red-500/5 p-3
          text-sm text-muted-foreground
        "
      >
        <LuInfo
          size={18}
          className="mt-0.5 shrink-0 text-red-500"
        />

        <p className="leading-relaxed">
          <span className="font-semibold text-foreground">
            {errorTitle}
          </span>{" "}
          {errorDescription}
        </p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-6 py-12 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <GoBookmarkSlashFill className="w-8 h-8 text-primary" />
        </div>

        <h3 className="text-lg font-semibold text-foreground">
          {emptyTitle}
        </h3>

        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return null;
}
