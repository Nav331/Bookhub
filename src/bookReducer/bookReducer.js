import { createSlice } from "@reduxjs/toolkit";
const booksSlice=createSlice({
    name:'books',
    initialState:{
        loading:false,
        books:[],
        error:null,
        networkError:false
    },
    reducers: {
        fetchBooksRequest: (state) => {
          state.loading = true;
          state.error = null;
          state.networkError = false;
        },
        fetchBooksSuccess: (state, action) => {
          state.loading = false;
          state.books = action.payload;
        },
        fetchBooksFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
        setNetworkError: (state) => {
          state.networkError = true;
        },
      },
})
export const { fetchBooksRequest, fetchBooksSuccess, fetchBooksFailure, setNetworkError } =
  booksSlice.actions;
export default booksSlice.reducer;