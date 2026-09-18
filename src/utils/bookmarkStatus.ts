type BookmarkStatus = "processing" | "done" | "failed" | "manual";

export function getBookmarkStatusStyle(status: BookmarkStatus) {
  switch (status) {
    case "processing":
      return {
        color: "text-muted-foreground",
        bgColor: "bg-muted-foreground/10",
        dot: "animate-ping",
        label: "Processing...",
        details: "Recall is still processing this bookmark. Semantic search will be available soon.",
      };

    case "failed":
      return {
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        dot: "",
        label: "Processing failed",
        details: "Processing failed. Recall couldn't extract information from this link.",
      };

    case "manual":
      return {
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
        dot: "",
        label: "Needs manual input",
        details: "Add a title and summary to enable semantic search on this bookmark.",
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