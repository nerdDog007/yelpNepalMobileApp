import { createSlice } from "@reduxjs/toolkit";

export const SignUpSlice = createSlice({
  name: "signup",
  initialState: {
    step: 0,
    email:"",
    password:"",
    confirmPassword:"",
    fullName:"",
    phoneNumber:"",
  },
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
});

export const { nextStep, prevStep ,setConfirmPassword,setEmail,setFullName,setPassword,setPhoneNumber} = SignUpSlice.actions;

export default SignUpSlice.reducer;