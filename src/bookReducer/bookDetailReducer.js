import { createSlice } from '@reduxjs/toolkit';

const bookDetailSlice = createSlice({
  name: 'bookDetail',
  initialState: {
    book: null,
    loading: false,
    error: null,
  },
  reducers: {
    getProductDetailRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProductDetailsSuccess: (state, action) => {
      state.book = action.payload;
      state.loading = false;
    },
    getProductDetailFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getProductDetailRequest,
  getProductDetailsSuccess,
  getProductDetailFailure,
} = bookDetailSlice.actions;

export default bookDetailSlice.reducer;
