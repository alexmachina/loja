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
    let className = null;

    className = 'invalid';
    return(
      <div>
        <label>{this.props.label}</label>
        <input type="text" 
          value={this.props.value}
          onChange={this.props.onChange}
          className={className}
          onBlur={this.onBlur.bind(this)}
        />
          <span>{message}</span>
        </div>
        )


        }
        }
