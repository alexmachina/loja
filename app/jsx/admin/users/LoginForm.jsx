import React from 'react';
import {UserRepository} from '../../repositories/user.js';
import Cookies from 'js-cookie';


export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user:{username: '', password: ''}};
    this.repository = new UserRepository('localhost',3000);
  }

  onUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.repository.login(this.state, (err, auth) => {
      if(!err) {
        Cookies.set('authorization', auth);
        this.props.onLogin(auth);

      } else {
        alert(err);
      }
    });
  }

  render() {
    return(
      <div className="col-xs-12 col-md-3" id="login-form">
        <form>
          <div className="fieldset">
            <label>Username</label>
            <input type="text" value={this.state.username} 
              onChange={this.onUsernameChange.bind(this)}
               className="form-control" />
          </div>

          <div className="fieldset">
            <label>Password</label>
            <input type="password" value={this.state.password} 
              onChange={this.onPasswordChange.bind(this)}
               className="form-control" />
          </div>

          <div className="fieldset">
            <button id="login-button" 
              className="btn btn-default form-control" 
              onClick={this.onSubmit.bind(this)}
            >Login</button>
          </div>

          
        </form>
      </div>)
  }
}


