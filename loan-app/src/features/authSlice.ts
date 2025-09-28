import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  role: string | null;
  loading: boolean;
  error: string;
}

const initialState: AuthState = {
  user: null,
  role: null,
  loading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User & { role?: string }>) {
      state.user = action.payload;
      state.role = action.payload.role || null;
      state.error = "";
    },
    logout(state) {
      state.user = null;
      state.role = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setUser, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
