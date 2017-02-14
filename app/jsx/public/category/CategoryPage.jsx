import React from 'react';
import {CategoryRepository} from '../../repositories/category.js';
import {ProductRepository} from '../../repositories/product.js';
import {Header} from './Header.jsx';
import {Products} from './Products.jsx';

export class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {category: {}, products:[], error: ''}
    this.categoryRepository = new CategoryRepository('localhost', 3000);
    this.productRepository = new ProductRepository('localhost', 3000);
  }

  //The parameter is the category's name
  loadCategoryAndProducts(name) {
    this.categoryRepository.getCategoryByName(name)
    .then(category => {
      this.productRepository.getProductsByCategory(category._id)
      .then(products => {
          this.setState({
            category: category,
            products: products
          });
      }).catch(err => {
        this.setState({error: err});
      });
    }).catch(err => {
      this.setState({error: err});
    });

  }

  componentDidMount(){
    this.loadCategoryAndProducts(this.props.params.name);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.name != this.props.params.name) {
      this.loadCategoryAndProducts(nextProps.params.name);
    }
  }

  render() {
    let errorMessage = <h3>{this.state.error}</h3>;
    return (
      <div className="container">
        <Header
          name={this.state.category.name}
          description={this.state.category.description}
          error={this.state.error} />
        <Products
          products={this.state.products}
          />
      </div>
    )
  }


}
