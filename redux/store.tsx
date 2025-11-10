import { configureStore } from "@reduxjs/toolkit";
import Info from "./slices/Info";
import authReducer from "./slices/logSlice";
import SignUp from "./slices/SignUp";
import businessSlice from "./slices/business";
import SearchPageSlice from "./slices/SearchPageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: SignUp,
    info:Info,
    business:businessSlice,
    SearchPage:SearchPageSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
