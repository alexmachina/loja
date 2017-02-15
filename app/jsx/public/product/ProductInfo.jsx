import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.css';
import '../../../css/productInfo.scss';

export class ProductInfo extends React.Component {
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

    return (
      <div className="row">
        <h2>{this.props.name}</h2>
        <h3>Disponivel: Em Estoque</h3>
        {priceSection}
        <h3>{this.props.description}</h3>
        <Button bsSize="lg">Adicionar ao Orcamento</Button>
        <div style={{marginTop:'20px'}}>

          <i
            className="fa fa-facebook-square"
            style={socialStyle}
            ></i>
          
        </div>
      </div>

    )
  }
}
