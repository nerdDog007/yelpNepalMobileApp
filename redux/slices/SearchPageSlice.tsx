import { createSlice } from "@reduxjs/toolkit";

export const SearchPageSlice = createSlice({
  name: "SearchPage",
  initialState: {
    search:'',
    searchBtn:false

  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSearchBtn: (state, action) => {
      state.searchBtn = action.payload;
    },
  },
});

export const { setSearch,setSearchBtn} = SearchPageSlice.actions; 
export default SearchPageSlice.reducer;