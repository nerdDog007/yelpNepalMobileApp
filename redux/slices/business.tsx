import { createSlice } from "@reduxjs/toolkit";

const initialDays = {
  sunday:    { open: "10", close: "17", closed: false },
  monday:    { open: "", close: "", closed: false },
  tuesday:   { open: "", close: "", closed: false },
  wednesday: { open: "", close: "", closed: false },
  thursday:  { open: "", close: "", closed: false },
  friday:    { open: "", close: "", closed: false },
  saturday:  { open: "", close: "", closed: true },
};

export const businessSlice = createSlice({
  name: "business",
  initialState: {
    businessName: "",
    locationCoord: {
      latitude: 27.7172,
      longitude: 85.3240,
    },
    locationName: "",
    index: 0,
    description: "",
    shortDescription: "",
    hours: initialDays,
    formData:null
  },
  reducers: {
    setFormData: (state, action) => { state.formData = action.payload; },
    setIndex: (state) => { state.index++; },
    prevIdex: (state) => { state.index--; },
    setBusinesses: (state, action) => { state.businessName = action.payload; },
    setLocation: (state, action) => { state.locationCoord = action.payload; },
    setLocationName: (state, action) => { state.locationName = action.payload; },
    setDescription: (state, action) => { state.description = action.payload; },
    setShortDescription: (state, action) => { state.shortDescription = action.payload; },

    setHoursForDay: (state, action) => {
      const { day, open, close, closed } = action.payload;
      state.hours[day] = {
        open,
        close,
        closed,
      };
    },

  },
});

export const {
  setBusinesses,
  setLocation,
  setLocationName,
  setShortDescription,
  setIndex,
  prevIdex,
  setDescription,
  setFormData,
  setHoursForDay,
} = businessSlice.actions;

export default businessSlice.reducer;
