import React from 'react';
import {AppBar} from './components/AppBar.jsx';
import {SalesCarousel} from './components/SalesCarousel.jsx';
import {Home} from './home/Home.jsx';
import {Footer} from './components/Footer.jsx';
export class Public extends React.Component {
  render(){

  let ren = this.props.children ? this.props.children : <Home />
    return (
      <div>
        <AppBar />

        {ren}
        <Footer />
      </div>
    )
  }
}
