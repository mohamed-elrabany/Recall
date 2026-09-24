import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookMark } from "../../types/bookmark";

const initialState: BookMark[] = [];

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,

  reducers: {
    setBookmarks: (_, action: PayloadAction<BookMark[]>) => {
      return action.payload;
    },

    addBookmark: (state, action: PayloadAction<BookMark>) => {
      const exists = state.some(
        (bookmark) => bookmark.id === action.payload.id,
      );
      if (!exists) {
        state.unshift(action.payload);
      }
    },

    updateBookmark: (state, action: PayloadAction<BookMark>) => {
      const index = state.findIndex(
        (bookmark) => bookmark.id === action.payload.id,
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    removeBookmark: (state, action: PayloadAction<string>) => {
      return state.filter((bookmark) => bookmark.id !== action.payload);
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(
        (bookmark) => bookmark.id === action.payload,
      );
      if (index !== -1) {
        state[index].is_favorite = !state[index].is_favorite;
      }
    },
  },
});

export const bookmarkActions = bookmarkSlice.actions;
export const bookmarkReducer = bookmarkSlice.reducer;

export default bookmarkReducer;
