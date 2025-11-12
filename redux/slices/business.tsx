import { createSlice } from "@reduxjs/toolkit";

export const businessSlice = createSlice({
  name: "business",
  initialState: {
    businessName:'',
    locationCoord:{
        latitude: 27.7172,
        longitude: 85.3240,
    },
    locationName:'',
    index:0,
    description:'',
    hours:{
      sunday:{
        open:'',
        close:''
      },
      monday:{
        open:'',
        close:''
      },
      tuesday:{
        open:'',
        close:''
      }, 
      wednesday:{
        open:'',
        close:''
      } ,
      thursday:{
        open:'',
        close:''
      },
      friday:{
        open:'',
        close:''
      },
      saturday:{
        open:'',
        close:''
      }
    }
  },
  reducers: {
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setBusinesses: (state, action) => {
      state.businessName = action.payload;
    },
    setLocation: (state, action) => {
      state.locationCoord = action.payload;
    },
    setLocationName: (state, action) => {
      state.locationName = action.payload;
    },
    setIndex: (state, action) => {
      state.index ++;
    },
    prevIdex: (state, action) => {
      state.index --;
    },
    setSunday: (state, action) => {
      state.hours.sunday.open = action.payload.open;
      state.hours.sunday.close = action.payload.close;
    },
    setMonday: (state, action) => {
      state.hours.monday.open = action.payload.open;
      state.hours.monday.close = action.payload.close;
    },
    setTuesday: (state, action) => {
      state.hours.tuesday.open = action.payload.open;
      state.hours.tuesday.close = action.payload.close;
    },
    setWednesday: (state, action) => {
      state.hours.wednesday.open = action.payload.open;
      state.hours.wednesday.close = action.payload.close;
    },
    setThursday: (state, action) => {
      state.hours.thursday.open = action.payload.open;
      state.hours.thursday.close = action.payload.close;
    },
    setFriday: (state, action) => {
      state.hours.friday.open = action.payload.open;
      state.hours.friday.close = action.payload.close;
    },
    setSaturday: (state, action) => {
      state.hours.saturday.open = action.payload.open;
      state.hours.saturday.close = action.payload.close;
    },
  },
});

export const { setBusinesses, setLocation,setLocationName,setIndex,prevIdex ,setDescription,setSunday,setMonday,setTuesday,setWednesday,setThursday,setFriday,setSaturday } = businessSlice.actions;
export default businessSlice.reducer;