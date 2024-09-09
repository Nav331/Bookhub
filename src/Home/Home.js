import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksRequest } from '../bookReducer/bookReducer'; 
import Header from '../Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Home.css';
import { RiLoader4Fill } from "react-icons/ri";
import SocialMediaIcons from '../footer/footer';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, books, error, networkError } = useSelector((state) => state.books);
  useEffect(() => {
      dispatch(fetchBooksRequest()); 
}, [dispatch]);

  return (
    <div className='home-container'>
      <Header />
      {loading ? (
        <div className='loader-container'>
          <RiLoader4Fill className='loader'/>
        </div>
      ) : error ? (
        <div className='error-message'>{error}</div>
      ) : (
        <>
          <div className='home-text'>
            <h1 className='home-heading'>Find Your Next Favorite Books?</h1>
            <p className='home-text'>
              You are in the right place. Tell us what titles or genres you have enjoyed in the past, and we will give you 
              <br />
              <span className="after-br">surprisingly insightful recommendations.</span>
            </p>
          </div>
          <div className='home-description'>
            <div className='description-heading'>
              <h1>Top Rated Books</h1>
              <button className='btn-home'><Link to='/Books'>Find Books</Link></button>
            </div>
            <div className='bot-container'>
              {networkError ? (
                <div className='no-token-message'>
                  <img src='./images/Group 7522.png' alt='Network Error'/>
                  <p>Something went wrong, Please try again.</p>
                </div>
              ) : (
                <Carousel
                  indicators={false}
                  interval={null}
                  variant="dark"
                  prevIcon={<FaChevronLeft />}
                  nextIcon={<FaChevronRight />}
                >
                  <Carousel.Item>
                    <div className="d-flex">
                      {books.length > 0 ? (
                        books.map((book) => (
                          <div className="carousel-slide" key={book.id}>
                            <img
                              className="d-block w-100"
                              src={book.imageUrl}
                              alt={book.altText}
                            />
                            <h5 className='car-heading'>{book.title}</h5>
                            <p className='car-text'>{book.author}</p>
                          </div>
                        ))
                      ) : (
                        <div>No books available.</div>
                      )}
                    </div>
                  </Carousel.Item>
                </Carousel>
              )}
              {!networkError && <SocialMediaIcons />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
