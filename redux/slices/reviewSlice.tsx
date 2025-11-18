import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: '',
    stars:0,
    inputReview:''
  },
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setStars: (state, action) => {
      state.stars = action.payload;
    },
    setInputReview: (state, action) => {
      state.inputReview = action.payload;
    },

  },
});

export const { setReviews ,setStars,setInputReview} = reviewSlice.actions;
export default reviewSlice.reducer;