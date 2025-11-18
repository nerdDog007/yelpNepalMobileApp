import { createSlice } from "@reduxjs/toolkit";

const initialDays = {
  sunday:    { open: "10:00", close: "17:00", closed: false },
  monday:    { open: "10:00", close: "17:00", closed: false },
  tuesday:   { open: "10:00", close: "17:00", closed: false },
  wednesday: { open: "10:00", close: "17:00", closed: false },
  thursday:  { open: "10:00", close: "17:00", closed: false  },
  friday:    { open: "10:00", close: "17:00", closed: false  },
  saturday:  { open: "10:00", close: "17:00", closed: false  },
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
