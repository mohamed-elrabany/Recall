import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { updateTheme, updateLayout } from "../../services/userServices";

import type { Profile } from "../../types/profile";
import type { ThemeMode, LayoutMode } from "../../types/settings";

type UserState = {
  user: Profile | null;
  isUpdating: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  isUpdating: false,
  error: null,
};

export const updateUserTheme = createAsyncThunk(
  "user/updateTheme",
  async ({ userId, theme }: { userId: string; theme: ThemeMode }) => {
    return await updateTheme(userId, theme);
  }
);

export const updateUserLayout = createAsyncThunk(
  "user/updateLayout",
  async ({ userId, layout }: { userId: string; layout: LayoutMode }) => {
    return await updateLayout(userId, layout);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setTheme: (state, action) => {
      if (state.user) {
        state.user.theme_preference = action.payload;
      }
    },

    setLayout: (state, action) => {
      if (state.user) {
        state.user.card_layout = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Theme
      .addCase(updateUserTheme.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateUserTheme.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.user = action.payload;
      })
      .addCase(updateUserTheme.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.error.message ?? "Failed to update theme";
      })

      // Layout
      .addCase(updateUserLayout.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateUserLayout.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.user = action.payload;
      })
      .addCase(updateUserLayout.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.error.message ?? "Failed to update layout";
      });
  },
});

export const userActions= userSlice.actions;
const userReducer= userSlice.reducer;
export default userReducer;