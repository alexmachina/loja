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
    this.rep.getSales(1,(err, sales) => {
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
             <img src={'/img/sales/'+s.mainImage} className="img img-responsive"
               style={{width : '100%'}} />
             <Carousel.Caption>
               <h1 style={{backgroundColor:'grey'}}>{s.name}</h1>
               <h3 style={{backgroundColor:'orange'}}>{s.description}</h3>
             </Carousel.Caption>
           </Carousel.Item>


         )
       });
    }

    let wrapperStyle = {
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }
    return (
      <div className="container-fluid">
        <div className="row">
        <Col xs={12} style={wrapperStyle}>
          <Carousel className="col-sm-6" style={{padding:0}}>
            {items}
          </Carousel>
        </Col>
        </div>
      </div>

    )
  }
}
