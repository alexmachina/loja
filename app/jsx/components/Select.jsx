import React from 'react';

export class Select extends React.Component{
  constructor(props) {
    super(props);
    this.state = { validationMessage: '' }
  }
  onBlur(e) {

  }
  onChange(e) {
    this.props.onChange(e);
    if(!this.props.validationFunction(e.target.value)) {
      console.log("Invalid");
      this.setState({validationMessage: this.props.validationMessage});
    }


  }
  render() {
    let validationSpan;

    if(this.state.validationMessage) {
      validationSpan =
        <span style={{color:'red'}}>{this.state.validationMessage}</span>
    }
    return(
    <div className="form-group">
      <label>{this.props.label}</label>
      <select value={this.props.value} className="form-control"
        onChange={this.onChange.bind(this)}
        onBlur={this.onBlur.bind(this)}
        >

        <option value="">--- Select ---</option>
        {this.props.options}
      </select>
      <div>
        {validationSpan}
      </div>
    </div>
  )
  }
}
