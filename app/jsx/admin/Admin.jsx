import {Link} from 'react-router';
import React from 'react';
import Cookies from 'js-cookie';

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
          <h1><Link to="/products">Products</Link></h1>
          {this.props.children}
        </div>
      )
    }

    return render;
  }
}

