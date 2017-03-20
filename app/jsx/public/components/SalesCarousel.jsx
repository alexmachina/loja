import React from 'react';
import {Col, Carousel, Image} from 'react-bootstrap';
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
             <Image src={'/img/sales/'+s.mainImage} responsive
               style={{height:'750px', width:'100%'}}
             />
             <Carousel.Caption>
               <h1 style={{backgroundColor:'grey'}} className="hidden-xs">{s.name}</h1>
               <h3 style={{backgroundColor:'orange'}} className="hidden-xs">{s.description}</h3>
               <h4 className="hidden visible-xs">{s.name}</h4>
               <span className="hidden visible-xs">{s.description}</span>
             </Carousel.Caption>
           </Carousel.Item>


         )
       });
    }

   
    return (
      <div className="container-fluid">
        <div className="row">
        <Col xs={12} >
          <Carousel className="" style={{padding:0}}>
            <Carousel.Item key="1">
              <Image src={'/img/teste.png'} responsive />
            </Carousel.Item>
            
            {items}
          </Carousel>
        </Col>
        </div>
      </div>

    )
  }
}
