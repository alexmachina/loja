import React from 'react';
import '../../../css/footer.scss';
import {Col, Glyphicon} from 'react-bootstrap';
export class Footer extends React.Component {
  render() {
    return (
    <div className="container-fluid footer">
      <Col xs={12} sm={8}>
        <h1 className="footer-heading">Artelazer</h1>
        <h3>www.artelazermoveis.com.br</h3>
        <h3>Av. Elias Yazbek, 675 - Centro - Embu das Artes - SP</h3>
      </Col>
      <Col xs={12} sm={4} className="text-right">
        <h3><Glyphicon glyph="envelope" / > artelazer@outlook.com</h3>
        <h3><Glyphicon glyph="earphone" />(11) 4321-1178</h3>
        <h3><Glyphicon glyph="phone" />(11) 94764-7445</h3>
      </Col>
    </div>
  )
  }
}
