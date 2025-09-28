import { configureStore } from "@reduxjs/toolkit";
import loanReducer from "./features/loanSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    loan: loanReducer,
    auth: authReducer,
  },
});

// ✅ Export RootState and AppDispatch types
export type initialState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
