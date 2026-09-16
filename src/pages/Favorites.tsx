import { useLayout } from "../hooks/useLayout";
export function Component() {
    const { layout } = useLayout();
    return(
        <div className="px-4 sm:px-6 pt-6 min-h-screen">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Favorites</h2>
                <span className="text-sm text-muted-foreground">2 items</span>
            </div>
            <div className={`mt-6 grid gap-4 ${layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                <p>Bookmarks here</p>
            </div>
        </div>
    );
}