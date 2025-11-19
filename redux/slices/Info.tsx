import isClosed from "@/utils/isClosed";
import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
  name: "info",
  initialState: {
    user: {
    },
    token:'',
    currentIndex:'Search',
    map:false,
    businessId:'',
    isClosed:false
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
    },
    setIsClosed: (state, action) => {
      state.isClosed = action.payload;
    },
  },
});

export const { setUser,setToken ,setCurrentIndex,setMap,setBusinessId,setIsClosed} = infoSlice.actions;
export default infoSlice.reducer;
