import { configureStore } from "@reduxjs/toolkit";
import Info from "./slices/Info";
import authReducer from "./slices/logSlice";
import SignUp from "./slices/SignUp";
import businessSlice from "./slices/business";
import SearchPageSlice from "./slices/SearchPageSlice";
import Result from './slices/SearchResult'
import reviewSlice  from "./slices/reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: SignUp,
    info:Info,
    business:businessSlice,
    SearchPage:SearchPageSlice,
    searchResult:Result,
    review:reviewSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
