import React from 'react';
import {Row, Col, Image ,Navbar,
  Nav, NavItem, Glyphicon, OverlayTrigger,
  Popover, NavDropdown, MenuItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {ProductsPopover} from './ProductsPopover.jsx';
import './styles/AppBar.scss';
import {CategoryRepository} from '../../repositories/category.js'

export class AppBar extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      showSelect: false,
      categories: []
    }
    this.rep = new CategoryRepository()
  }

  componentDidMount() {
    this.rep.getAllCategories().then(categories => {
      this.setState({categories})
      console.log(categories)
    }
      
  )
  }
  toggleSelect() {
    this.setState({showSelect: !this.state.showSelect})

  }
  render() {
    let navbarStyle = {
      backgroundColor: 'white'
    }
    let headerStyle= {
      backgroundColor:'#81D4FA',
      height:55
    }

    let categoriesPopover = (
      <Popover id="categoriesPopover" title="Categorias">
        <ProductsPopover />
      </Popover>
    )

    let brandStyle={
      marginLeft: 0
    }

    let select = null;


    select = <ProductsPopover />



      return (
        <div className="container-fluid">
          <Row className="hidden-sm hidden-xs">
            <Link to="/">
            <Col xs={12} md={2} mdOffset={2} className="no-padding" >
              <Image src="/img/logo.png" responsive/>
            </Col>
            <Col xs={12} md={2} className="logo-text" >
              <h1 id="art-lazer-title">
                Art & Lazer 
              </h1>
              <h1 id="art-lazer-text">
                Ambientes externos
              </h1>
            </Col>
          </Link>
            <Col xs={12} md={6}>
              <Nav bsStyle="pills">
                <NavDropdown  id="myNav" title="Categorias" className="menu-item">
                  {this.state.categories.map(c => (
                    <MenuItem>
                      <Link to={'/categoria/'+c.name}>
                        {c.name}
                      </Link>
                      </MenuItem>
                  ))}
                </NavDropdown>
                  <NavItem className="menu-item"><Link to="/localizacao">Localização</Link></NavItem>
                  <NavItem className="menu-item"><Link to="/orcamento">Meus Produtos</Link></NavItem>
                  <NavItem className="menu-item"><Link to="/contato">Contato</Link></NavItem>
                </Nav>
              </Col>
            </Row>
            <Row className="visible-xs visible-sm hidden-lg hidden-md">
              <Navbar  collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a>Art & Lazer</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavDropdown eventKey={3} title="Categorias" id="basic-nav-dropdown">
                      {this.state.categories.map(c => (
                        <MenuItem>
                          <Link to={'/categoria/'+c.name}>
                            {c.name}
                          </Link>
                        </MenuItem>
                      ))}

                    </NavDropdown>
                    <NavItem href="/#/orcamento"><Link to="/orcamento">Meus Produtos</Link></NavItem>
                    <NavItem href="/#/localizacao"><Link to="/localizacao">Localização</Link></NavItem>
                    <NavItem href="/#/contato"><Link to="/contato">Contato</Link></NavItem>

                  </Nav>
                  <Nav pullRight>

                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Row>
          </div>
      )

  }
}
