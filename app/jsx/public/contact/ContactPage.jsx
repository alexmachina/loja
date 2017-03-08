import React from 'react';
import {Row, Col, FormGroup,
  FormControl, ControlLabel, 
  Button} from 'react-bootstrap'
import './styles/styles.scss'
import {ContactRepository} from  '../../repositories/contact.js'

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
  getNameValidationState() {
    if (this.state.name) {
      return 'success'
    } else {
      return 'error' 
    }
  }
  getEmailValidationState() {
    if(this.state.email)
      return 'success'
    else
      return 'error'
  }

  getSubjectValidationState() {
    if(this.state.subject)
      return 'success'
    else
      return 'error'
  }

  getMessageValidationState() {
    if(this.state.message)
      return 'success'
    else
      return 'error'
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

  onSubmit(e){
    e.preventDefault()
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
  render() {
    return (
      <div  id="bid-form" className="container">
        <Col xs={12} className="text-center">
          <h1>Contato</h1>
          <h2>Envie-nos uma mensagem!</h2>
        </Col>
        <Row>
          <Col xs={12} id="bid-form-padding">
            <form onSubmit={this.onSubmit.bind(this)}>
              <FormGroup 
                controlId="nameInput"
                validationState={this.getNameValidationState()}
              >
                <ControlLabel>Nome</ControlLabel>
                <FormControl
                  onChange={this.onNameChange.bind(this)}
                  value={this.state.name}
                  placeholder="Seu nome..."
                />
              </FormGroup>
              <FormGroup
                controlId="emailInput"
                validationState={this.getEmailValidationState()}
              >
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  onChange={this.onEmailChange.bind(this)}
                  value={this.state.email}
                  placeholder="Seu email..."
                />
              </FormGroup>
              <FormGroup
                controlId="subjectInput"
                validationState={this.getSubjectValidationState()}
              >
                <ControlLabel>Assunto</ControlLabel>
                <FormControl
                  onChange={this.onSubjectChange.bind(this)}
                  value={this.state.subject}
                  placeholder="Assunto..."
                />
              </FormGroup>

              <FormGroup
                controlId="messageInput"
                validationState={this.getMessageValidationState()}
              >
                <ControlLabel>Mensagem</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  onChange={this.onMessageChange.bind(this)}
                  value={this.state.message}
                />
              </FormGroup>
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
        </Row>

      </div>

    )
  }
}
