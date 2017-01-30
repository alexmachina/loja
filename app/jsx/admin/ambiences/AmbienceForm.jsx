import React from 'react';
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {AmbienceRepository} from '../../repositories/ambience.js';

export class AmbienceForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      mainImage: '',
      images: ''
    }

    this.rep = new AmbienceRepository('http://localhost', 3000);
    
  }
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

  componentDidMount() {
    if(this.props.params.id) {
      this.rep.getAmbience(this.props.params.id, (err, ambience) => {
        this.setState(ambience);
      });
    }

  }

  onSubmit(e) {
    e.preventDefault();
    let id = this.props.params.id ? this.props.params.id : null;

    if(id) {
      this.rep.updateAmbience(id, this.state, err => {
        if(!err){
          this.rep.getAmbience(id, (err, ambience) => {
            if(!err)
              this.setState(ambience);
          });
        } else {
          console.log(err);
        }
      })
    } else {
      this.rep.addAmbience(this.state, err => {
        if(!err){
          alert("OK");
        }
      });
    }

  }

  render() {
    let images = null;
    let mainImage = null;

    if(this.state.mainImage && typeof this.state.mainImage == 'string'){
      mainImage = <img src={'img/ambiences/'+this.state.mainImage} 
        className="col-md-6 img img-responsive"
      />
    }
    if(this.state.images.map){
      images = this.state.images.map(img => {
        return (
          <li key={img}>
            <img src={'img/ambiences/'+img}
              className="img img-responsieve col-md-6"
            />
          </li>
        );
      });
    }
    return (
      <div>
        <form className="col-md-6" onSubmit={this.onSubmit.bind(this)}>
          <FormGroup>
            <ControlLabel>Nome</ControlLabel>
            <FormControl type="text" 
              placeholder="nome"
              onChange={this.onNameChange.bind(this)}
              value={this.state.name}
            ></FormControl>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Descrição</ControlLabel>
            <FormControl type="text"
              placeholder="Descrição"
              onChange={this.onDescriptionChange.bind(this)}
              value={this.state.description}
            ></FormControl>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Imagem Principal</ControlLabel>
            {mainImage}
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

          <FormGroup>
            <Button className="col-md-12" id="ambience-submit-button" type="submit">Salvar</Button>
          </FormGroup>
        </form>
        <div className="col-md-6 image-gallery">
          <ul className="gallery">
            {images}
          </ul>


        </div>
      </div>
    )
  }
}
