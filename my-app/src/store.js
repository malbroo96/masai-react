import { configureStore, createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
  name: "apiData",
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});






export const { fetchStart, fetchSuccess, fetchError } = apiSlice.actions;







const store = configureStore({
  reducer: {
    api: apiSlice.reducer
  }
});

export default store;
