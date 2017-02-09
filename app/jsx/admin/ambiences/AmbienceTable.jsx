import React from 'react';
import {AmbienceRepository} from '../../repositories/ambience';
import {Button, Table, Col, Pagination} from 'react-bootstrap';
import {Link} from 'react-router';

export class AmbienceTable extends React.Component{
  constructor(props) {
    super(props);
    this.rep = new AmbienceRepository('http://localhost', 3000);
    this.state = {
      message: "",
      ambiences: [],
      activePage: 1,
      maxPages: 0
    }

  }

  handleSelect(page) {
    this.rep.getAmbiences(page, (err, ambiences) => {
      if(!err) {
        this.setState({ambiences: ambiences,
                      activePage: page
        });

      }
    })

  }

  componentDidMount() {
    this.rep.getAmbiences(this.state.activePage, (err, ambiences) => {
      if(!err) {
        this.rep.getAmbiencesCount((err, count) => {
          if(!err) {
            let maxPages = Math.ceil((count/10));
            this.setState({ambiences: ambiences,
              maxPages: maxPages
            });
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);

      }

    })
  }
  render() {
    let tbody = this.state.ambiences.map(a => {
      return (
        <tr key={a._id}>
          <td>{a.name}</td>
          <td>{a.description}</td>
          <td>{a.active ? 'S' : 'N'}</td>
          <td>
            <Link to={"/ambience/"+a._id}>
              <Button>
                Editar
              </Button>
            </Link>
          </td>
        </tr>

      )

    });
    return (
      <div>
        <div className="row">
          <Col md={6}>
            <Pagination
              bsSize="medium"
              items={this.state.maxPages}
              activePage={this.state.activePage}
              onSelect={this.handleSelect.bind(this)} >
            </Pagination>
          </Col>
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
