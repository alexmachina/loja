import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, Link} from 'react-router';
import {ProductsTable} from './products/ProductsTable.jsx';
import {ProductsForm} from './products/ProductsForm.jsx';
import {LoginForm} from './users/LoginForm.jsx';
import {Admin} from './admin/Admin.jsx';
import {Public} from './public/Public.jsx';
import Cookies from 'js-cookie';


let rt = (
  <Router history={hashHistory}>
    <Route path="/" component={Public} />
    <Route path="/admin" component={Admin} >
      <Route path="/products" component={ProductsTable}></Route>
      <Route path="/product/:id" component={ProductsForm}></Route>
      <Route path="/product" component={ProductsForm}></Route>
    </Route>
  </Router>
)

ReactDOM.render(rt, document.getElementById('app'));
