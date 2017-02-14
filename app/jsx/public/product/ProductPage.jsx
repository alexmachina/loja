import React from 'react';
import {Header} from './Header.jsx';
import {ProductRepository} from '../../repositories/product.js';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {Col} from 'react-bootstrap';



export class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      error: ''
    }

    this.rep = new ProductRepository('localhost', 3000);

  }

  componentDidMount() {
    this.rep.getProductByName(this.props.params.name)
    .then(product => {
      this.setState({product : product});
    })

  }
  render() {
    const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]

    let errorP = <p>this.state.error</p>
    return (
      <div className="container">
        <Header title={this.state.product.name}
          />
        <Col sm={12} md={6}>
        <ImageGallery
          items={images}
          slideInterval={2000}
          />
              </Col>
        </div>

    )
  }
}
