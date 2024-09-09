import { call, delay, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { fetchBooksSuccess, fetchBooksFailure, setNetworkError } from '../bookReducer/bookReducer';
function* fetchBooksSaga() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            yield put(fetchBooksFailure('Unauthorized access. Please log in.'));
            return;
        }
        yield delay(2000)
        const url = 'https://run.mocky.io/v3/dc2b75f1-d84d-45a4-8d6d-8f1581031b86';

        const response = yield call(axios.get, url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.data && response.data.books) {
            yield put(fetchBooksSuccess(response.data.books));
        } else {
            yield put(fetchBooksSuccess([]));
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            yield put(fetchBooksFailure('Unauthorized access. Please log in.'));
        } else {
            yield put(setNetworkError());
            yield put(fetchBooksFailure('Network error. Please try again later.'));
        }
    }
}
function* bookSaga() {
    yield takeEvery('books/fetchBooksRequest', fetchBooksSaga);
}
export default bookSaga;
