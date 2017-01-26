import {Link} from 'react-router';
import React from 'react';
import Cookies from 'js-cookie';
import { Nav, NavItem, Navbar} from 'react-bootstrap'; 
export class Admin extends React.Component {
  onLogin(authorization) {
    this.setState({authorization: authorization})
  }

  constructor(props) {
    super(props);
    this.state = {authorization: ''};
  }
  render() {
    let render = null;
    if(!this.state.authorization && !Cookies.get('authorization') ) {
      render = <LoginForm onLogin={this.onLogin.bind(this)} />
    }
    else {
      render = (
        <div className="container">
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
          </Nav>
        </Navbar.Collapse>
        </Navbar>
          {this.props.children}
        </div>
      )
    }

    return render;
  }
}

