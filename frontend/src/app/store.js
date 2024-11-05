import { configureStore } from "@reduxjs/toolkit";
import artworkReducer from "../features/artwork/artworkSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    artwork: artworkReducer,
  },
});
