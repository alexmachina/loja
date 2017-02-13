import React from 'react';
import {AmbienceRepository} from '../../repositories/ambience.js';
import {Col, Image} from 'react-bootstrap';

export class AmbiencesStrip extends React.Component {
  constructor(props) {
    super(props);
    this.rep = new AmbienceRepository('http://localhost',3000);
    this.state = {ambiences: []};
  }

  componentDidMount() {
    this.rep.getActiveAmbiences((err, ambiences) => {
      if(!err)
        this.setState({ambiences: ambiences});
      else
        console.log(err);
    });
  }
  render() {
    let ambiences = null;
    let colStyle = {backgroundColor:'#fff3'};
    ambiences = this.state.ambiences.map(a => {
      return (
        <Col xs={12} sm={6} md={4} style={colStyle}>
                <Image className="ambience-strip-image img-responsive" rounded src={'/img/ambiences/'+a.mainImage} />
        </Col>
      )
    });

    return (
      <div>
        <h1 className="text-center">Ambientes</h1>
        {ambiences}
      </div>
    )
  }
}
