import { createSlice } from "@reduxjs/toolkit";

const loanSlice = createSlice({
  name: "loan",
  initialState: { applications: [] },
  reducers: {
    addApplication: (state, action) => {
      state.applications.push(action.payload);
    },
    clearApplications: (state) => {
      state.applications = [];
    },
  },
});

export const { addApplication, clearApplications } = loanSlice.actions;
export default loanSlice.reducer;
