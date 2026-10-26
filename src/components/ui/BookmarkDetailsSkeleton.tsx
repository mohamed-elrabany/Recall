import BookmarkSkeleton from "./BookmarkSkeleton";


export default function BookmarkDetailsSkeleton() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Bookmark Info */}
      <div className="pb-6 border-b border-border">
        <div className="flex items-start gap-3 min-w-0">
          {/* Icon */}
          <div className="w-16 h-16 rounded-xl bg-muted shrink-0" />

          <div className="min-w-0 flex-1 space-y-3 pt-1">
            {/* URL + Date */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="h-3 w-36 rounded bg-muted" />
              <div className="h-3 w-28 rounded bg-muted" />
            </div>

            {/* Title */}
            <div className="h-6 w-3/4 max-w-md rounded bg-muted" />
            <div className="h-6 w-1/3 max-w-48 rounded bg-muted" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="h-7 w-16 rounded-full bg-muted" />
          <div className="h-7 w-24 rounded-full bg-muted" />
          <div className="h-7 w-20 rounded-full bg-muted" />
        </div>
      </div>

      {/* Summary */}
      <div className="py-6 border-b border-border space-y-3">
        <div className="h-3 w-40 rounded bg-muted mb-4" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-4/5 rounded bg-muted" />
      </div>

      {/* Notes */}
      <div className="py-6 border-b border-border space-y-3">
        <div className="h-3 w-24 rounded bg-muted mb-4" />
        <div className="rounded-xl border border-border/50 bg-muted/60 p-4 space-y-3">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </div>
      </div>

      {/* Related Bookmarks */}
      <div className="pt-6">
        <div className="space-y-3">
          <div className="h-5 w-56 rounded bg-muted" />
          <div className="h-4 w-64 max-w-full rounded bg-muted" />
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <BookmarkSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

