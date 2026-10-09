import type { RootState } from "../store";

export const selectBookmarkById = (
  state: RootState,
  id: string
) => state.bookmarks.find((bookmark) => bookmark.id === id);

export const selectBookmarksByTag = (
  state: RootState,
  tag: string | null,
) => {
  return state.bookmarks.filter((bookmark) =>
    bookmark.tags?.includes(tag!)
  );
};

export const selectFavoriteBookmarks = (state: RootState) =>
  state.bookmarks.filter((bookmark) => bookmark.is_favorite);