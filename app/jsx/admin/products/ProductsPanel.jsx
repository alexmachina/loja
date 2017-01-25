import React from 'react';
import ReactDOM from 'react-dom';
import {ProductsTable} from './ProductsTable.jsx';
import {ProductsForm} from './ProductsForm.jsx';

export class ProductsPanel extends React.Component {
  render() {
    return <ProductsTable />;
  }
}
