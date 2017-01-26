import React from 'react';
import {AmbienceRepository} from '../../repositories/ambience';
import {Button, Table} from 'react-bootstrap';
import {Link} from 'react-router';

export class AmbienceTable extends React.Component{
  constructor(props) {
    super(props);
    this.rep = new AmbienceRepository('http://localhost', 3000);
    this.state = {
      message: "",
      ambiences: []
    }

  }

  componentDidMount() {
    this.rep.getAmbiences((err, ambiences) => {
      if(!err) {
        this.setState({ambiences: ambiences});
      }
    })

  }
  render() {
    let tbody = this.state.ambiences.map(a => {
      return (
        <tr>
          <td>{a.name}</td>
          <td>{a.description}</td>
          <td>{a.active}</td>
          <td>
            <Link to={"/ambience/"+a._id}>
              <Button type="default">
                Editar
              </Button>
            </Link>
          </td>
        </tr>

      )

    });
    console.log(tbody);
    return (
      <div>
        <div>
          <Link to="/ambience">
            <Button>Novo</Button>
          </Link>
        </div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ativo</th>
              <th>Ações</th>
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
