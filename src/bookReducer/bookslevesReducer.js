import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    error: null,
    books: [],
    networkError: false,
  },
  reducers: {
    getProductRequestFetch: (state) => {
      state.loading = true;
      state.error = null;
      state.networkError = false;
    },
    getProductSuccess: (state, action) => {
      state.books = action.payload;
      state.loading = false;
    },
    getProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getNetworkError: (state) => {
      state.networkError = true;
      state.loading = false;
    },
  },
});

export const { getProductRequestFetch, getProductSuccess, getProductFailure, getNetworkError } = productsSlice.actions;
export default productsSlice.reducer;
