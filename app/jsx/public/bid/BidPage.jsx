import React from 'react';
import CartRepository from './CartRepository.js';
import {CartItems} from './CartItems.jsx';
import {BidForm} from './BidForm.jsx';
import {Table} from 'react-bootstrap';

export class BidPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      contact: {}
    }
  }

  handleItemDelete(i) {
    CartRepository.removeItem(i);
    this.setState({items: CartRepository.getItems()});

  }

  componentDidMount() {
    this.setState({
      items: CartRepository.getItems()
    })
  }

  render() {
    return (
      <div className="container">
        <CartItems
          items={this.state.items}
          handleItemDelete={this.handleItemDelete.bind(this)}
          />
        <BidForm />
      </div>
    )


  }
}
