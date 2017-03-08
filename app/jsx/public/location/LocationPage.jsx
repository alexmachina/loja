import React from 'react'
import {Col, Row} from 'react-bootstrap'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

export class LocationPage extends React.Component {
  componentDidMount() {
  }
  render() {
    const GettingStartedGoogleMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={17}
        defaultCenter={{ lat: -23.6438409, lng:-46.8452426 }}
        onClick={props.onMapClick}
      >
        {props.markers.map((marker, index) => (
          <Marker
            {...marker}
            onRightClick={() => props.onMarkerRightClick(index)}
          />
        ))}
      </GoogleMap>
    ));

    let markers = [
      <Marker />
    ]
    return (
      <div className="container">
        <Row>
          <Col xs={12} className="text-center">
            <h1>Localização</h1>
            <iframe id="mapiFrame" frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=Rua%20eugenio%20manoel%20de%20oliveira%2C%20216&key=AIzaSyB15_zdGasATMD42y_x5uuqDvxiDjmB22g" allowfullscreen></iframe>
          </Col>
        </Row>
      </div>
    )
  }
}
