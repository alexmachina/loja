import React from 'react';
import {Col, Jumbotron} from 'react-bootstrap';

export class Header extends React.Component {
  render() {
    return(
    <div className="container">
      <Jumbotron style={{backgroundColor:'white'}}>
        <h1>{this.props.title}</h1>
      </Jumbotron>
    </div>
  )
  }
}
