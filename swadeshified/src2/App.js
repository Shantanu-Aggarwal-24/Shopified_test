import React, { useEffect } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductListPage from './components/ProductListPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import CartPage from './components/CartPage';
import { useDispatch, useSelector } from 'react-redux';
//import { authConstants } from './actions/constants';
import { isUserLoggedIn, updateCart } from './actions';
import OrderPage from './components/OrderPage';
import CheckoutPage from './components/CheckoutPage';
import OrderDetailsPage from './components/OrderDetailsPage';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  },[auth.authenticate]);

  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
  },[auth.authenticate]);


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
          <Route path="/:slug" exact component={ProductListPage} />
          <Route path="/cart" component={CartPage}/>
          <Route path="/checkout" component={CheckoutPage}/>
          <Route path="/account/orders" component={OrderPage}/>
          <Route path="/order_details/:orderId" component={OrderDetailsPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App; 
