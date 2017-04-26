import React, { Component } from 'react';

export default class GoBackButton extends Component {
  render() {
    return(
      <a href={this.props.route} className="uk-button uk-button-secondary uk-button-large uk-width-1">
        <span data-uk-icon="icon: arrow-left; ratio: 2"></span> Back
      </a>
    );
  }
}
