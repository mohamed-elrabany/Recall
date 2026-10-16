import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import bookmarkReducer from "./slices/bookmarkSlice";
import tagReducer from "./slices/tagSlice";

export const store= configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer,
        bookmarks: bookmarkReducer,
        tags: tagReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
