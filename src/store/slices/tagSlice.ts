import { createSlice } from "@reduxjs/toolkit";
import type { Tag } from "../../types/tag";

const initialState: Tag[] = [];

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers:{
    setTags: (_, action) => {
      return action.payload;
    }
  }
});


export const tagActions = tagSlice.actions;
export const tagReducer = tagSlice.reducer;

export default tagReducer;