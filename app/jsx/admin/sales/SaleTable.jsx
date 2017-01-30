import React from 'react';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import {SaleRepository} from '../../repositories/sale.js';

export class SaleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: []
    }

    this.rep = new SaleRepository('http://localhost', 3000);
  }

  componentDidMount() {
    this.rep.getSales((err, sales) => {
      if(!err)
        this.setState({sales: sales});
    });

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
        <div>
          <Link to="/sale">
            <Button>Novo</Button>
          </Link>
        </div>
        <Table striped bordered condensed hover>
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

      </div>

    )

  }
}
