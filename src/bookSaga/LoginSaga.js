import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { loginRequest, loginSuccess, loginFailure } from '../bookReducer/LoginReducer';
function* handleLogin(action) {
  try {
    const { username, password } = action.payload;
    const response = yield call(axios.post, 'https://dummyjson.com/auth/login', {
      username, password
    });
    const token = response.data.token;
    localStorage.setItem('authToken', token);
    yield put(loginSuccess(token));  
  } catch (error) {
    const errorMessage = error.response && error.response.status === 400
      ? 'Username and Password is invalid'
      : 'Something went wrong. Please try again.';
    yield put(loginFailure(errorMessage));  
  }
}

function* watchLogin() {
  yield takeEvery(loginRequest.type, handleLogin);  
}

export default watchLogin;
