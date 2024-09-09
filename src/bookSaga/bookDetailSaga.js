import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  getProductDetailsSuccess,
  getProductDetailFailure,
} from '../bookReducer/bookDetailReducer';

function* fetchProductDetail(action) {
  try {
    const { id } = action.payload; 
    const response = yield call(axios.get, `https://run.mocky.io/v3/c76e46c1-50b6-4dae-9fdd-c30ff92b3cd7`);

    const books = response.data.books;
    const bookData = books.find(book => book.id === id); 
    
    if (bookData) {
      yield put(getProductDetailsSuccess(bookData));  
    } else {
      yield put(getProductDetailFailure('Book not found.')); 
    }
  } catch (error) {
    yield put(getProductDetailFailure(`Failed to fetch book details: ${error.message}`));  
  }
}

function* productDetailSaga() {
  yield takeEvery('bookDetail/getProductDetailRequest', fetchProductDetail);
}

export default productDetailSaga;
