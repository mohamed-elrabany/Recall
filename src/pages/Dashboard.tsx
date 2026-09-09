import Bookmark from "../components/ui/Bookmark";
import {bookmarks} from "../types/bookmark";

export function Component() {
    return(
        <div className="px-4 sm:px-6 pt-6 min-h-screen">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
                <span className="text-sm text-muted-foreground">{bookmarks.length} items</span>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {bookmarks.map((bookmark) => (
                    <Bookmark key={bookmark.id} bookmark={bookmark} />
                ))}
            </div>
        </div>
    );
}