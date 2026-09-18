type BookmarkStatus = "processing" | "done" | "failed" | "manual";

export function getBookmarkStatusStyle(status: BookmarkStatus) {
  switch (status) {
    case "processing":
      return {
        color: "text-muted-foreground",
        dot: "animate-ping",
        label: "Processing...",
      };

    case "failed":
      return {
        color: "text-red-500",
        dot: "",
        label: "Processing failed",
      };

    case "manual":
      return {
        color: "text-amber-500",
        dot: "",
        label: "Needs manual input",
      };

    case "done":
      return {
        color: "",
        dot: "",
        label: "Done",
      };
  }
}