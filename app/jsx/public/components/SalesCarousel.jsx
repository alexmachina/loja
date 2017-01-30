import React from 'react';
import {Col, Carousel} from 'react-bootstrap';
import {SaleRepository} from '../../repositories/sale.js';


export class SalesCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.rep = new SaleRepository('http://localhost', 3000);
    this.state = { sales: [] };
  }
  componentDidMount() {
    this.rep.getSales((err, sales) => {
      if(!err)
        this.setState({sales: sales});
    })

  }
  render() {
    let items = null;
    if(this.state.sales.map) {
       items = this.state.sales.map(s => {
         return (
           <Carousel.Item key={s._id}>
             <img src={'/img/sales/'+s.mainImage} />
             <Carousel.Caption>
               <h3>{s.name}</h3>
               <p>{s.description}</p>
             </Carousel.Caption>
           </Carousel.Item>

         )
       });
    }
    return (
      <div className="container-fluid">
        <Col xs={12} md={12}>
          <Carousel>
            {items}
          </Carousel>
        </Col>
      </div>

    )
  }
}
