import React from 'react';
import {AmbienceRepository} from '../../repositories/ambience.js';
import ImageGallery from 'react-image-gallery';
import {Col} from 'react-bootstrap';

export class AmbiencePage extends React.Component {
  constructor(props){
    super(props);
    this.state = { ambience: {
      images:[],
      mainImage:''
    }}
    this.rep = new AmbienceRepository('http://localhost', 3000);
  }

  componentDidMount() {
    this.rep.getAmbienceByName(this.props.params.name, (err, ambience) => {
      if(!err){
        this.setState({ambience: ambience});
      } else {
        console.log(err);
      }
    })
  }

  render() {
    let images = [];
    if(this.state.ambience && this.state.ambience.mainImage){
      images.push({
        original: '/img/ambiences/' + this.state.ambience.mainImage,
        thumbnail: '/img/ambiences/' + this.state.ambience.mainImage
      });

    }
    if(this.state.ambience && this.state.ambience.images){
      this.state.ambience.images.forEach((i) => images.push({
        original: '/img/ambiences/' + i,
        thumbnail: '/img/ambiences/' + i
      }));


    }
    return (
      <div className="container">
        <div className="row">
          <Col md={12}>
            <h1 className="text-center">{this.state.ambience.name}</h1>
          </Col>
        </div>
        <div className="row">
          <Col md={12}>
            <ImageGallery
              items={images}
              slideInterval={2000}
              />
          </Col>
        </div>
      </div>
    )
  }
}
