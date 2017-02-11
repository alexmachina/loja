import React from 'react';
import {AmbienceRepository} from '../../repositories/ambience';
import {Jumbotron, Glyphicon, Button, Table, Col, Pagination} from 'react-bootstrap';
import {Link} from 'react-router';
import {SearchField} from '../components/SearchField.jsx';


export class AmbienceTable extends React.Component{
  constructor(props) {
    super(props);
    this.rep = new AmbienceRepository('http://localhost', 3000);
    this.state = {
      message: "",
      ambiences: [],
      activePage: 1,
      maxPages: 0,
      search: ''
    }

  }

  handleSearchChange(e) {
    let search = e.target.value;
    this.setState({search: search});
    if(search) {
      this.searchByName(search, 1)
    } else {
      this.refreshAmbiences();
    }
  }

  searchByName(search, page) {
    this.rep.getAmbiencesByName(search, page, (err, result) => {
      if(!err) {
        this.setState({
          activePage: page,
          maxPages: Math.ceil(result.count/10),
          ambiences: result.ambiences
        })
      }
    })
  }

  handleSelect(page) {
    if(!this.state.search) {
      this.rep.getAmbiences(page, (err, ambiences) => {
        if(!err) {
          this.setState({ambiences: ambiences,
            activePage: page
          });

        }
      })
    } else {
      this.searchByName(this.state.search, page);
    }

  }
  refreshAmbiences() {
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
  componentDidMount() {
    this.refreshAmbiences();

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
          <Jumbotron>
            <h1 className="text-center">Ambiences</h1>
          </Jumbotron>
        </div>
        <div className="row">
          <Col md={6}>
            <SearchField
              handleSearchChange={this.handleSearchChange.bind(this)}
              search={this.state.search} /> 
          </Col>
          <Col md={6} className="text-right">
            <Link to="/ambience">
              <Button className="add-button" bsSize="lg">
                Add Ambience <Glyphicon glyph="plus" />
              </Button>
            </Link>
          </Col>
        </div>
        <Table style={{marginTop: '20px'}} striped bordered condensed hover>
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
        <Col md={6}>
          <Pagination
            bsSize="medium"
            items={this.state.maxPages}
            activePage={this.state.activePage}
            onSelect={this.handleSelect.bind(this)} 
            style={{margin: '0'}}
          >

        </Pagination>
      </Col>

    </div>
    )
  }
}
