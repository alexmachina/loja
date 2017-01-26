import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export class AmbienceForm extends React.Component{
  onNameChange(e) {
    this.setState({name: e.target.value});
  }

  onDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  onImagesChange(e) {
    this.setState({images: e.target.files});
  }

  onMainImageChange(e) {
    this.setState({mainImage: e.target.files[0]});
  }


  render() {
    return (
      <div>
        <form className="col-md-6">
          <FormGroup>
            <ControlLabel>Nome</ControlLabel>
            <FormControl type="text" 
              placeholder="nome"
              onChange={this.onNameChange}
            ></FormControl>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Descrição</ControlLabel>
            <FormControl type="text"
              placeholder="Descrição"
              onChange={this.onDescriptionChange}
            ></FormControl>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Imagem Principal</ControlLabel>
            <FormControl type="file"
            onChange={this.onMainImageChange.bind(this)}>
            </FormControl>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Imagens</ControlLabel>
            <FormControl type="file" multiple
              onChange={this.onImagesChange.bind(this)}
            ></FormControl>
          </FormGroup>
        </form>
      </div>
    )
  }
}
