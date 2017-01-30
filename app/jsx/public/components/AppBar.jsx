import React from 'react';
import {Navbar, Nav, NavItem, Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router';

export class AppBar extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="container-fluid">
        <Navbar id="menu">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/home" id="brand-link">Artelazer</Link>
            </Navbar.Brand>
            <Navbar.Toggle></Navbar.Toggle>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem className="menu-item" href="/#/produtos">Produtos</NavItem>
              <NavItem className="menu-item"href="/#/ambientes">Ambientes</NavItem>
              <NavItem className="menu-item"href="/#/promocoes">Promoções</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem className="menu-item">
                Meus produtos
                <Glyphicon glyph="shopping-cart"></Glyphicon>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )

  }
}
