import React from 'react';
import {Row, Col, FormGroup,
  FormControl, ControlLabel, 
  Button} from 'react-bootstrap'
import './styles/styles.scss'
import {ContactRepository} from  '../../repositories/contact.js'
import {Input} from '../../components/Input.jsx'
import ContactFormStore from '../../stores/contactFormStore.js'

export class ContactPage extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
      buttonText: 'Enviar',
      buttonDisabled: false,
      formSubmited: false,
      sent: false
    }

    this.rep = new ContactRepository()


  }
  validateName(name) {
    if(name)
      return true
    else
      return false
  }

  validateEmail(email) {
    if(email)
      return true
    else
      return false
  }

  validateSubject(subject) {
    if(subject)
      return true
    else
      return false
  }

  validateMessage(message) {
    if(message) 
      return true
    else
      return false
  }

    onNameChange(e) {
    if(e.target.value.length < 50)
      this.setState({name: e.target.value})
  }

  onEmailChange(e) {

    if(e.target.value.length < 50)
      this.setState({email: e.target.value})
  }

  onSubjectChange(e) {

    if(e.target.value.length < 50)
      this.setState({subject: e.target.value})
  }
  onMessageChange(e) {

    if(e.target.value.length < 50)
      this.setState({message: e.target.value})
  }
  
  validateState() {
    let isValid = true
    if(!this.state.name) 
      isValid = false
    if(!this.state.email)
      isValid = false
    if(!this.state.subject)
      isValid = false

    return isValid
  }

  onSubmit(e){
    e.preventDefault()

    this.refs.nameInput.onBlur(this.state.name)
    this.refs.emailInput.onBlur(this.state.email)
    this.refs.subjectInput.onBlur(this.state.subject)

    if(this.validateState()) {
      if(!this.state.formSubmited) {
        this.setState({buttonText: 'Enviando...',
          buttonDisabled: true})

        this.rep.sendContactMessage(this.state).then(() => {
          this.setState({ 
            formSubmited: true,
            buttonText: 'Mensagem Enviada',
            buttonDisabled: false

          })

        }).catch(err => console.log(err))
      }
    }
  }
  render() {
    return (
      <div  id="bid-form" className="container">
        <Col xs={12} className="text-center">
          <h1>Contato</h1>
          <h2>Envie-nos uma mensagem!</h2>
        </Col>
        <Row>
          <Col id="bid-form-padding" xs={12} >
            <Col xs={12} md={8} mdOffset={2} id="bid-form-padding">
              <form onSubmit={this.onSubmit.bind(this)}>
                <FormGroup>
                  <Input type="text"
                    label="Nome"
                    onChange={this.onNameChange.bind(this)}
                    validationFunction={this.validateName.bind(this)}
                    validationMessage="Obrigatório"
                    ref="nameInput"
                  />
                </FormGroup>
                <FormGroup>
                  <Input type="email"
                    label="Email"
                    onChange={this.onEmailChange.bind(this)}
                    validationFunction={this.validateEmail.bind(this)}
                    validationMessage="Obrigatório"
                    ref="emailInput"
                  />
                </FormGroup>
                <FormGroup>
                  <Input 
                    label="Assunto"
                    type="text"
                    onChange={this.onSubjectChange.bind(this)}
                    validationFunction={this.validateSubject.bind(this)}
                    validationMessage="Obrigatório"
                    ref="subjectInput"
                  />
                </FormGroup>

                <Row>
                  <FormGroup>
                    <ControlLabel>Mensagem</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      onChange={this.onMessageChange.bind(this)}
                      value={this.state.message}
                    />
                  </FormGroup>
                </Row>
                <Col xs={12} className="text-center">
                  <Button bsSize="lg"
                    type="submit"
                    id="bid-submit-button"
                    disabled={this.state.buttonDisabled}
                  >
                    {this.state.buttonText}
                  </Button>
                </Col>
              </form>
            </Col>
          </Col>
        </Row>

      </div>

    )
  }
}
