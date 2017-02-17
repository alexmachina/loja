import React from 'react';

export class Input extends React.Component{
  constructor(props) {
    super(props);
    this.state = { className: '', message: '' }
  }
  onBlur(value) {
    if(!this.props.validationFunction(value)) {
      this.setState({message: this.props.validationMessage});
    } else {
      this.setState({message: ''})
    }

  }
  render() {
    let message = this.state.message;

    let className = 'form-control-danger';
    return(
      <div className="form-group row has-danger">
        <label>{this.props.label}</label>
        <input type={this.props.type ? this.props.type : "text"}
          value={this.props.value}
          onChange={this.props.onChange}
          className={'form-control form-control-danger' + className}
          onBlur={(e) => { this.onBlur(e.target.value); }}

        />
        <span style={{color: 'red'}}>{message}</span>
      </div>
    )


  }
}
