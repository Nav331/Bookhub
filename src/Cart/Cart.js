import React, { useEffect } from 'react';
import './Cart.css';
import Header from '../Header/Header';

const Cart = ({ cart, setCart }) => {
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  const handleDelete = (index) => {
    const updatedCart = cart.filter((item, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="Cart">
      <Header />
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                </td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.quantity}</td>
                <td>
                  <button className='btn-delete' onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
