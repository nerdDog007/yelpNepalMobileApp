import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
  name: "info",
  initialState: {
    user: {
        
    },
    token:'',
    currentIndex:'Search'
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
  },
});

export const { setUser,setToken ,setCurrentIndex} = infoSlice.actions;
export default infoSlice.reducer;
