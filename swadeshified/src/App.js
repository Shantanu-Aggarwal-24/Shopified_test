//import logo from './logo.svg';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import PrivateRoute from './containers/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import {  getInitialData, isUserLoggedIn } from './actions';
import Products from './components/Products';
import Orders from './components/Orders';
import Category from './components/Category';
import NewPage from './components/NewPage';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    
    if(auth.authenticate){
      dispatch(getInitialData());
    }
    dispatch(getInitialData());

  }, [auth.authenticate]);
  
  return (
  <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
         <PrivateRoute path="/page" component={NewPage} />
         {/* <PrivateRoute path="/page" component={Page} /> */}
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} /> 
        


        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
