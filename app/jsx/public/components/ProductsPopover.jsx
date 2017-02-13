import React from 'react';
import {CategoryRepository} from '../../repositories/category.js'
export class ProductsPopover extends React.Component{
  constructor(props) {
    super(props)
    this.rep = new CategoryRepository('localhost', 3000);
    this.state = {categories: []};
  }

  componentDidMount(){
    this.rep.getAllCategories(categories => {
      this.setState({categories: categories});
    })
  }
  render(){
    let liStyle = {
      listStyle: 'none',
      margin: 0,
      padding: '5px',
  
    }
    let categoriesLi = this.state.categories.map(c => {
      return (<li style={liStyle} key={c._id}>{c.name}</li>)
    })
    return (
      <div>
        <div className="col-md-12">
          <ul style={liStyle}>
            {categoriesLi}
          </ul>
        </div>
      </div>
  )
  }
}
