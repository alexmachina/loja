import React from 'react';
import {SalesCarousel} from '../components/SalesCarousel.jsx';
import {AmbiencesStrip} from '../components/AmbiencesStrip.jsx';

export class Home extends React.Component {
  render() {
    return (
      <div>
        <SalesCarousel />
        <AmbiencesStrip />
    </div>)
  }
}
