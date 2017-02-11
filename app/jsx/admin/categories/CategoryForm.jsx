import React from 'react';
import {CategoryRepository} from '../../repositories/category.js';
import {Jumbotron, Col, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

export class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
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

  onSubmit(e) {
    e.preventDefault();
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

  onNameChange(e) {
    this.setState({name: e.target.value});
  }

  onDescriptionChange(e) {
    this.setState({description: e.target.value});
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
          <FormGroup>
            <ControlLabel>Nome</ControlLabel>
            <FormControl ref="nameInput" type="text"
              placeholder="Nome"
              onChange={this.onNameChange.bind(this)}
              value={this.state.name}
            >
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Descrição</ControlLabel>
            <FormControl type="text"
              placeholder="Descrição"
              onChange={this.onDescriptionChange.bind(this)}
              value={this.state.description}>
            </FormControl>
          </FormGroup>

          <FormGroup>
            <Button type="submit">Save</Button>
          </FormGroup>
        </form>
      </div>)
  }
}
