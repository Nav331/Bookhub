import React from 'react';
import { FaGoogle, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import './footer.css'
const SocialMediaIcons = () => {
  return (
    <>
    <div className="social-media-icons">
      <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
        <FaGoogle size={20} color="#3D3C3C" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter size={20} color="#3D3C3C" />
      </a>
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
        <FaYoutube size={20} color="#3D3C3C" />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={20} color="#3D3C3C" />
      </a>
    </div>
    <p className='contact-information'>
        Contact us
      </p>
    </>
  );
}

export default SocialMediaIcons;
