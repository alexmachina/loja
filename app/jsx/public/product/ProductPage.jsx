import React from 'react';
import {Header} from './Header.jsx';
import {ProductRepository} from '../../repositories/product.js';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {Col} from 'react-bootstrap';
import {ProductInfo} from './ProductInfo.jsx';



export class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        images: [],
        mainImage: ''
      },
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

    //Populate the array that will be passed to
    //the image's carrousel.
    let images = [];
    images.push({
      original: `/img/products/${this.state.product.mainImage}`,
      thumbnail: `/img/products/${this.state.product.mainImage}`
    });

    this.state.product.images.forEach((i) => {
      images.push({
        original: `/img/products/${i}`,
        thumbnail:`/img/products/${i}`
      });
    })


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
        <Col sm={12} md={6}>
          <ProductInfo
            price={this.state.product.price}
            name={this.state.product.name}
            description={this.state.product.description}
            cartTooltip={this.props.cartTooltip}

            />

        </Col>
      </div>

    )
  }
}
