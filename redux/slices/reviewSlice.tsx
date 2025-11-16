import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: '',
    stars:0
  },
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setStars: (state, action) => {
      state.stars = action.payload;
    },
  },
});

export const { setReviews ,setStars} = reviewSlice.actions;
export default reviewSlice.reducer;