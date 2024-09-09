import { call, put, delay, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { getProductSuccess, getProductFailure, getNetworkError } from '../bookReducer/bookslevesReducer';
function* productFetchData() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      yield put(getProductFailure('Unauthorized access. Please log in.'));
      return;
    }

    yield delay(2000); 

    const url = 'https://run.mocky.io/v3/117143c0-6fd0-4761-9a82-5f30f9a08ee8';
    const response = yield call(axios.get, url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data && response.data.books) {
      yield put(getProductSuccess(response.data.books));
    } else {
      yield put(getProductSuccess([]));  
    }

  } catch (error) {
    if (error.response && error.response.status === 401) {
      yield put(getProductFailure('Unauthorized access. Please log in.'));
    } else {
      yield put(getNetworkError());
      yield put(getProductFailure('Network error. Please try again later.'));
    }
  }
}

function* productSaga() {
  yield takeEvery('products/getProductRequestFetch', productFetchData);
}

export default productSaga;
