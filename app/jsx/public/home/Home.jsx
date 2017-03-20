import React from 'react';
import {SalesCarousel} from '../components/SalesCarousel.jsx'
import {AmbiencesStrip} from '../components/AmbiencesStrip.jsx'
import FeaturedProducts from '../components/FeaturedProducts.jsx'
import TextStrip from '../components/TextStrip.jsx'


export class Home extends React.Component {
  render() {
    return (
      <div>
        <TextStrip />
        <FeaturedProducts />
        <AmbiencesStrip />
    </div>)
  }
}
