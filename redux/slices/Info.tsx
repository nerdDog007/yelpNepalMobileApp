import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
  name: "info",
  initialState: {
    user: {
        
    },
    token:'',
    currentIndex:'Search',
    map:false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      console.log(state.token)
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setMap: (state, action) => {
      state.map = action.payload;
    },
  },
});

export const { setUser,setToken ,setCurrentIndex,setMap} = infoSlice.actions;
export default infoSlice.reducer;
