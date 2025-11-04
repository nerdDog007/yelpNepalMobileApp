import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
     user: null,
     isLoggedIn: false,
     coord:[],
     email:"",
     password:"",
     hasAccount:false,
     token:"",
    },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setLat: (state, action) => {
      state.coord[0] = action.payload;
    },
    setLong: (state, action) => {
      state.coord[1] = action.payload;
    },
    setEmail:(state,action)=>{
      state.email= action.payload
    },
    setPassword:(state,action)=>{
      state.password=action.payload
    },
    setHasAccount:(state,action)=>{
      state.hasAccount= action.payload
    },
    setToken:(state,action)=>{
      state.token= action.payload
    }

  },
});

export const { login, logout,setLat,setLong ,setToken,setEmail,setPassword,setHasAccount} = authSlice.actions;
export default authSlice.reducer;
