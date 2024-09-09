import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css'; 
const PageNotFound = () => {
  return (
    <div className='page-not-found'>
      <img src="../images/Group 7484.png" alt="404 Not Found" />
      <h1>404 - Page Not Found</h1>
      <p>we are sorry, the page you requested could not be found, Please go back to the homepage.</p>
      <button className='btn-PageNotFound'><Link to='/'>Go To Home</Link></button>
    </div>
  );
}
export default PageNotFound;
