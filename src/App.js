import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './Home/Home';
import Books from './booksleves/book';
import PageNotFound from './PageNotFound/PageNotFound';
import ProductView from './ProductDetails/ProductDetails';
import Cart from './Cart/Cart';
import PrivateRoute from './ProtectedRoute/ProtectedRoute';
function App() {
  const [cart, setCart] = useState([]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path='/Books' element={
            <PrivateRoute>
              <Books  cart={cart} setCart={setCart}/>
            </PrivateRoute>
          } />
          <Route path='/productView/:id'   element={
            <PrivateRoute>
              <ProductView/>
            </PrivateRoute>
          } /><Route path='/cart'  element={
            <PrivateRoute>
              <Cart cart={cart} setCart={setCart}/>
            </PrivateRoute>
          } />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
