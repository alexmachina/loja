import React from 'react';
import {Button, Glyphicon, Col, Popover, OverlayTrigger} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.css';
import '../../../css/productInfo.scss';
import {Input} from '../../components/Input.jsx';
import Cookies from 'js-cookie';
import CartRepository from '../bid/CartRepository.js';

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quantity: 1}
  }

  handleQuantityChange(e) {

      if(isNumber(e.target.value) && e.target.value.length < 3)
        this.setState({quantity: e.target.value});

  }

  handleAddClick() {
    CartRepository.addItem({
      name: this.props.name,
      quantity: this.state.quantity,
      price: this.props.price

    });



  }

  render() {
    let socialStyle = {
      fontSize:'56px',
      marginLeft:'5px'
    };
    let formatedPrice = `R$${this.props.price},00`;
    let dividedFormatedPrice = `R$${this.props.price/10},00`;
    let priceSection = null;

    if(this.props.price) {
      priceSection = (
        <div>
          <h1>{formatedPrice}</h1>
          <h4>Ou 10x de {dividedFormatedPrice}</h4>
        </div>)
    }
    const overlayPopover = (
      <Popover title="Sucesso" id="myPopover">
        <strong>Produto adicionado!</strong>
      </Popover>
    )
    return (
      <div className="row">
        <h2>{this.props.name}</h2>
        <h3>Disponivel: Em Estoque</h3>
        {priceSection}
        <h3>{this.props.description}</h3>
        <Col sm={12} id="submit-product-col">
          <OverlayTrigger trigger="click" placement="bottom" overlay={overlayPopover}>
            <Button bsSize="lg" onClick={this.handleAddClick.bind(this)} >
              Adicionar ao Orcamento
            </Button>
          </OverlayTrigger>

        </Col>
        <Col sm={12} id="quantity-col">
          <label>Quantidade </label>
          <input type="text" onChange={this.handleQuantityChange.bind(this)}
            value={this.state.quantity} />
        </Col>
        <div style={{marginTop:'40px'}}>

          <i
            className="fa fa-facebook-square"
            style={socialStyle}
            ></i>

        </div>
      </div>

    )
  }
}
