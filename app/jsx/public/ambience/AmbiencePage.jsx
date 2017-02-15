import React from 'react';
import AmbienceRepository from '../../ambience.js';

export class AmbiencePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {ambience: {}}
    this.rep = AmbienceRepository('http://localhost', 3000);
  }

  componentDidMount() {
    
  }
}
