import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
  name: "info",
  initialState: {
    user: {
    },
    token:'',
    currentIndex:'Search',
    map:false,
    businessId:''
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setMap: (state, action) => {
      state.map = action.payload;
    },
    setBusinessId: (state, action) => {
      state.businessId = action.payload;
    }
  },
});

export const { setUser,setToken ,setCurrentIndex,setMap,setBusinessId} = infoSlice.actions;
export default infoSlice.reducer;
