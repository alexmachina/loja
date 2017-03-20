import React from 'react'
import {Row, Col} from 'react-bootstrap'
import './styles/TextStrip.scss'

export default class TextStrip extends React.Component {
  render() {
    return (
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner" role="listbox">

          <div className="item active">
            <div className="text-center strip-container">
              <h1 id="text-strip">Somos especialistas em móveis 
                para area externa</h1>
            </div>
          </div>

          <div className="item">
            <div className="text-center strip-container">
              <h1 id="text-strip"> 
                Faça um orçamento!
              </h1>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
