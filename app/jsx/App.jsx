import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, Link} from 'react-router';
import {ProductsTable} from './admin/products/ProductsTable.jsx';
import {ProductsForm} from './admin/products/ProductsForm.jsx';
import {AmbienceForm} from './admin/ambiences/AmbienceForm.jsx';
import {AmbienceTable} from './admin/ambiences/AmbienceTable.jsx';
import {SaleTable} from './admin/sales/SaleTable.jsx';
import {SaleForm} from './admin/sales/SaleForm.jsx';
import {CategoryTable} from './admin/categories/CategoryTable.jsx';
import {CategoryForm} from './admin/categories/CategoryForm.jsx';
import {LoginForm} from './admin/users/LoginForm.jsx';
import {Admin} from './admin/Admin.jsx';
import {Public} from './public/Public.jsx';
import {Home} from './public/home/Home.jsx';
import {CategoryPage} from './public/category/CategoryPage.jsx';
import {ProductPage} from './public/product/ProductPage.jsx';
import {AmbiencesPage} from './public/ambience/AmbiencesPage.jsx'
import {AmbiencePage} from './public/ambience/AmbiencePage.jsx';
import {BidPage} from './public/bid/BidPage.jsx';
import {ContactPage} from './public/contact/ContactPage.jsx';
import Cookies from 'js-cookie';


let rt = (
  <Router history={hashHistory}>
    <Route path="/" component={Public} >
      <Route path="/home" component={Home} ></Route>
      <Route path="/categoria/:name" component={CategoryPage}></Route>
      <Route path="/produto/:name" component={ProductPage}></Route>
      <Route path="/ambientes" component={AmbiencesPage}></Route>
      <Route path="/ambiente/:name" component={AmbiencePage}></Route>
      <Route path="/orcamento" component={BidPage}></Route>
      <Route path="/contato" component={ContactPage}></Route>
    </Route>
    <Route path="/admin" component={Admin} >
      <Route path="/products" component={ProductsTable}></Route>
      <Route path="/product/:id" component={ProductsForm}></Route>
      <Route path="/product" component={ProductsForm}></Route>

      <Route path="/ambiences" component={AmbienceTable}></Route>
      <Route path="/ambience/:id" component={AmbienceForm}></Route>
      <Route path="/ambience" component={AmbienceForm}></Route>

      <Route path="/sales" component={SaleTable}></Route>
      <Route path="/sale" component={SaleForm}></Route>
      <Route path="/sale/:id" component={SaleForm}></Route>

      <Route path="/categories" component={CategoryTable}></Route>
      <Route path="/category" component={CategoryForm}></Route>
      <Route path="/category/:id" component={CategoryForm}></Route>
    </Route>
  </Router>
)

ReactDOM.render(rt, document.getElementById('app'));
