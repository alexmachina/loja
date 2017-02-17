import React from 'react';
import {Navbar, Nav, NavItem, Glyphicon, OverlayTrigger, Popover, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router';
import {ProductsPopover} from './ProductsPopover.jsx';
import './styles/AppBar.scss';

export class AppBar extends React.Component {
  constructor(props){
    super(props);
    this.state = { showSelect: false }
  }

  componentDidMount() {
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
        <Navbar id="menu" style={navbarStyle}>
          <Navbar.Header  style={headerStyle}>
            <Navbar.Brand>
              <Link to="/home" style={brandStyle}  id="brand-link">Artelazer</Link>
            </Navbar.Brand>
            <Navbar.Toggle></Navbar.Toggle>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>

              <NavDropdown title="Produtos" className="menu-item" id="theId">
                {select}
              </NavDropdown>
              <NavItem className="menu-item"href="/#/ambientes">Ambientes</NavItem>
              <NavItem className="menu-item"href="/#/localizacao">Localizacao</NavItem>
              <NavItem className="menu-item" href="/#/registrar">Registrar-se</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem className="menu-item" href="/#/orcamento">
                Meus produtos
                <Glyphicon glyph="shopping-cart"></Glyphicon>
              </NavItem>
              <NavItem className="menu-item">
                Login
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )

  }
}
