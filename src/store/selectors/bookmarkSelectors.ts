import type { RootState } from "../store";
import type { Tag } from "../../types/tag";

export const selectBookmarkById = (
  state: RootState,
  id: string
) => state.bookmarks.find((bookmark) => bookmark.id === id);

export const selectBookmarksByTag = (
  state: RootState,
  selectedTag: Tag | null,
) => {
  if (!selectedTag) return state.bookmarks;

  return state.bookmarks.filter((bookmark) =>
    (bookmark.tags ?? []).some(
      (tag) =>
        typeof tag !== "string" && tag.id === selectedTag.id,
    ),
  );
};

export const selectFavoriteBookmarks = (state: RootState) =>
  state.bookmarks.filter((bookmark) => bookmark.is_favorite);

// Edited Tag type