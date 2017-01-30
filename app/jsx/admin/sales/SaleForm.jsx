import React from 'react';
import {Button, Table, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {SaleRepository} from '../../repositories/sale.js';

export class SaleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      name: '',
      description: '',
      active: false,
      link: '',
      mainImage: ''
    }

    this.rep = new SaleRepository('http://localhost', 3000);
  }

  componentDidMount(){
    let id = this.props.params.id;

    if(id){
      this.rep.getSale(id, (err, sale) => {
        if(!err)
          this.setState(sale);
      })
    }
  }
  onSubmit(e) {
    e.preventDefault();
    let id = this.props.params.id;

    if(id){
      this.rep.updateSale(id, this.state, (err) => {
        if (!err) {
          this.rep.getSale(id, (err, sale) => {
            if(!err)
              this.setState(sale);
          });
        }
      })
    } else {
      this.rep.addSale(this.state, (err) => {
        if(!err)
          alert("Saved!");
        else
          console.log(err);
      })
    }
  }

  onMainImageChange(e) {
    this.setState({mainImage: e.target.files[0]});
  }

  onNameChange(e) {
    this.setState({name: e.target.value});
  }

  onDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  onLinkChange(e) {
    this.setState({link: e.target.value});
  }

  onActiveChange(e) {
    this.setState({active: !this.state.active})
  }

  render(){
    let image = typeof this.state.mainImage == 'string' ? <img src={'/img/sales/'+ this.state.mainImage}
            className="img img-responsive" /> : null

    return (
      <form className="col-md-6" onSubmit={this.onSubmit.bind(this)}>
        <FormGroup>
          <ControlLabel>Nome</ControlLabel>
          <FormControl type="text"
            placeholder="Nome"
            onChange={this.onNameChange.bind(this)}
            value={this.state.name}>
          </FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl type="text"
            placeholder="Description"
            onChange={this.onDescriptionChange.bind(this)}
            value={this.state.description}>
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Link</ControlLabel>
          <FormControl type="text"
            placeholder="Link"
            onChange={this.onLinkChange.bind(this)}
            value={this.state.link}>
          </FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Ativa</ControlLabel>
          <FormControl type="checkbox"
            onChange={this.onActiveChange.bind(this)}
            checked={this.state.active}
            value={this.state.active}>

          </FormControl>
        </FormGroup>

        <FormGroup>
          <FormControl type="file"
            onChange={this.onMainImageChange.bind(this)}
          ></FormControl>
          {image}
                  </FormGroup>
        <FormGroup>
          <Button type="submit">Salvar</Button>
        </FormGroup>
      </form>
    )
  }
}
