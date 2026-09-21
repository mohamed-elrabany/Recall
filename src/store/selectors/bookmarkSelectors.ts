import type { RootState } from "../store";

export const selectBookmarkById = (
  state: RootState,
  id: string
) => state.bookmarks.find((bookmark) => bookmark.id === id);