import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../footer/footer';
import './book.css';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiLoader4Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductRequestFetch } from '../bookReducer/bookslevesReducer';

const Books = ({ cart, setCart }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(0);
  const { loading, error, networkError, books } = useSelector(state => state.products);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart([]);
    }
    dispatch(getProductRequestFetch());
  }, [dispatch, setCart]);

  const handleAddToCart = (book) => {
    if (count > 0) {
      const updatedCart = [...cart, { ...book, quantity: count }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert('Added item');
      setCount(0);
    } else {
      alert('Please select a quantity greater than 0');
    }
  };

  const countAdd = () => {
    setCount(prev => prev + 1);
  };

  const countDecrease = () => {
    setCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  const filteredBooks = (books || []).filter(book => {
    const normalizedFilter = filter.toLowerCase().trim();
    const normalizedStatus = book.status.toLowerCase().trim();
    const matchesFilter = normalizedFilter === 'all' || normalizedStatus === normalizedFilter;
    const matchesSearch = book.author.toLowerCase().includes(search.toLowerCase().trim());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="book">
      <Header />
      {networkError ? (
        <div className="unauthorized">
          <img src='./images/Group 7522.png' alt='Network error' />
          <p>Network error. Please check your internet connection and try again.</p>
        </div>
      ) : loading ? (
        <div className='book-loader-container'>
          <RiLoader4Fill className='loader-book' />
        </div>
      ) : error ? (
        <div className='error-message'>{error}</div>
      ) : (
        <div className="books-list">
          <div className="books-main">
            <h4>BookShelves</h4>
            <ul>
              <li className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</li>
              <li className={filter === 'Read' ? 'active' : ''} onClick={() => setFilter('Read')}>Read</li>
              <li className={filter === 'Currently Reading' ? 'active' : ''} onClick={() => setFilter('Currently Reading')}>Currently Reading</li>
              <li className={filter === 'Want To Read' ? 'active' : ''} onClick={() => setFilter('Want To Read')}>Want To Read</li>
            </ul>
          </div>
          <div className="main-book-container">
            <div className="search-section">
              <h5 className='mobile-h5'>{filter} Books</h5>
              <div className="search-bar">
                <input
                  type="search"
                  placeholder="Search by author"
                  name='search'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
            <div className="product">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <div className="books-all" key={book.id}>
                    <Link to={`/productView/${book.id}`}>
                      <div className="product-image">
                        <img src={book.image} alt={book.title} />
                      </div>
                    </Link>
                    <div className="product-details">
                      <h2 className="product-heading">
                        {book.title.split(' ').slice(0, 3).join(' ')}<br />{book.title.split(' ').slice(3).join(' ')}
                      </h2>
                      <p className="product-author">{book.author}</p>
                      <p className="product-rating">
                        Avg Rating
                        <FontAwesomeIcon icon={faStar} color="gold" />
                        {book.rating}
                      </p>
                      <p className="product-status">
                        Status: <span>{book.status}</span>
                      </p>
                      <div className='number-of-items'>
                        <button className='btn-item' onClick={countDecrease}>-</button>
                        {count}
                        <button className='btn-item' onClick={countAdd}>+</button>
                      </div>
                      <button
                        className='add'
                        onClick={() => handleAddToCart(book)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="error-load">
                  <img src="./images/Asset 1 1.png" alt='No books found' />
                  <p>Your search did not find any matches.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!loading && <Footer />}
    </div>
  );
};

export default Books;
