import {Link} from 'react-router';
import React from 'react';
import Cookies from 'js-cookie';
import { Nav, NavItem, Navbar, Button} from 'react-bootstrap';
import {LoginForm} from './users/LoginForm.jsx';
export class Admin extends React.Component {
  onLogin(authorization) {
    this.setState({authorization: authorization})
  }

  constructor(props) {
    super(props);
    this.state = {authorization: ''};
  }

  handleLogoffClick() {
    Cookies.remove('authorization');
    window.location = '/#/admin';

  }
  render() {
    let render = null;
    if(!this.state.authorization || !Cookies.get('authorization') ) {
      render = <LoginForm onLogin={this.onLogin.bind(this)} />
    }
    else {
      render = (
        <div className="container" style={{fontFamily: 'arial'}}>
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                Admin
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/#/products">Products</NavItem>
            <NavItem eventKey={2} href="/#/ambiences">Ambiences</NavItem>
            <NavItem eventKey={3} href="/#/sales">Sales</NavItem>
            <NavItem href="/#/categories">Categories</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem><Button onClick={this.handleLogoffClick.bind(this)}>Logoff</Button></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div >
        {this.props.children}
      </div>
    </div>
      )
    }

    return render;
  }
}
