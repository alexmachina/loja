import React from 'react';
import {Table, Button, Glyphicon} from 'react-bootstrap';
import "./styles/CartItems.scss";
import CartRepository from './CartRepository.js'

export class CartItems extends React.Component {


  render() {
    let total = 0;
    let tbody = this.props.items.map((item, i) => {
      total += item.price * item.quantity;
      return (
        <tr className="item-line" key={i}>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{item.quantity}</td>
          <td>{item.price * item.quantity}</td>
          <td>
            <Button onClick={() => {
                this.props.handleItemDelete(i);
              }}><Glyphicon glyph="remove"></Glyphicon></Button>
          </td>
        </tr>
      )
    });

    return (
      <div className="items-table">
        <h1>Itens</h1>
        <Table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </Table>
        <div className="text-right">
          <span id="total">total: {total}</span>
        </div>
      </div>
    )
  }
}
