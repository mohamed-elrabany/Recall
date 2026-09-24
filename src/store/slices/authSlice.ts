import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Session } from "@supabase/supabase-js";

interface AuthState {
    session: Session | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState ={
    session: null,
    isAuthenticated: false,
    isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<Session | null>) {
      state.session = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    logout(state) {
      state.session = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const authActions= authSlice.actions;
const authReducer= authSlice.reducer;
export default authReducer;
