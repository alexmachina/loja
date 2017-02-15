import React from 'react';
import {Col, Image} from 'react-bootstrap';
import {AmbienceRepository} from '../../repositories/ambience.js';

export class AmbiencesPage extends React.Component{
  constructor(props){
    super(props);
    this.rep = new AmbienceRepository('http://localhost', 3000);
    this.state = {ambiences: []}
  }

  componentDidMount() {
    this.rep.getAmbiences(1, (err, ambiences) => {
      if(!err) {
        this.setState({ambiences: ambiences});
      } else {
        console.log(err);
      }
    })
  }


  render() {
      let ambiences = this.state.ambiences.map(a => {

      return (
        <Col xs={12} sm={6} md={4} key={a._id}>
                <Image className="ambience-strip-image img-responsive" rounded src={'/img/ambiences/'+a.mainImage} />
                <h3>{a.name}</h3>
        </Col>
      )
    });

    return (
      <div>
        <h1 className="text-center">Ambientes</h1>
          <div className="row">
            {ambiences}
          </div>
      </div>
    )

  }
}
