import React, { Component } from 'react';

export default class Review extends Component {
  render() {
    let style = this.props.full ? "full" : "star";

    return (
      <span id={this.props.id} className={style + " uk-icon-button"} data-uk-icon="icon: star"></span>
    );
  }
}
