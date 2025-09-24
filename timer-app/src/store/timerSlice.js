import { createSlice } from "@reduxjs/toolkit";

const initialState = { time: 0, isRunning: false };

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    increment: (state) => { state.time += 1; },
    start: (state) => { state.isRunning = true; },
    stop: (state) => { state.isRunning = false; },
    reset: (state) => { state.time = 0; state.isRunning = false; },
  },
});

export const { increment, start, stop, reset } = timerSlice.actions;
export default timerSlice.reducer;
