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

    console.log(isValid);
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
    }
  }

  onInvalid() {
    this.setState({
      canSubmit: false
    })
  }

  onNameChange(e) {
    this.setState({name: e.target.value});
  }

  onDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  validateName(name) {
    return name ? true : false;
  }

  render() {
    let headerText = this.state._id ? this.state.name : 'New Category';
    return (
      <div>
        <Col xs={12}>
          <Jumbotron>
            <h1 className="text-center">{headerText}</h1>
          </Jumbotron>
        </Col>
        <form onSubmit={this.onSubmit.bind(this)}>
            <Input label="Nome"
              onChange={this.onNameChange.bind(this)}
              value={this.state.name}
              validationMessage="this field is required"
              validate={this.validateName.bind(this)}
              onInvalid={this.onInvalid.bind(this)}
            />
            <Input label="Description"
              onChange={this.onDescriptionChange.bind(this)}
              value={this.state.value}
              validationMessage="This field is required"
              validate={this.validateName.bind(this)}
              onInvalid={this.onInvalid.bind(this)} />
            
        <FormGroup>
          <Button type="submit">Save</Button>
        </FormGroup>
      </form>
    </div>)
  }
}
