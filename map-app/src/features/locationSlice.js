import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLocation: null,
  destination: null,
  route: null,
  POIs: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    setPOIs: (state, action) => {
      state.POIs = action.payload;
    },
  },
});

export const { setCurrentLocation, setDestination, setRoute, setPOIs } = locationSlice.actions;
export default locationSlice.reducer;
