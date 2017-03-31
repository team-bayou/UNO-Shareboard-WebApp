import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class CancelButton extends Component {
  render(){
    return(
      <a onClick={browserHistory.goBack} className="uk-button uk-button-danger uk-button-large uk-width-1">Cancel</a>
    );
  }
}
