export default function BookmarkSkeleton() {
  return (
    <div className="space-y-3 p-4 rounded-2xl shadow-md bg-card animate-pulse">
      {/* Header: Icon, title, URL, and actions */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0 flex-1">
          {/* Favicon */}
          <div className="w-10 h-10 rounded-lg bg-muted shrink-0" />

          <div className="min-w-0 flex-1 space-y-2 pt-1">
            {/* Title */}
            <div className="h-3.5 w-3/4 rounded bg-muted" />

            {/* URL */}
            <div className="h-2.5 w-5/6 rounded bg-muted" />
          </div>
        </div>

        {/* Similarity percentage / Favorite icon */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-9 rounded-full bg-muted" />
          <div className="w-4 h-4 rounded-full bg-muted" />
        </div>
      </div>

      {/* Snippet */}
      <div className="space-y-2 py-1">
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-4/5 rounded bg-muted" />
      </div>

      {/* Tags and date */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-12 rounded-full bg-muted" />
          <div className="h-5 w-16 rounded-full bg-muted" />
        </div>

        <div className="h-3 w-20 rounded bg-muted shrink-0" />
      </div>
    </div>
  );
}