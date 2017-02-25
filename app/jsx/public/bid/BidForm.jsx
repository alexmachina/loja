import React from 'react';
import {Input} from '../../components/Input.jsx';
import {Col, Button, Glyiphicon} from 'react-bootstrap';
import {validateTelephone, isNumber, validateEmail} from './validations.js';
import { BidRepository } from '../../repositories/bid.js';
import  CartRepository  from './CartRepository.js';

export class BidForm extends React.Component {
  constructor(props){
    super(props);
    this.rep = new BidRepository('http://localhost', 3000)
    this.state = {
      name: '',
      lastName: '',
      phone: '',
      telephone: '',
      email: '',
      state: '',
      city: '',
      message: '',
      sent: false,
      buttonText: 'Enviar'
    }
}
    isNotEmpty(value) {
      if(value == '')
        return false;
      return true;

    }
    onNameChange(e) {
      this.setState({
        name: e.target.value
      })
    }
    onLastNameChange(e) {
      this.setState({
        lastName: e.target.value
      })
    }

    onPhoneChange(e) {

          this.setState({
          phone: e.target.value
        });

    }

    onTelephoneChange(e) {
      if (isNumber(e.target.value)) {
        this.setState({
          telephone: e.target.value
        })
      }
    }

    onEmailChange(e) {
      this.setState({
        email: e.target.value
      })
    }
    onStateChange(e) {
      this.setState({
        state: e.target.value
      })
    }

    onCityChange(e) {
      this.setState({
        city: e.target.value
      })
    }

    onMessageChange(e) {
      this.setState({
        message: e.target.value
      })
    }
    isStateValid() {
      let isValid = true;

      if(this.state.name == '')
        isValid = false;
      if (this.state.lastName == '')
        isValid = false;
      if(this.state.email == '' || !validateEmail(this.state.email))
        isValid = false;
      if(this.state.phone == '' || !validateTelephone(this.state.phone))
        isValid = false
      if(this.state.telephone == '' || !validateTelephone(this.state.telephone))
        isValid = false;

        return isValid;
    }

    handleSubmit(e) {
      e.preventDefault();
      this.refs.nameInput.onBlur(this.state.name);
      this.refs.lastNameInput.onBlur(this.state.lastName);
      this.refs.phoneInput.onBlur(this.state.phone);
      this.refs.telephoneInput.onBlur(this.state.telephone)
      this.refs.emailInput.onBlur(this.state.email);

      if(this.isStateValid() && CartRepository.getItems().length) {
        let bid = this.state;
        bid.products = CartRepository.getItems()
        this.setState({buttonText: 'Enviando...'})

        this.rep.sendBid(bid).then(() =>{
          console.log("Sent")
          this.setState({
            sent : true,
            buttonText : 'Enviado'
          })
        })
          .catch(err => console.log(err))

        
      }



    }

    render() {
      return (
        <div id="bid-form">
          <div className="row">
            <Col xs={12} id="bid-form-padding">
              <Col xs={12} sm={8} smOffset={2} >
                <Input label="Nome"
                  onChange={this.onNameChange.bind(this)}
                  value={this.state.name}
                  validationFunction={this.isNotEmpty.bind(this)}
                  validationMessage="Campo obrigatorio"
                  ref="nameInput"
                  />
                <Input label="Sobrenome"
                  onChange={this.onLastNameChange.bind(this)}
                  value={this.state.lastName}
                  validationFunction={this.isNotEmpty.bind(this)}
                  validationMessage="Campo obrigatorio"
                  ref="lastNameInput"
                  />
                <Input label="Celular"
                  onChange={this.onPhoneChange.bind(this)}
                  value={this.state.phone}
                  validationFunction={validateTelephone}
                  validationMessage="Numero invalido"
                  ref="phoneInput"
                  />
                <Input label="Telefone"
                  onChange={this.onTelephoneChange.bind(this)}
                  value={this.state.telephone}
                  validationFunction={validateTelephone}
                  validationMessage="Numero invalido"
                  ref="telephoneInput"
                  />
                <Input label="Email"
                  type="email"
                  onChange={this.onEmailChange.bind(this)}
                  value={this.state.email}
                  validationFunction={validateEmail}
                  validationMessage="Email invalido"
                  ref="emailInput"
                  />
                <Button bsSize="lg"
                  id="bid-submit-button"
                  className="form-control"
                  onClick={this.handleSubmit.bind(this)}
                  disabled={this.state.sent}
                  >
                    {this.state.buttonText}
                </Button>
              </Col>
            </Col>
          </div>
        </div>
    )
    }
  }
