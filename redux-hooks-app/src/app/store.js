// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import { store } from "./app/store.js";


export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
