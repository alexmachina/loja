import React from 'react';

export class Input extends React.Component{
  constructor(props) {
    super(props);
    this.state = { className: '', message: '' }
  }
  onBlur(e) {
    if(!this.props.validate(e.target.value)) {
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
        <input type="text" 
          value={this.props.value}
          onChange={this.props.onChange}
          className={'form-control form-control-danger' + className}
          onBlur={this.onBlur.bind(this)}
          onInvalid={this.props.onInvalid}
        />
        <span style={{color: 'red'}}>{message}</span>
      </div>
    )


  }
}
