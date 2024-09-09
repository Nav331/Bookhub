import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailRequest } from '../bookReducer/bookDetailReducer';
import Header from '../Header/Header';
import './ProductDetails.css';
const ProductView = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { book,  error } = useSelector((state) => state.bookDetail);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetailRequest({ id })); 
    }
  }, [id, dispatch]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-view">
      <Header />
      {book && (
        <>
          <div className="productview-container">
            <div className="product-view-image">
              <img src={book.image} alt="book" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div className="productView-text">
              <h1>{book.title}</h1>
              <h2>Author: {book.author}</h2>
              <p>Rating: {book.rating}</p>
              <p>Status: <span>{book.status}</span></p>
            </div>
          </div>
          <hr />
          <div className="product-view-description">
            <h3>About the Author</h3>
            <p>{book.authorDetails?.bio || 'Bio not available'}</p>
            <h3>Book Details</h3>
            <p>{book.bookDetails?.description || 'Description not available'}</p>
            <p>Genre: {book.bookDetails?.genre || 'Genre not available'}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductView;
