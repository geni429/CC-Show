import React, { PropTypes } from 'react'

class ClickableButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <li key={this.props.key}>
          <button onClick={this.props.onClick}>
            <i>{this.props.icon}</i>
          </button>
      </li>
    );
  }

}


export default ClickableButton;