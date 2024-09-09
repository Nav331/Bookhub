import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import bookReducer from "../bookReducer/bookReducer";
import productReducer from '../bookReducer/bookslevesReducer';
import bookSaga from "../bookSaga/bookSaga";
import productSaga from "../bookSaga/bookslevesSaga";
import productDetailsSaga from "../bookSaga/bookDetailSaga";
import bookDetailReducer from "../bookReducer/bookDetailReducer";
import authReducer from '../bookReducer/LoginReducer';
import authSaga from '../bookSaga/LoginSaga'
const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    books: bookReducer,
    products: productReducer,
    bookDetail: bookDetailReducer,
    auth: authReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(saga),
});

saga.run(bookSaga);
saga.run(productSaga);
saga.run(productDetailsSaga)
saga.run(authSaga)

export default store;
