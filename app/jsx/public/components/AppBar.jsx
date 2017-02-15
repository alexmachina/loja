import React from 'react';
import {Navbar, Nav, NavItem, Glyphicon, OverlayTrigger, Popover} from 'react-bootstrap';
import {Link} from 'react-router';
import {ProductsPopover} from './ProductsPopover.jsx';

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

    if(this.state.showSelect) {
      select = <ProductsPopover />


    }
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
              <NavItem className="menu-item hidden-xs" href="">
                <OverlayTrigger trigger="click" placement="bottom" overlay={categoriesPopover}>
                  <span>Produtos</span></OverlayTrigger>
              </NavItem>
              <NavItem className="menu-item hidden visible-xs">
                <span onClick={this.toggleSelect.bind(this)}>Produtos</span>
                {select}
              </NavItem>
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
