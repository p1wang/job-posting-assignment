import { configureStore } from "@reduxjs/toolkit";
import postingsReducer from "./postingsSlice";

export const store = configureStore({
  reducer: {
    postings: postingsReducer,
  },
});
