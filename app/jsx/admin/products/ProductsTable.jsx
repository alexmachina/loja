import React from 'react';
import {Link} from 'react-router';
import {ProductRepository} from '../../repositories/product.js';

export class ProductsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {products: []};
  }

  componentDidMount() {
    this.refreshTable();
  }
  refreshTable() {
    let rep = new ProductRepository('localhost', 3000);
    rep.all((err, products) => {
      if (err) {
        this.setState({error: err});
      }
      else {
        this.setState({products: products});
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
          <td>
            <Link to={'/product/' + p._id}>
              <button className="btn btn-default">Edit</button>
            </Link>

          </td>
        </tr>
      )
    })
    return (
      <div className="container">
        <div className="row">
          <Link to="/product">
            New
          </Link>
        </div>
        <div className="row">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Active</th>
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
