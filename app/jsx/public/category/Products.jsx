import React from 'react'
import {Col, Image} from 'react-bootstrap';
import {Link} from 'react-router';
export class Products extends React.Component {
  render(){
    let products = this.props.products.map(p => {
      return (
        <Col xs={12} sm={6} md={4} key={p._id} className="text-center">
          <Link to={'/produto/'+p.name}>
            <Image className="img-responsive" rounded src={'/img/products/'+p.mainImage} />
          </Link>
          <h3>{p.name}</h3>
        </Col>
      )
    })
    return(
      <div className="container-fluid">
        {products}
      </div>
    )

  }
}
