import Bookmark from "../components/ui/Bookmark";
import { useLayout } from "../hooks/useLayout";
// import { useLoaderData } from "react-router";
import { useAppSelector } from "../store/hooks";
import { fetchBookmarks } from "../services/bookmarkServices";
// import {bookmarks} from "../types/bookmark";

export function Component() {
    const { layout } = useLayout();
    const bookmarks = useAppSelector((state) => state.bookmarks);
    return(
        <div className="px-4 sm:px-6 pt-6 min-h-screen">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
                <span className="text-sm text-muted-foreground">{bookmarks.length} items</span>
            </div>
            <div className={`mt-6 grid gap-4 pb-8 md:pb-0 ${layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {bookmarks.map((bookmark) => (
                    <Bookmark key={bookmark.id} bookmark={bookmark} />
                ))}
            </div>
        </div>
    );
}