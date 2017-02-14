import React from 'react';
import {Jumbotron, Col} from 'react-bootstrap';

export class Header extends React.Component {
  render() {
    let errorMessage = <h3>{this.props.error}</h3>;
      return (
        <div className="container">
          <Jumbotron style={{backgroundColor:'white'}}>
            <h1>{this.props.name}</h1>
            <h3>{this.props.description}</h3>

          </Jumbotron>
          {errorMessage}
        </div>
      )
    }
  }
