/**
 * This file sets up the Redux store configuration for the loan application.
 * We use @reduxjs/toolkit for simplified Redux setup and better developer experience.
 */

import { configureStore } from "@reduxjs/toolkit";

// Import individual feature reducers
import loanReducer from "./features/loanSlice"; // Handles loan application state
import authReducer from "./features/authSlice"; // Manages authentication state
import paymentReducer from "./features/paymentSlice"; // Controls payment-related state

/**
 * Configure and create the Redux store
 * The store combines multiple reducers for different features:
 * - loan: Manages loan applications, current application state, and application steps
 * - auth: Handles user authentication state, login/logout, and user profile
 * - payment: Controls payment processing, history, and scheduled payments
 */
export const store = configureStore({
  reducer: {
    loan: loanReducer,
    auth: authReducer,
    payment: paymentReducer,
  },
});

/**
 * Type Definitions for TypeScript
 * These types enable static typing for the Redux store and dispatch functions
 */

/**
 * RootState type
 * Represents the complete state tree of the application
 * Use this type when accessing state in useSelector hooks
 * Example: const { user } = useSelector((state: initialState) => state.auth);
 */
export type initialState = ReturnType<typeof store.getState>;

/**
 * AppDispatch type
 * Represents the type of the store's dispatch function
 * Use this type when dispatching actions with useDispatch hook
 * Example: const dispatch: AppDispatch = useDispatch();
 */
export type AppDispatch = typeof store.dispatch;
