import React from 'react';
import {CategoryRepository} from '../../repositories/category.js';
import {Jumbotron, Col, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {Input} from '../components/Input.jsx';

export class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      canSubmit: false
    }
    this.rep = new CategoryRepository();
  }

  componentDidMount() {
    let id = this.props.params.id;
    if(id)
      this.rep.getCategory(id, category => {
        this.setState(category);
      })
  }

  validateState() {
    let isValid = true;

    if(!this.state.name)
      isValid = false;

    if(!this.state.description)
      isValid = false

     return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.validateState()) {
      let id = this.props.params.id;
      if(!id) {
        this.rep.addCategory(this.state, (err) =>{
          if(!err)
            alert("Added");
        })
      } else {
        this.rep.updateCategory(id, this.state, err => {
          if(!err)
            alert("Upated");
          else
            console.log(err);
        })
      }
    } else {
      this.setState({validationMessage: 'Form is invalid, please check all fields and re-submit'});
    }
  }



  onNameChange(e) {
    this.setState({name: e.target.value});
  }

  onDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  isRequired(value) {
    return value ? true : false;
  }

  render() {
    let headerText = this.state._id ? this.state.name : 'New Category';
    let validationMessage = this.state.validationMessage
    ? <span>{this.state.validationMessage}</span>
    : null;

    return (
      <div>
          <div className="row">
          <Jumbotron>
            <h1 className="text-center">{headerText}</h1>
          </Jumbotron>
        </div>
        <div className="row">
          <div className="center-block">
            <form onSubmit={this.onSubmit.bind(this)} className="center-block">
              <Input label="Nome"
                onChange={this.onNameChange.bind(this)}
                value={this.state.name}
                validationMessage="This field is required"
                validationFunction={this.isRequired.bind(this)}

                />
              <Input label="Description"
                onChange={this.onDescriptionChange.bind(this)}
                value={this.state.description}
                validationMessage="This field is required"
                validationFunction={this.isRequired.bind(this)}
                />
              <div>
                {validationMessage}
              </div>
              <FormGroup>
                <div className="center-block">
                  <Button className="add-button " bsSize="lg" type="submit">Save</Button>
                </div>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>)
  }
}
