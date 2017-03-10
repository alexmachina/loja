import React from 'react'
import {ProductRepository} from '../../repositories/product.js'
import {Row, Col, Image, Jumbotron} from 'react-bootstrap'
import { Link } from 'react-router'

export default class FeaturedProducts extends React.Component {
  constructor(props) {
    super(props)
    this.rep = new ProductRepository()
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    this.rep.getFeaturedProducts().then(products => {
      this.setState({products})
    })
    
  }
  render() {
    
    return (
      <div id="featured-products-container"
        className="container text-center">
        <Jumbotron>
          <h1>Mais Vendidos</h1>
        </Jumbotron>
        <Row>
          {this.state.products.map(p => (
            <Col xs={12} sm={6} md={4} className="text-center">
              <Link to={`/produto/${p.name}`}>
                <Image responsive src={`/img/products/${p.mainImage}`} circle />
                <h3 style={{color: 'black'}}>{p.name}</h3>
              </Link>
            </Col>))}
          </Row>
        </div>
    )
  }

}
