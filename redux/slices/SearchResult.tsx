import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResult: [],
  searchIndex:' '
};

export const searchResultSlice = createSlice({
  name: "searchResult",
  initialState,
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult.push(action.payload);
    },
    setSearchIndex: (state, action) => {
      
      state.searchIndex = action.payload;
    },
  },
});
export const { setSearchResult ,setSearchIndex} = searchResultSlice.actions;

export default searchResultSlice.reducer;