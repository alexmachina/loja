import React from 'react';
import {AppBar} from './components/AppBar.jsx';
import {SalesCarousel} from './components/SalesCarousel.jsx';
import {Home} from './home/Home.jsx';

export class Public extends React.Component {
  render(){

  let ren = this.props.children ? this.props.children : <Home />
    return (
      <div>
        <AppBar /> 

        {ren}
      </div>
    )
  }
}
