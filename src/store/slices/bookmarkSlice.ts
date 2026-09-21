import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookMark } from "../../types/bookmark";

const initialState: BookMark[] = [];

const bookmarkSlice = createSlice({
  name: "bookmarks",

  initialState,

  reducers: {
    setBookmarks: (state, action: PayloadAction<BookMark[]>) => {
      return action.payload;
    },

    addBookmark: (state, action: PayloadAction<BookMark>) => {
      state.push(action.payload);
    },

    updateBookmark: (state, action: PayloadAction<BookMark>) => {
      const index = state.findIndex(
        (bookmark) => bookmark.id === action.payload.id
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteBookmark: (state, action: PayloadAction<string>) => {
      return state.filter(
        (bookmark) => bookmark.id !== action.payload
      );
    },
  },
});


export const bookmarkActions = bookmarkSlice.actions;
export const bookmarkReducer = bookmarkSlice.reducer;

export default bookmarkReducer;