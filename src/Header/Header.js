import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onClickEventChange = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='header-container'>
      <div className='header-image'>
        <img src='../images/Group 7731.png' alt='logo' />
      </div>
      <div className='hamburger' onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`header-link ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li className={isMenuOpen ? 'active' : ''}><Link to='/'>Home</Link></li>
          <li><Link to='/Books'>Bookshelves</Link></li>
          <li><Link to='/cart'>Cart</Link></li>
          <li>
            <button onClick={onClickEventChange} className='logout'>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
