import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Landing from './components/landing/landing.jsx'
import ordered from './components/seller/ordered/ordered.jsx'
import Products from './components/products/productBrowser/products.jsx'
import customerLogin from './components/OAuth/customerLogin/customerLogin.jsx'
import sellerLogin from './components/OAuth/sellerLogin/sellerLogin.jsx'
import customerSignup from './components/OAuth/customerSignup/customerSignup.jsx'
import sellerSignup from './components/OAuth/sellerSignup/sellerSignup.jsx'
import Nav from './components/navbar/navbar.jsx'
import Seller from './components/seller/seller.jsx'
import productPage from './components/products/productPage/productPage.jsx'
import shoppingCart from './components/customer/shoppingCart/shoppingCart.jsx'
import checkout from './components/customer/checkout/checkout.jsx'
import test from './components/seller/sellerProfile/presentation/descriptionInput/descriptionInput.jsx'
//import

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
  
      <Switch>
        <Route exact path="/products" component={Products} /> 
  
      </Switch>
      <Route path="/test" component={test} />
      <Route path="/products/:name" component={productPage}/>
 
      <Route path="/login" component={customerLogin} />
      <Route path="/signup" component={customerSignup} />
      <Route path="/loginSeller" component={sellerLogin} />
      <Route path="/signupSeller" component={sellerSignup} />
      <Route path="/testing" component={test} />
      <Route path="/seller" component={Seller} />
      <Route path="/cart" component={shoppingCart} />
      <Route exact path="/" component={Landing} />
      
    </Router>
    
  );
}


export default App;
