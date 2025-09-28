import { configureStore } from "@reduxjs/toolkit";
import loanReducer from "./features/loanSlice";
import authReducer from "./features/authSlice";
import paymentReducer from "./features/paymentSlice";

export const store = configureStore({
  reducer: {
    loan: loanReducer,
    auth: authReducer,
    payment: paymentReducer,
  },
});

// ✅ Export RootState and AppDispatch types
export type initialState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
