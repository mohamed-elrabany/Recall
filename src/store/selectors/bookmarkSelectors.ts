import type { RootState } from "../store";
import type { Tag } from "../../types/tag";

export const selectBookmarkById = (
  state: RootState,
  id: string
) => state.bookmarks.find((bookmark) => bookmark.id === id);

export const selectBookmarksByTag = (
  state: RootState,
  tag: Tag | null,
) => {
  return state.bookmarks.filter((bookmark) => tag !== null &&
    bookmark.tags?.includes(tag)
  );
};

export const selectFavoriteBookmarks = (state: RootState) =>
  state.bookmarks.filter((bookmark) => bookmark.is_favorite);

// Edited Tag type