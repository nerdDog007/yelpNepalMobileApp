import { createSlice } from "@reduxjs/toolkit";

export const businessSlice = createSlice({
  name: "business",
  initialState: {
    businessName:'',
    locationCoord:{
        latitude: 27.7172,
        longitude: 85.3240,
    },
    locationName:''
  },
  reducers: {
    setBusinesses: (state, action) => {
      state.businessName = action.payload;
    },
    setLocation: (state, action) => {
      state.locationCoord = action.payload;
    },
    setLocationName: (state, action) => {
      state.locationName = action.payload;
    },
  },
});

export const { setBusinesses, setLocation,setLocationName } = businessSlice.actions;
export default businessSlice.reducer;