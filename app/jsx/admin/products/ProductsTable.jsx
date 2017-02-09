import React from 'react';
import {Link} from 'react-router';
import {Glyphicon ,Col, Pagination, Button} from 'react-bootstrap';
import {ProductRepository} from '../../repositories/product.js';

export class ProductsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      activePage: 1,
      maxPages: 0
      
    };
  }

  componentDidMount() {
    this.refreshTable(1);
  }

  handleSelect(page) {
    this.setState({activePage: page});
    this.refreshTable(page);
  }

  
  refreshTable(page) {
    let rep = new ProductRepository('localhost', 3000);
    rep.all(page, (err, products) => {
      if (err) {
        this.setState({error: err});
      }
      else {
        rep.getProductsCount((err, count) => {
          if(!err){
            this.setState({products: products,
              maxPages:Math.ceil(count/10)
            });
          } else {
            console.log(err);
          }
        })

      }
    });

  }
  render() {
    const tbody = this.state.products.map(p => {
      return(
        <tr key={p._id}>
          <td>{p.name}</td>
          <td>{p.price}</td>
          <td>{p.active ? 'S' : 'N'}</td>
          <td>{p.featured ? 'S' : 'N'}</td>
          <td>
            <Link to={'/product/' + p._id}>
              <button className="btn btn-default">Edit</button>
            </Link>

          </td>
        </tr>
      )
    });

    const paginationStyle = {
      margin:0
    }
    return (
      <div className="container">
        <div className="row">
          <Col md={6}>
            <Pagination
              style={paginationStyle}
              bsSize="medium"
              items={this.state.maxPages}
              activePage={this.state.activePage}
              onSelect={this.handleSelect.bind(this)} />
          </Col>
          <Col className="text-right" md={6}>
            <Link to="/product">
              <Button 
                bsSize="large"
                bsStyle="primary"
                style={{'margin-right':'15px'}}
              ><Glyphicon glyph="plus" /></Button>
            </Link>
          </Col>

        </div>
        <div className="row">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Active</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tbody}
            </tbody>


          </table>
        </div>
      </div>
    )
  }
}
