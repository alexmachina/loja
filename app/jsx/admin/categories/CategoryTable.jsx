import React from 'react';
import {Table, Button} from 'react-bootstrap';
import {CategoryRepository} from '../../repositories/category.js';
import {Link} from 'react-router';

export class CategoryTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {categories: []}
    this.rep = new CategoryRepository();

    
  }
  componentDidMount(){
    this.rep.getCategories(categories => {
      this.setState({categories: categories});
    });

  }
  render() {
    let tbody = null;
    tbody = this.state.categories.map(c => {
      return (
        <tr key={c._id}>
          <td>{c.name}</td>
          <td>{c.description}</td>
          <td>
            <Link to={'/category/'+c._id}>
              <Button>Editar</Button>
            </Link>
          </td>
        </tr>)
    })

    return (
      <div>
        <div>
          <Link to="/category">
            <Button>Novo</Button>
          </Link>
        </div>
        <Table bordered striped>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </Table>
      </div>
    )
  }
}
