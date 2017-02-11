import React from 'react';
import {Col, Jumbotron,Glyphicon, Pagination, Table, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import {SaleRepository} from '../../repositories/sale.js';
import {SearchField} from '../components/SearchField.jsx';

export class SaleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      activePage: 1,
      maxPages: 0,
      search: ''
    }

    this.rep = new SaleRepository('http://localhost', 3000);
  }

  componentDidMount() {
   this.refreshSales(); 
  }

  refreshSales(){
    this.rep.getSales(1,(err, sales) => {
      if(!err){
        this.rep.getSalesCount((err, count) => {
          this.setState({
            sales: sales,
            maxPages: Math.ceil(count/10)
          });
        })
      }else {
        console.log(err);
      }
    });

  }

  getSalesByPage(page) {
    this.rep.getSales(page, (err, sales) => {
      this.setState({activePage: page,
        sales: sales});
    })
  }

  handleSelect(page) {
    if(this.state.search) {
      this.searchSales(this.state.search, page);
    } else {
      this.getSalesByPage(page);
    }

  }

  searchSales(search, page) {
    this.rep.getSalesByName(search, page, (err, result) => {
      if(!err) {
        this.setState({
          activePage: page,
          maxPages: Math.ceil(result.count/10),
          sales: result.sales
        });
      }
    })
  }

  handleSearchChange(e) {
    let search = e.target.value;
    this.setState({search: search});
    if(search) {
      this.searchSales(search, 1)
    } else {
      this.refreshSales();
    }

  }

  render(){ 
    let tbody = null;

    tbody = this.state.sales.map(s => {
      return (
        <tr key={s._id}>
          <td>{s.name}</td>
          <td>{s.description}</td>
          <td>{s.active ? 'S' : 'N'}</td>
          <td>
            <Link to={'/sale/' + s._id}>
              <Button>Editar</Button>
            </Link>
          </td>
        </tr>
      )
    });
    return(
      <div>
        <Jumbotron>
          <h1 className="text-center">Sales</h1>
        </Jumbotron>
        <div className="row">
          <Col md={6}>
            <SearchField 
              handleSearchChange={this.handleSearchChange.bind(this)}
              search={this.state.search} />
          </Col>
          <Col md={6} className="text-right">
            <Link to="/sale">
              <Button bsSize="large" className="add-button">
                Add Sale <Glyphicon glyph="plus" />
              </Button>
            </Link>
          </Col>
        </div>
        <Table striped bordered >
          <thead>
            <tr>
              <td>Nome</td>
              <td>Descrição</td>
              <td>Ativa</td>
              <td>Ações</td>
            </tr>
          </thead>
          <tbody>
      {tbody}
      </tbody>
      </Table>
      <Col md={6}>
      <Pagination 
        items={this.state.maxPages}
      onSelect={this.handleSelect.bind(this)}
      activePage={this.state.activePage}
      style={{margin: 0}}
    />
  </Col>


      </div>

    )

  }
}
