type BookmarkStatus = "processing" | "done" | "failed" | "manual";
import type { BookMark } from "../types/bookmark";

const STALE_PROCESSING_MS = 2 * 60 * 1000; // same value as in bookmarkServices

export function getBookmarkStatusStyle(status: BookmarkStatus) {
  switch (status) {
    case "processing":
      return {
        color: "text-muted-foreground",
        bgColor: "bg-muted-foreground/10",
        border: "borderborder-muted-foreground/20",
        dot: "animate-ping",
        label: "Processing...",
      };

    case "failed":
      return {
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        border: "border border-red-500/20",
        dot: "",
        label: "Processing failed",
      };

    case "manual":
      return {
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
        border: "border border-amber-500/20",
        dot: "",
        label: "Needs manual input",
      };

    case "done":
      return {
        color: "",
        bgColor: "",
        dot: "",
        label: "Done",
        details: "",
      };
  }
}

export function getStatusMessage(bookmark: BookMark): string {

  if (isStuckProcessing(bookmark)) {
  return "This is taking longer than expected. Retry to try again.";
}
  switch (bookmark.status) {
    case "processing":
      return "Recall is getting this bookmark ready. It will appear in search results soon.";

    case "failed":
      return "Recall found the title and summary but couldn't finish indexing this bookmark. Retry to make it searchable.";

    case "manual": {
      const missing = [
        !bookmark.title?.trim() && "a title",
        !bookmark.snippet?.trim() && "a summary",
      ].filter(Boolean);

      return missing.length
        ? `Recall couldn't find ${missing.join(" and ")} automatically. Add ${missing.join(" and ")} to make this bookmark searchable.`
        : "Complete this bookmark's details to make it searchable.";
    }

    default:
      return "";
  }
}

export function isStuckProcessing(bookmark: BookMark): boolean {
  if (bookmark.status !== "processing" || !bookmark.updated_at) return false;
  return (
    Date.now() - new Date(bookmark.updated_at).getTime() > STALE_PROCESSING_MS
  );
}

export function canRetry(bookmark: BookMark): boolean {
  return bookmark.status === "failed" || isStuckProcessing(bookmark);
}