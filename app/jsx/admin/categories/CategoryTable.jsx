import React from 'react';
import {Jumbotron,InputGroup, ControlLabel, FormGroup,FormControl,Col, Glyphicon, Pagination, Table, Button} from 'react-bootstrap';
import {CategoryRepository} from '../../repositories/category.js';
import {Link} from 'react-router';
import {SearchField} from '../components/SearchField.jsx';

export class CategoryTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categories: [],
      maxPages: 0,
      activePage: 1,
      search: ''
    }
    this.rep = new CategoryRepository();

    
  }
  componentDidMount(){
    this.rep.getCategories(1, categories => {
      this.rep.getCategoriesCount((err, count) => {
        if(!err)
          this.setState({
            categories: categories,
            maxPages: Math.ceil(count/10)
          });
      });
    });
  }

  handleSearchChange(e) {
    let search = e.target.value;
    this.setState({search : e.target.value});
    if(search) {
      this.rep.getCategoriesByName(e.target.value, 1, (err, categories) => {
        this.setState({categories : categories});
      })
    }
  }

  handleSelect(page) {
    if(this.state.search) {
      this.rep.getCategoriesByName(this.state.search, page, (err, categories) => {
        this.setState({
          categories: categories,
          activePage: page
        });
      });
    } else {
      this.rep.getCategories(page, categories => {
        this.setState({
          categories: categories,
          activePage: page
        });
      })
    }
  }
  render() {
    let tbody = null;
    if(this.state.categories.length) {
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
    }
    return (
      <div>
        <Col xs={12}>
          <Jumbotron className="text-center">
            <h1>Categories</h1>
          </Jumbotron>
        </Col>

        <Col md={6}>
          <form>
            <SearchField handleSearchChange={this.handleSearchChange.bind(this)}
              search={this.state.search} />
          </form>
        </Col>
        <Col md={6} className="text-right">
          <Link to="/category">
            <Button bsSize="lg" className="add-button">
              Add Category <Glyphicon glyph="plus" /></Button>
          </Link>
        </Col>


        <Table bordered striped>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </Table>
        <div>
      <Col md={6}>
      <Pagination
      style={{margin: '0px'}}
      onSelect={this.handleSelect.bind(this)}
      items={this.state.maxPages}
      activePage={this.state.activePage}

      />

  </Col>
</div>
    </div>
    )
  }
}
