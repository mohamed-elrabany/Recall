export function Component() {
    return(
        <div className="px-4 sm:px-6 pt-6 min-h-screen">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Favorites</h2>
                <span className="text-sm text-muted-foreground">2 items</span>
            </div>
            <div className="mt-6">
                <p>Bookmarks here</p>
            </div>
        </div>
    );
}